import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginForm from './components/session/LoginForm';
import * as sessionActions from './store/session';
// import SignupForm from './components/session/SignupForm';
import Navigation from './components/navigation/Navigation';
import ProductsIndex from './components/product/ProductsIndex';
import ProductShow from './components/product/ProductShow';
// import ReviewsIndex from './components/review/ReviewsIndex';
import ReviewCreateForm from './components/review/ReviewCreate';
import NotFound from './components/notfound/NotFound';



function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ProductsIndex />
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/products/:productId',
        element: <ProductShow />
      },
      {
        path: '/reviewaproduct',
        element: <ReviewCreateForm />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
