import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeProvider, extendTheme } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App } from './App'
import { RegisterPage } from './pages/register_page';
import { VerifyAccount } from './pages/verify';
import { LoginUser } from "./pages/login_username";
import { Profile } from './pages/profile';
import { LoginEmail } from "./pages/login_email";
import { LoginPhone } from "./pages/login_phone";
import { Forget } from './pages/forget';
import { ResetPassword } from './pages/reset_password';
import { Articles } from './pages/article';
import { DynamicArticle } from './pages/dynamic_article';
import { WriteArticle } from "./pages/write_article";
import { Provider } from 'react-redux';
import store from './redux/store';

const BrowserRouter = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/verification/:token", element: <VerifyAccount /> },
  { path: "/profile", element: <Profile /> },
  { path: "/login_user", element: <LoginUser /> },
  { path: "/login_email", element: <LoginEmail /> },
  { path: "/login_phone", element: <LoginPhone /> },
  { path: "/forget_password", element: <Forget /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
  { path: "/article", element: <Articles /> },
  { path: "/article/:id", element: <DynamicArticle /> },
  { path: "/write", element: <WriteArticle /> },
]);

const colorModeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config: { initialColorMode: colorModeConfig.initialColorMode } });

const DarkModeWrapper = ({ children }) => {
  React.useEffect(() => {
    localStorage.setItem('chakra-ui-color-mode', 'dark');
    localStorage.removeItem('chakra-ui-color-mode')
    localStorage.setItem('chakra-ui-color-mode', 'dark');
  });
  return <>{children}</>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DarkModeWrapper>
    <ColorModeProvider options={colorModeConfig}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={BrowserRouter}>
            <div style={{ backgroundColor: '#02090E', width: '100vw', height: '100vh' }}>
              
            </div>
          </RouterProvider>
        </Provider>
      </ChakraProvider>
    </ColorModeProvider>
  </DarkModeWrapper>
);
