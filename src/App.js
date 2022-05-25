import React from 'react';
import { useSelector } from 'react-redux';

// MUI Core
import LinearProgress from '@mui/material/LinearProgress';

// Routes
import MainRoutes from 'routes/Routes';

function App() {
  const showLoading = useSelector((state) => state.app.showLoading);
  console.log('showLoading: ', showLoading);

  return (
    <>
      <MainRoutes />
      {showLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 9999,
            width: '100%',
          }}
        >
          <LinearProgress />
        </div>
      )}
    </>
  );
}

export default App;
