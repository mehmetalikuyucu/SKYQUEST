import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Snackbar,
  Paper,
  Container,
} from "@mui/material";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { apiClient } from "../../api-client/apiClient";
import ReservationCard from "./components/ReservationCard";

export interface Reservation {
  _id: string;
  flightName: string;
  flightNumber: number;
  scheduleDateTime: string;
  flightDirection: "A" | "D";
  terminal: number;
  destination: {
    city: string;
    country: string;
    iata: string;
  };
  aircraftType: {
    shortDescription: string;
  };
}

const Reservation: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    data: reservations,
    isLoading,
    error,
  } = useQuery<Reservation[]>({
    queryKey: ["reservations"],
    queryFn: () => apiClient.get("/reservations").then((res) => res.data),
  });

  const cancelMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/reservations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });

  const handleCancel = (id: string) => {
    cancelMutation.mutate(id);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
        >
          <CircularProgress sx={{ color: "#3A6D8C", mb: 2 }} size={60} />
          <Typography variant="h6" sx={{ color: "#001F3F" }}>
            Loading your reservations...
          </Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
        >
          <ErrorOutlineIcon sx={{ color: "#3A6D8C", fontSize: 60, mb: 2 }} />
          <Typography variant="h6" sx={{ color: "#001F3F", mb: 1 }}>
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" sx={{ color: "#3A6D8C" }}>
            We couldn't fetch your reservations. Please try again later.
          </Typography>
        </Box>
      );
    }

    if (!reservations || reservations.length === 0) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
        >
          <SentimentDissatisfiedIcon
            sx={{ color: "#3A6D8C", fontSize: 60, mb: 2 }}
          />
          <Typography variant="h6" sx={{ color: "#001F3F", mb: 1 }}>
            No reservations found.
          </Typography>
          <Typography variant="body1" sx={{ color: "#3A6D8C" }}>
            Looks like you haven't made any reservations yet.
          </Typography>
        </Box>
      );
    }

    return (
      <Grid container spacing={3}>
        {reservations.map((reservation) => (
          <Grid item xs={12} key={reservation._id}>
            <ReservationCard
              reservation={reservation}
              onCancel={handleCancel}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ bgcolor: "#F0F4F8", minHeight: "100vh" }}>
      <Paper
        elevation={0}
        sx={{
          bgcolor: "#001F3F",
          borderRadius: 0,
          py: 2,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            <AirplanemodeActiveIcon sx={{ mr: 2, fontSize: 40 }} />
            Your Reservations
          </Typography>
        </Container>
      </Paper>
      <Container maxWidth="lg">{renderContent()}</Container>
      <Snackbar
        open={cancelMutation.isSuccess}
        autoHideDuration={6000}
        message="Reservation cancelled successfully"
      />
      <Snackbar
        open={cancelMutation.isError}
        autoHideDuration={6000}
        message="Failed to cancel reservation"
      />
    </Box>
  );
};

export default Reservation;
