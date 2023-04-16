import { createContext, useState, useEffect } from "react";
import { URL_API } from "../utils/URL";
import { FetchApi } from "../utils/FetchApi";
import { cookieManager, MAXAGETOKEN } from "../utils/cookieManager";

const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);

  function logIn(id, jwt, refreshToken = undefined) {
    setLoadingPage(true);
    const url = `${URL_API}/user/data/id/${id}`;
    FetchApi.getData(url, jwt).then((res) => {
      setLoadingPage(false);
      if (res.status === 200) {
        setUser(res.data);
        setToken(jwt);
        if (refreshToken) {
          //Guardamos en las cookies el refreshToken:
          cookieManager.set("refreshSharknet", refreshToken, {
            maxAge: MAXAGETOKEN,
          });
        }
      }
    });
  }

  /** Función para desloguear al usuario  **/
  function logOut() {
    setUser(undefined);
    cookieManager.remove("refreshSharknet");
  }

  useEffect(() => {
    const refreshToken = cookieManager.get("refreshSharknet");
    if (!refreshToken) return setLoadingPage(false);
    //Si existe un token de sesión pedimos los datos al servidor:
    FetchApi.refreshLogin(`${URL_API}/auth/session`, { refreshToken }).then(
      (res) => {
        if (res.status !== 200) {
          cookieManager.remove("refreshSharknet");
        } else {
          logIn(res.data.uid, res.data.token);
        }
      }
    );
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loadingPage,
        setToken,
        logIn,
        logOut,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext };
export default UserProvider;
