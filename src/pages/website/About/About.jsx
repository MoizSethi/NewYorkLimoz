import { Container, Box } from "@mui/material";

import HeroBanner from "./components/HeroBanner";
import WhoWeAre from "./components/WhoWeAre";
import WhyChooseUs from "./components/WhyChooseUs";
import CTASection from "./components/CTASection";

export default function About() {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">

        <HeroBanner />

        <WhoWeAre />

        <WhyChooseUs />

        <CTASection />

      </Container>
    </Box>
  );
}
