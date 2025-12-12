import React, { Suspense } from "react";
import { ToastContainer } from 'react-toastify'

import Router from "./router/Router";

const App = () => {
  return (
    <Suspense fallback={null}>
      <Router />


      <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
    </Suspense>
  );
};

export default App;
