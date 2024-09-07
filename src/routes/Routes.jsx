import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import SignUpPage from '../componnets/SignUpPage'
import Login from '../componnets/Login'
import MyCart from '../componnets/Mycart/Cart'
import HomePro from '../componnets/Products/HomePro'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <HomePro />,
      },
      {
        path: '/cart',
        element: <MyCart />,
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signUp',
    element: <SignUpPage />,
  },
])
