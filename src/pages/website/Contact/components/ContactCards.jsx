import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function ContactCards() {
  const info = [
    {
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      title: "Phone Number",
      value: "+92 316 5018031",
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: "Email Address",
      value: "info@pixelcodetechnology.com",
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
      title: "Office Address",
      value: "Karachi, Pakistan",
    },
  ];

  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="stretch"
      sx={{ mt: 4 }}
    >
      {info.map((item, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={index}
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Card
            sx={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              p: 4,
              borderRadius: 4,
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transition: "0.3s ease",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-5px)",
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ mb: 2, color: "primary.main" }}>{item.icon}</Box>

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {item.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}