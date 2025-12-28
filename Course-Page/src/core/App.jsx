import { useState } from 'react'
import Router from "./router"
import { RouterProvider } from 'react-router-dom'

import { Toaster } from 'react-hot-toast';
import '../assets/style/index.css'

// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

//redux
import { Provider } from 'react-redux'
import { store, persistor } from "../store/index"
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <>
      <Provider store={store}>

        <PersistGate loading={null} persistor={persistor}>

          <QueryClientProvider client={queryClient}>
            <Toaster position="top-center" />
            <RouterProvider router={Router} />
          </QueryClientProvider>

        </PersistGate>

      </Provider>
    </>
  )
}

export default App