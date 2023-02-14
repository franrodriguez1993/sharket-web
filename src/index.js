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
import ProfileRoute from "./routes/profile/ProfileRoute";
import PersonalDataRoute from "./routes/profile/PersonalDataRoute";
import ChangeMailRoute from "./routes/profile/ChangeMailRoute";
import PasswordRoute from "./routes/profile/PasswordRoute";
import ChangeImageRoute from "./routes/profile/ChangeImageRoute";
import BirthdayRoute from "./routes/profile/BirthdayRoute";
import AddressRoute from "./routes/profile/AddressRoute";
import CreditCardRoute from "./routes/profile/CreditCardRoute";
import PanelStaffRoute from "./routes/superuser/PanelStaffRoute";
import PanelAdminRoute from "./routes/superuser/PanelAdminRoute";
import FavoritesRoute from "./routes/profile/FavoritesRoute";
import NotificationRoute from "./routes/profile/NotificationRoute";
import ProductCommentRoute from "./routes/products/ProductCommentRoute";
import CartRoute from "./routes/general/CartRoute";
import CartProvider from "./context/CartProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
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
              <Route
                path="/products/user/buys"
                element={
                  <VerifyAccess>
                    <ViewBuysRoute />
                  </VerifyAccess>
                }
              />

              {/** ---------- PRODUCTO INDIVIDUAL ----------**/}
              <Route path="/product/:id" element={<ProductRoute />} />
              <Route
                path="/product/comments/:id"
                element={
                  <VerifyAccess>
                    <ProductCommentRoute />
                  </VerifyAccess>
                }
              />

              {/** ----------------- PROFILE ----------------- **/}
              <Route
                path="/profile"
                element={
                  <VerifyAccess>
                    <ProfileRoute />
                  </VerifyAccess>
                }
              />
              <Route
                path="/profile/data"
                element={
                  <VerifyAccess>
                    <PersonalDataRoute />
                  </VerifyAccess>
                }
              />

              <Route
                path="/profile/mail"
                element={
                  <VerifyAccess>
                    <ChangeMailRoute />
                  </VerifyAccess>
                }
              />
              <Route
                path="/profile/password"
                element={
                  <VerifyAccess>
                    <PasswordRoute />
                  </VerifyAccess>
                }
              />
              <Route
                path="/profile/image"
                element={
                  <VerifyAccess>
                    <ChangeImageRoute />
                  </VerifyAccess>
                }
              />
              <Route
                path="/profile/birthday"
                element={
                  <VerifyAccess>
                    <BirthdayRoute />
                  </VerifyAccess>
                }
              />
              <Route
                path="/profile/address"
                element={
                  <VerifyAccess>
                    <AddressRoute />
                  </VerifyAccess>
                }
              />

              <Route
                path="/profile/creditcard"
                element={
                  <VerifyAccess>
                    <CreditCardRoute />
                  </VerifyAccess>
                }
              />

              <Route
                path="/profile/favorite"
                element={
                  <VerifyAccess>
                    <FavoritesRoute />
                  </VerifyAccess>
                }
              />

              <Route
                path="/profile/notification"
                element={<NotificationRoute />}
              />

              {/** ----------------------- SUPERUSER -------------------- **/}
              <Route
                path="/panel/staff"
                element={
                  <VerifyAccess>
                    <PanelStaffRoute />
                  </VerifyAccess>
                }
              />
              <Route
                path="/panel/admin/*"
                element={
                  <VerifyAccess>
                    <PanelAdminRoute />
                  </VerifyAccess>
                }
              />

              {/** ----------------------- CART -------------------- **/}
              <Route path="/cart" element={<CartRoute />} />
            </Route>
          </Routes>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
