import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Pagination,
  Snackbar,
  Container,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Flight from "./components/Flight";
import { format } from "date-fns";

import { apiClient } from "../../api-client/apiClient";
import toast from "react-hot-toast";

interface PageData {
  data: Flight[];
  pagination: any;
}

const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState({
    scheduleDate: new Date(),
    flightDirection: "",
    sort: "-scheduleTime",
  });
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const fetchFlights = async (): Promise<PageData> => {
    const response = await apiClient.get("/flights/getFlightsWithDetails", {
      params: {
        scheduleDate: format(filters.scheduleDate, "yyyy-MM-dd"),
        flightDirection: filters.flightDirection || undefined,
        page: page,
        sort: filters.sort,
      },
    });
    return response.data;
  };

  const { data, isLoading, error } = useQuery<PageData, Error>({
    queryKey: ["flights", filters, page],
    queryFn: fetchFlights,
  });

  const sortOptions = [
    { value: "+scheduleTime", label: "Schedule Time (Ascending)" },
    { value: "-scheduleTime", label: "Schedule Time (Descending)" },
    { value: "+flightName", label: "Flight Name (A-Z)" },
    { value: "-flightName", label: "Flight Name (Z-A)" },
    { value: "+flightDirection", label: "Flight Direction (A-Z)" },
    { value: "-flightDirection", label: "Flight Direction (Z-A)" },
  ];

  const reserveMutation = useMutation<any, Error, Flight>({
    mutationFn: (flight: Flight) =>
      apiClient.post("/reservations", {
        // ... (reservation data remains unchanged)
      }),
    onSuccess: () => {
      toast.success("Reservation successful");
    },
    onError: (error) => {
      setSnackbar({
        open: true,
        message: `Reservation failed: ${error.message}`,
      });
    },
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleReservation = (flight: Flight) => {
    reserveMutation.mutate(flight);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ bgcolor: "#F0F4F8", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              bgcolor: "#FFFFFF",
              borderRadius: 2,
              boxShadow: "0 4px 6px rgba(0, 31, 63, 0.1)",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#001F3F",
                fontWeight: "bold",
                mb: 3,
              }}
            >
              <FlightTakeoffIcon
                sx={{ mr: 2, fontSize: 40, color: "#3A6D8C" }}
              />
              Flight Search
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <DatePicker
                  label="Date"
                  value={filters.scheduleDate}
                  onChange={(date) => handleFilterChange("scheduleDate", date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Flight Direction</InputLabel>
                  <Select
                    value={filters.flightDirection}
                    onChange={(e) =>
                      handleFilterChange("flightDirection", e.target.value)
                    }
                    label="Flight Direction"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="A">Arrivals</MenuItem>
                    <MenuItem value="D">Departures</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange("sort", e.target.value)}
                    label="Sort By"
                  >
                    {sortOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {error ? (
            <Typography color="error" align="center">
              An error occurred while fetching flights.
            </Typography>
          ) : isLoading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress sx={{ color: "#3A6D8C" }} />
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {data?.data.map((flight) => (
                  <Grid item xs={12} key={flight.id}>
                    <Flight flight={flight} onReserve={handleReservation} />
                  </Grid>
                ))}
              </Grid>
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={Math.ceil(
                    data?.pagination?.["last"]
                      ? parseInt(
                          new URL(data.pagination["last"]).searchParams.get(
                            "page"
                          ) || "1"
                        )
                      : 1
                  )}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  sx={{
                    "& .MuiPaginationItem-root": { color: "#001F3F" },
                    "& .Mui-selected": { bgcolor: "#3A6D8C", color: "white" },
                  }}
                />
              </Box>
            </>
          )}
        </Container>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </LocalizationProvider>
  );
};

export default Dashboard;
