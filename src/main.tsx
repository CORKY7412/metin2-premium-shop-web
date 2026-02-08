import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CategoryPage } from './pages/CategoryPage.tsx'
import { TombolaPage } from './pages/TombolaPage.tsx'
import { CartPage } from './pages/CartPage.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { UserProvider } from './context/UserContext.tsx'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/category/:categoryId",
    element: <CategoryPage />
  },
  { path: "/tombola",
    element: <TombolaPage />
  },
  { path: "/cart",
    element: <CartPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
  </StrictMode>
)
