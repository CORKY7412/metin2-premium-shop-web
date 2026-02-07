import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CategoryPage } from './pages/CategoryPage.tsx'
import { TombolaPage } from './pages/TombolaPage.tsx'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/category/:categoryId",
    element: <CategoryPage />
  },
  { path: "/tombola",
    element: <TombolaPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
