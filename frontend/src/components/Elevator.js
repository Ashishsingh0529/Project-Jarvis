import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@material-ui/core';

const Elevator = ({ elevator, onUpdateOccupancy }) => {
  const handlePassengerChange = (change) => {
    const newOccupancy = elevator.currentOccupancy + change;
    if (newOccupancy >= 0 && newOccupancy <= elevator.capacity) {
      onUpdateOccupancy(elevator.id, newOccupancy);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Elevator {elevator.id}</Typography>
        <Typography>Floor: {elevator.floor}</Typography>
        <Typography>
          Occupancy: {elevator.currentOccupancy}/{elevator.capacity}
        </Typography>
        <Grid container spacing={2} style={{ marginTop: '10px' }}>
          <Grid item>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => handlePassengerChange(1)}
              disabled={elevator.currentOccupancy >= elevator.capacity}
            >
              Add Passenger
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="contained" 
              color="secondary"
              onClick={() => handlePassengerChange(-1)}
              disabled={elevator.currentOccupancy <= 0}
            >
              Remove Passenger
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Elevator; 