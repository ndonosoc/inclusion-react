import React, { useState, useEffect } from 'react';
import Card from './components/Card/Card.jsx';
import axios from 'axios';
import AppBar from './components/AppBar/Appbar.jsx';
import { apis, buildUrl } from './services/apis.js';
import Box from '@mui/material/Box';
import './App.css';

function App() {
  const [statuses, setStatuses] = useState([]);

  const responseToSuccess = (response, api) => {
    const { data, status } = response;
    return { ...data, status, api };
  };

  const responseToFailure = (response, api) => {
    const { status, message } = response;
    return { message, status, success: false, api };
  };

  useEffect(() => {
    const refreshTime = parseInt(process.env.REACT_APP_TIME_INTERVAL);

    const updateStatuses = () => {
      Promise.allSettled(
        apis.map((api) =>
          axios
            .get(buildUrl(api))
            .then((res) => responseToSuccess(res, api))
            .catch((err) =>
              Promise.reject(responseToFailure(err.toJSON(), api))
            )
        )
      ).then((newStatuses) =>
        setStatuses(
          newStatuses.map((newStatus) =>
            newStatus.status === 'fulfilled'
              ? newStatus.value
              : newStatus.reason
          )
        )
      );
    };

    updateStatuses();

    setInterval(() => {
      updateStatuses();
    }, refreshTime);
  }, []);

  return (
    <>
      <AppBar />
      <Box className='CardWrapper'>
        {statuses &&
          statuses.map(
            ({ success, hostname, message, time, status, api }, ix) => {
              return (
                <Card
                  success={success}
                  hostname={hostname}
                  message={message}
                  time={time}
                  status={status}
                  api={api}
                  key={ix}
                />
              );
            }
          )}
      </Box>
    </>
  );
}

export default App;
