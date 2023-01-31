import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import HomeRoute from "./routes/HomeRoute";
import LoginRoute from "./routes/LoginRoute";
import UserProvider from "./context/UserProvider";
import SearchRoute from "./routes/SearchRoute";
import ProductRoute from "./routes/ProductRoute";
import ErrorPage from "./routes/ErrorPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomeRoute />} />
            <Route path="/error" element={<ErrorPage />} />

            <Route path="/login" element={<LoginRoute />} />

            <Route path="/search/:search" element={<SearchRoute />} />

            <Route path="/product/:id" element={<ProductRoute />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
