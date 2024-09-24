import React from "react";
import { Typography, Box, Container, Link } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";


const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "#001F3F", color: "#EAD8B1", py: 3 }}
    >
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box display="flex" alignItems="center" mb={2}>
            <FlightTakeoffIcon sx={{ fontSize: 24, mr: 1 }} />
            <Typography variant="h6" component="span">
              SkyQuest
            </Typography>
          </Box>
          <Typography variant="body2" align="center" gutterBottom>
            Explore the skies with ease and comfort.
          </Typography>
          <Box my={1}>
            <Link
              href="https://github.com/mehmetalikuyucu"
              color="inherit"
              sx={{ mx: 1 }}
            >
              <GitHubIcon />
            </Link>
            <Link
              href="https://www.linkedin.com/in/mehmetalikuyucu/"
              color="inherit"
              sx={{ mx: 1 }}
            >
              <LinkedInIcon />
            </Link>
          </Box>
          <Typography variant="body2" color="#6A9AB0" align="center">
            © {new Date().getFullYear()} SkyQuest. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
