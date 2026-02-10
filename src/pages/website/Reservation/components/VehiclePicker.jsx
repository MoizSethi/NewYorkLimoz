import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  ButtonBase,
  Skeleton,
  Alert,
  Divider,
} from "@mui/material";

import {
  fetchVehicles,
  fetchPrices,
  fetchVehicleImagesById,
  toPublicUrl,
  mapWithConcurrency,
} from "../services/vehiclePricing.api";

function money(n) {
  if (n == null || Number.isNaN(Number(n))) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(n));
}

function mapServiceTypeToApi(serviceType) {
  if (!serviceType) return "hourly";
  const s = serviceType.toLowerCase();
  if (s.includes("hour")) return "hourly";
  if (s.includes("daily")) return "daily";
  return "hourly";
}

function pickFirstImageUrl(imagesArr) {
  if (!Array.isArray(imagesArr) || imagesArr.length === 0) return "";

  // Try common keys; if API returns string URLs, handle that too
  const first = imagesArr[0];
  if (typeof first === "string") return first;

  return (
    first?.image_url ||
    first?.url ||
    first?.path ||
    first?.image ||
    first?.filename ||
    ""
  );
}

export default function VehiclePicker({
  serviceType,
  selectedVehicleId,
  onSelectVehicle,
  onSelected, // ✅ auto-next callback
}) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [prices, setPrices] = useState([]);
  const [imageMap, setImageMap] = useState({}); // vehicle_id -> imageUrl

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setErr("");

        const [v, p] = await Promise.all([fetchVehicles(), fetchPrices()]);
        if (!mounted) return;

        setVehicles(v);
        setPrices(p);

        // ✅ fetch images per vehicle with concurrency limit
        const pairs = await mapWithConcurrency(v, 4, async (veh) => {
          try {
            const imgs = await fetchVehicleImagesById(veh.vehicle_id);
            const raw = pickFirstImageUrl(imgs);
            return [veh.vehicle_id, toPublicUrl(raw)];
          } catch {
            return [veh.vehicle_id, ""];
          }
        });

        if (!mounted) return;
        const nextMap = {};
        for (const [vid, url] of pairs) nextMap[vid] = url;
        setImageMap(nextMap);
      } catch (e) {
        if (!mounted) return;
        setErr(e?.message || "Failed to load vehicles/prices/images");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const apiServiceType = useMemo(() => mapServiceTypeToApi(serviceType), [serviceType]);

  const pricesByVehicle = useMemo(() => {
    const map = new Map();
    for (const pr of prices) {
      if (!pr?.vehicle_id || !pr?.serviceType) continue;
      const vid = pr.vehicle_id;
      const st = String(pr.serviceType).toLowerCase();
      if (!map.has(vid)) map.set(vid, {});
      map.get(vid)[st] = pr;
    }
    return map;
  }, [prices]);

  const merged = useMemo(() => {
    return vehicles.map((v) => {
      const priceObj = pricesByVehicle.get(v.vehicle_id) || {};
      return {
        ...v,
        imageUrl: imageMap[v.vehicle_id] || "",
        priceHourly: priceObj.hourly?.totalPrice ?? null,
        priceDaily: priceObj.daily?.totalPrice ?? null,
        priceForSelectedService: apiServiceType === "daily" ? priceObj.daily : priceObj.hourly,
      };
    });
  }, [vehicles, pricesByVehicle, apiServiceType, imageMap]);

  if (err) return <Alert severity="error">{err}</Alert>;

  return (
    <Box>
      <Stack direction="row" alignItems="baseline" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="h6" fontWeight={900}>
          Choose Your Vehicle
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Live pricing from your system
        </Typography>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {!loading && merged.length === 0 ? (
        <Alert severity="warning" sx={{ mb: 2 }}>
          No vehicles found. Check VITE_PUBLIC_API_BASE_URL.
        </Alert>
      ) : null}

      <Grid container spacing={2}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
                  <Skeleton variant="rectangular" height={160} />
                  <CardContent>
                    <Skeleton variant="text" height={28} />
                    <Skeleton variant="text" height={22} width="70%" />
                    <Skeleton variant="rectangular" height={56} sx={{ mt: 1, borderRadius: 2 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : merged.map((v) => {
              const selected = v.vehicle_id === selectedVehicleId;
              const p = v.priceForSelectedService;
              const label = apiServiceType === "daily" ? "Daily Total" : "Hourly Total";

              return (
                <Grid item xs={12} sm={6} lg={4} key={v.vehicle_id}>
                  <ButtonBase
                    onClick={() => {
                      onSelectVehicle({
                      vehicleId: v.vehicle_id,
                      vehicleName: v.name,
                                          
                      // price for selected service type (hourly/daily)
                      price: p?.totalPrice ?? null,
                      serviceType: p?.serviceType ?? apiServiceType,
                                          
                      // ✅ add these for frontend auto-calc
                      hourlyPrice: v.priceHourly ?? null,
                      dailyPrice: v.priceDaily ?? null,
                                          
                      imageUrl: v.imageUrl,
                    });
                      // ✅ auto-next
                      onSelected?.();
                    }}
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    <Card
                      sx={{
                        width: "100%",
                        borderRadius: 3,
                        overflow: "hidden",
                        border: selected ? "2px solid" : "1px solid",
                        borderColor: selected ? "primary.main" : "divider",
                        boxShadow: selected ? 8 : 1,
                        transition: "all .15s ease",
                        "&:hover": { boxShadow: 8 },
                      }}
                    >
                      <Box
                        sx={{
                          height: 160,
                          bgcolor: "action.hover",
                          backgroundImage: v.imageUrl
                            ? `url(${v.imageUrl})`
                            : "linear-gradient(135deg, rgba(0,0,0,.08), rgba(0,0,0,.02))",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />

                      <CardContent>
                        <Stack spacing={1}>
                          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                            <Typography fontWeight={900}>{v.name}</Typography>
                            {selected ? <Chip size="small" color="primary" label="Selected" /> : null}
                          </Stack>

                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            <Chip size="small" label={`${v.seats} Seats`} />
                            <Chip size="small" label={`${v.luggageCapacity} Luggage`} />
                          </Stack>

                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">
                              {label}
                            </Typography>
                            <Typography variant="h6" fontWeight={900}>
                              {money(p?.totalPrice ?? null)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Hourly: {money(v.priceHourly)} • Daily: {money(v.priceDaily)}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </ButtonBase>
                </Grid>
              );
            })}
      </Grid>
    </Box>
  );
}
