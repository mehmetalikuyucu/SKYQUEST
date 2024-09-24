import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
  Pagination
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { apiClient } from '../../api-client/apiClient';

interface FlightData {
  id: string;
  flightName: string;
  flightNumber: number;
  scheduleDateTime: string;
  flightDirection: 'A' | 'D';
  route: {
    destinations: string[];
  };
  publicFlightState: {
    flightStates: string[];
  };
  aircraftType: {
    iataMain: string;
    iataSub: string;
  };
  terminal: number;
  gate: string;
  baggageClaim: {
    belts: string[];
  };
}

interface PageData {
  flights: FlightData[];
  totalPages: number;
}

const ITEMS_PER_PAGE = 10;

const Flight: React.FC<{ flight: FlightData }> = ({ flight }) => {
  return (
    <Card sx={{ mb: 2, boxShadow: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" color="primary">{flight.flightName}</Typography>
            <Typography variant="caption">{flight.flightNumber}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body2">
              <FlightTakeoffIcon fontSize="small" /> {new Date(flight.scheduleDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </Typography>
            <Typography variant="caption">{flight.route.destinations[0]}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body2">
              <FlightLandIcon fontSize="small" /> {new Date(new Date(flight.scheduleDateTime).getTime() + 2*60*60*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </Typography>
            <Typography variant="caption">{flight.route.destinations[1] || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Chip 
              label={flight.publicFlightState.flightStates[0]} 
              color="primary" 
              size="small" 
              sx={{ mb: 1 }}
            />
            <Typography variant="body2">Terminal: {flight.terminal}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState({
    tripType: 'roundTrip',
    from: '',
    to: '',
    departDate: null as Date | null,
    returnDate: null as Date | null,
    flightDirection: '',
    airline: '',
    arrivalTime: '',
    stops: '',
  });
  const [page, setPage] = useState(1);

  const fetchFlights = async (): Promise<PageData> => {
    const response = await apiClient.get('/flights', {
      params: {
        page: page,
        limit: ITEMS_PER_PAGE,
        ...filters,
        scheduleDate: filters.departDate?.toISOString().split('T')[0],
      }
    });
    return response.data;
  };

  const { data, isLoading, error, refetch } = useQuery<PageData, Error>({
    queryKey: ['flights', filters, page],
    queryFn: fetchFlights,
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (error) return <Typography color="error">An error occurred: {error.message}</Typography>;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} sx={{ p: 3, my: 2, bgcolor: '#f8f8f8' }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <FlightTakeoffIcon sx={{ mr: 1 }} />
          BOOK YOUR FLIGHT
        </Typography>
        <Box sx={{ mb: 2 }}>
          <ToggleButtonGroup
            color="primary"
            value={filters.tripType}
            exclusive
            onChange={(_, newValue) => handleFilterChange('tripType', newValue)}
            sx={{ mb: 2 }}
          >
            <ToggleButton value="roundTrip">Round trip</ToggleButton>
            <ToggleButton value="oneWay">One way</ToggleButton>
          </ToggleButtonGroup>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="From"
                value={filters.from}
                onChange={(e) => handleFilterChange('from', e.target.value)}
                InputProps={{
                  startAdornment: <FlightTakeoffIcon />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="To"
                value={filters.to}
                onChange={(e) => handleFilterChange('to', e.target.value)}
                InputProps={{
                  startAdornment: <FlightLandIcon />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Depart"
                value={filters.departDate}
                onChange={(date) => handleFilterChange('departDate', date)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Return"
                value={filters.returnDate}
                onChange={(date) => handleFilterChange('returnDate', date)}
                disabled={filters.tripType === 'oneWay'}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => refetch()}
          >
            Show flights
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Typography variant="h6" gutterBottom>
            {filters.from} - {filters.to}
          </Typography>
          {isLoading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {data?.flights.map((flight) => (
                <Flight key={flight.id} flight={flight} />
              ))}
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination 
                  count={data?.totalPages || 1} 
                  page={page} 
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Filters</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={filters.flightDirection}
                label="Sort by"
                onChange={(e) => handleFilterChange('flightDirection', e.target.value)}
              >
                <MenuItem value="">Lowest Price</MenuItem>
                <MenuItem value="D">Fastest Route</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="subtitle1" gutterBottom>Arrival Time</Typography>
            <RadioGroup
              value={filters.arrivalTime}
              onChange={(e) => handleFilterChange('arrivalTime', e.target.value)}
            >
              <FormControlLabel value="morning" control={<Radio />} label="5:00 AM - 11:59 AM" />
              <FormControlLabel value="afternoon" control={<Radio />} label="12:00 PM - 5:59 PM" />
            </RadioGroup>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>Stops</Typography>
            <RadioGroup
              value={filters.stops}
              onChange={(e) => handleFilterChange('stops', e.target.value)}
            >
              <FormControlLabel value="0" control={<Radio />} label="Nonstop" />
              <FormControlLabel value="1" control={<Radio />} label="1 Stop" />
              <FormControlLabel value="2" control={<Radio />} label="2+ Stops" />
            </RadioGroup>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>Airlines</Typography>
            <RadioGroup
              value={filters.airline}
              onChange={(e) => handleFilterChange('airline', e.target.value)}
            >
              <FormControlLabel value="alitalia" control={<Radio />} label="Alitalia" />
              <FormControlLabel value="lufthansa" control={<Radio />} label="Lufthansa" />
              <FormControlLabel value="airfrance" control={<Radio />} label="Air France" />
            </RadioGroup>
          </Paper>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default Dashboard;