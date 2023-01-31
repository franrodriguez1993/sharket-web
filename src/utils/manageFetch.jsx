import { useContext } from "react";
import { cookieManager } from "./cookieManager";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { UserContext } from "../context/UserProvider";
import { URL_API } from "./URL";

const ManageFetch = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(UserContext);
  const refreshToken = cookieManager.get("refreshSharknet");

  /**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CHECK-TOKEN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~**/

  //Función chequear token:
  async function checkToken() {
    if (!token) return;

    const decoded = jwtDecode(token);
    const expiration = new Date(decoded.exp * 1000);
    const actualHour = new Date();
    if (expiration.toISOString() <= actualHour.toISOString()) {
      const res = await fetch(`${URL_API}/user/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });
      const resJson = await res.json();

      if (res.message === "SESSION_EXPIRED") {
        cookieManager.remove("refreshSharknet");
        navigate("/login");
      } else {
        setToken(resJson.data.token);
        return resJson.data.token;
      }
    } else {
      return token;
    }
  }

  /**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FetchFunction ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~**/
  async function FetchFunction({
    url,
    method = "GET",
    body = {},
    files = false,
    jwt = undefined,
  }) {
    const token = await checkToken(jwt);
    try {
      if (method === "GET" || method === "DELETE") {
        const res = await fetch(url, {
          method: method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        return await res.json();
      } else {
        //Fetch de JSONs:
        if (!files) {
          const res = await fetch(url, {
            method: method,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          return await res.json();
        }
        //Fetch de archivos:
        else {
          const res = await fetch(url, {
            method: method,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: body,
          });
          return await res.json();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  //RETURNS:
  return {
    FetchFunction,
  };
};
export default ManageFetch;
