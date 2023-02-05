import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import VerifyAccess from "./components/accesories/VerifyAccess";
import HomeRoute from "./routes/general/HomeRoute";
import LoginRoute from "./routes/general/LoginRoute";
import UserProvider from "./context/UserProvider";
import SearchRoute from "./routes/general/SearchRoute";
import ProductRoute from "./routes/products/ProductRoute";
import ErrorPage from "./routes/general/ErrorPage";
import ProductsRoute from "./routes/products/ProductsRoute";
import SellProductRoute from "./routes/products/SellProductRoute";
import MyProductsRoute from "./routes/products/MyProductsRoute";
import EditProductRoute from "./routes/products/EditProductRoute";

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

            {/** ----------- PRODUCTOS -----------  **/}
            <Route path="/products" element={<ProductsRoute />} />
            <Route
              path="/products/user/:id"
              element={
                <VerifyAccess>
                  <MyProductsRoute />
                </VerifyAccess>
              }
            />
            <Route
              path="/products/publish"
              element={
                <VerifyAccess>
                  <SellProductRoute />
                </VerifyAccess>
              }
            />
            <Route path="/products/edit/:id" element={<EditProductRoute />} />

            {/** ---------- PRODUCTO INDIVIDUAL ----------**/}
            <Route path="/product/:id" element={<ProductRoute />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
