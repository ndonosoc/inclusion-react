import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import './Card.css';
import dayjs from 'dayjs';

const CardStatus = ({ hostname, message, success, time, status, api }) => {
  const date = dayjs(time).format('HH:mm:ss');

  return (
    <Card className='MuiCardHeader-root' sx={{ margin: '10px' }}>
      <CardContent
        className='MuiCardHeader-content'
        sx={{ padding: '0px', margin: '5px' }}
      >
        {success ? (
          <>
            <CheckCircleIcon
              className='SuccessIcon'
              sx={{ fontSize: '40px' }}
            />
            <Typography
              sx={{
                fontWeight: '550',
              }}
            >
              {api.toUpperCase()}
            </Typography>
            <Typography
              sx={{
                backgroundColor: 'green',
                borderRadius: '5px',
                width: '55%',
                textAlign: 'center',
                color: 'white',
                fontWeight: '550',
              }}
            >
              Status code: {status}
            </Typography>
            <Typography>{hostname}</Typography>
            <Typography>{date}</Typography>
          </>
        ) : (
          <>
            <CancelIcon className='ErrorIcon' sx={{ fontSize: '40px' }} />
            <Typography sx={{ color: 'red', fontWeight: 'bold' }}>
              OFFLINE
            </Typography>
            <Typography
              sx={{
                backgroundColor: 'red',
                borderRadius: '5px',
                width: '55%',
                textAlign: 'center',
                color: 'white',
                fontWeight: '550',
              }}
            >
              Status code: {status}
            </Typography>
            <Typography sx={{ maxWidth: '70%', textAlign: 'center' }}>
              {message}
            </Typography>
            <Typography>{hostname}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CardStatus;
