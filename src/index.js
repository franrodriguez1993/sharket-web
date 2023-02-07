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
import ViewSalesRoute from "./routes/products/ViewSalesRoute";
import ViewBuysRoute from "./routes/products/ViewBuysRoute";
import RegisterRoute from "./routes/general/RegisterRoute";

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
            <Route path="/register" element={<RegisterRoute />} />
            <Route path="/search/:search" element={<SearchRoute />} />

            {/** ----------- PRODUCTOS -----------  **/}
            <Route path="/products" element={<ProductsRoute />} />
            <Route
              path="/products/user/list/:id"
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
            <Route
              path="/products/edit/:id"
              element={
                <VerifyAccess>
                  <EditProductRoute />
                </VerifyAccess>
              }
            />

            <Route
              path="/products/user/sales"
              element={
                <VerifyAccess>
                  <ViewSalesRoute />
                </VerifyAccess>
              }
            />
            <Route path="/products/user/buys" element={<ViewBuysRoute />} />

            {/** ---------- PRODUCTO INDIVIDUAL ----------**/}
            <Route path="/product/:id" element={<ProductRoute />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
