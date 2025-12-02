import { useState } from "react";
import { Box, Card, Collapse } from "@mui/material";

import ReservationFirstSection from "./Reservation_First_Section";
import ReservationSecondStep from "./Reservation_Second_Section";
import ReservationFinalStep from "./Reservation_Third_Section";

export default function ParentTransitions() {
  const [step, setStep] = useState(1);
  const [rideData, setRideData] = useState({});

  const goToStep = (targetStep) => {
    setStep(targetStep);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 4,
          backgroundColor: "background.paper",
        }}
      >
        {/* STEP 1 */}
        <Collapse in={step === 1} unmountOnExit>
          <Box sx={{ transition: "0.5s" }}>
            <ReservationFirstSection
              onNext={(data) => {
                setRideData((prev) => ({ ...prev, ...data }));
                goToStep(2);
              }}
            />
          </Box>
        </Collapse>

        {/* STEP 2 */}
        <Collapse in={step === 2} unmountOnExit>
          <Box sx={{ transition: "0.5s" }}>
            <ReservationSecondStep
              onNext={(vehicleId) => {
                setRideData((prev) => ({ ...prev, vehicleId }));
                goToStep(3);
              }}
              onBack={() => goToStep(1)}
            />
          </Box>
        </Collapse>

        {/* STEP 3 */}
        <Collapse in={step === 3} unmountOnExit>
          <Box sx={{ transition: "0.5s" }}>
            <ReservationFinalStep
              rideData={rideData}
              onBack={() => goToStep(2)}
              onProceed={() => {
                alert("Proceeding to payment...");
              }}
            />
          </Box>
        </Collapse>
      </Card>
    </Box>
  );
}
