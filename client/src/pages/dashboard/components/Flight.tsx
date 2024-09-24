import React from "react";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Box,
  Chip,
} from "@mui/material";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import LuggageIcon from "@mui/icons-material/Luggage";
import { format } from "date-fns";
interface Flight {
  id: string;
  flightName: string;
  flightNumber: number;
  scheduleDateTime: string;
  estimatedLandingTime?: string;
  actualLandingTime?: string;
  flightDirection: "A" | "D";
  route: {
    destinations: string[];
    eu: string;
    visa: boolean;
  };
  publicFlightState: {
    flightStates: string[];
  };
  aircraftType: {
    iataMain: string;
    iataSub: string;
  };
  terminal: number;
  baggageClaim: {
    belts: string[];
  };
  expectedTimeOnBelt: string;
  destinationDetails: {
    data: {
      city: string;
      country: string;
      iata: string;
      publicName: {
        dutch: string;
        english: string;
      };
    };
  };
  aircraftTypeDetails: {
    longDescription: string;
    shortDescription: string;
  };
}

interface PageData {
  data: Flight[];
  pagination: any;
}
const Flight: React.FC<{
  flight: Flight;
  onReserve: (flight: Flight) => void;
}> = ({ flight, onReserve }) => {
  const departureTime = new Date(flight.scheduleDateTime);
  const arrivalTime = new Date(
    flight.actualLandingTime ||
      flight.estimatedLandingTime ||
      flight.scheduleDateTime
  );

  return (
    <Card
      sx={{
        mb: 3,
        boxShadow: "0 4px 6px rgba(0, 31, 63, 0.1)",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "#FFFFFF",
        border: "1px solid #3A6D8C",
      }}
    >
      <CardContent sx={{ py: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="#001F3F" fontWeight="bold">
              {flight.flightName}
            </Typography>
            <Typography variant="subtitle2" color="#3A6D8C">
              Flight {flight.flightNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <FlightTakeoffIcon sx={{ mr: 1, color: "#3A6D8C" }} />
              <Typography variant="body2" color="#001F3F">
                Departure: {format(departureTime, "MMM d, yyyy HH:mm")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FlightLandIcon sx={{ mr: 1, color: "#3A6D8C" }} />
              <Typography variant="body2" color="#001F3F">
                Arrival: {format(arrivalTime, "MMM d, yyyy HH:mm")}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body2" color="#001F3F">
              {flight.destinationDetails.data.city},{" "}
              {flight.destinationDetails.data.country}
            </Typography>
            <Chip
              label={`Terminal ${flight.terminal}`}
              size="small"
              sx={{
                mt: 1,
                bgcolor: "#6A9AB0",
                color: "#FFFFFF",
                "& .MuiChip-label": { fontWeight: "bold" },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body2" color="#001F3F">
              Aircraft: {flight.aircraftTypeDetails.shortDescription}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <LuggageIcon sx={{ mr: 0.5, color: "#3A6D8C" }} />
              <Typography variant="body2" color="#001F3F">
                Belt: {flight.baggageClaim?.belts.join(", ") || "N/A"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions
        sx={{
          bgcolor: "#F0F4F8",
          justifyContent: "flex-end",
          p: 2,
          borderTop: "1px solid #E0E7EF",
        }}
      >
        <Button
          variant="contained"
          size="large"
          disabled={flight.scheduleDateTime < new Date().toISOString()}
          sx={{
            bgcolor:
              flight.scheduleDateTime < new Date().toISOString()
                ? "#C0CCD8"
                : "#3A6D8C",
            color: "#FFFFFF",
            "&:hover": { bgcolor: "#001F3F" },
            "&:disabled": { bgcolor: "#C0CCD8", color: "#6A7A8C" },
            transition: "all 0.3s ease",
            borderRadius: 1,
            fontWeight: "bold",
            textTransform: "none",
          }}
          onClick={() => onReserve(flight)}
          startIcon={<AirplaneTicketIcon />}
        >
          Reserve Flight
        </Button>
      </CardActions>
    </Card>
  );
};

export default Flight;
