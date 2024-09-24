import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Box,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { format } from "date-fns";
import { Reservation } from "../Reservation";

interface ReservationCardProps {
  reservation: Reservation;
  onCancel: (id: string) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  onCancel,
}) => {
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
              {reservation.flightName}
            </Typography>
            <Typography variant="subtitle2" color="#3A6D8C">
              Flight {reservation.flightNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {reservation.flightDirection === "A" ? (
                <FlightLandIcon sx={{ mr: 1, color: "#3A6D8C" }} />
              ) : (
                <FlightTakeoffIcon sx={{ mr: 1, color: "#3A6D8C" }} />
              )}
              <Typography variant="body2" color="#001F3F">
                {format(
                  new Date(reservation.scheduleDateTime),
                  "MMM d, yyyy HH:mm"
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body2" color="#001F3F">
              {reservation.destination.city}, {reservation.destination.country}
            </Typography>
            <Chip
              label={`Terminal ${reservation.terminal}`}
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Chip
                label={reservation.aircraftType.shortDescription}
                sx={{
                  bgcolor: "#3A6D8C",
                  color: "#FFFFFF",
                  "& .MuiChip-label": { fontWeight: "bold" },
                }}
              />
              <Button
                variant="contained"
                size="small"
                onClick={() => onCancel(reservation._id)}
                sx={{
                  bgcolor: "#3A6D8C",
                  color: "#FFFFFF",
                  "&:hover": { bgcolor: "#001F3F" },
                  transition: "all 0.3s ease",
                  borderRadius: 1,
                  fontWeight: "bold",
                  textTransform: "none",
                }}
                startIcon={<AirplaneTicketIcon />}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ReservationCard;
