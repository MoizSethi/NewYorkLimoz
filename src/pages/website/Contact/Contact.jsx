import { Box, Container } from "@mui/material";

import ContactHero from "./components/ContactHero";
import ContactForm from "./components/ContactForm";
import ContactCards from "./components/ContactCards";

export default function Contact() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">

        <ContactHero />

        <ContactCards />

        <Box sx={{ mt: 8 }}>
          <ContactForm />
        </Box>

      </Container>
    </Box>
  );
}
