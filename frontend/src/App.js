import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import Elevator from './components/Elevator';
import './App.css';

const API_URL = 'http://localhost';

function App() {
  const [elevators, setElevators] = useState([]);

  useEffect(() => {
    fetchElevators();
  }, []);

  const fetchElevators = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/elevators`);
      setElevators(response.data);
    } catch (error) {
      console.error('Error fetching elevators:', error);
    }
  };

  return (
    <div className="App">
      <Container>
        <Grid container spacing={2}>
          {elevators.map((elevator) => (
            <Grid item xs={12} md={6} lg={4} key={elevator.id}>
              <Elevator elevator={elevator} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App; 