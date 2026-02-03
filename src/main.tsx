import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CategoryPage } from './pages/CategoryPage.tsx'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/category/:categoryId",
    element: <CategoryPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
