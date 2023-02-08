import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { URL_API } from "../utils/URL.js";
import ManageFetch from "../utils/manageFetch.jsx";
import { UserContext } from "../context/UserProvider.jsx";

const useLogin = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const { FetchFunction } = ManageFetch();
  const { logIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmitLogin = (e) => {
    setError("");
    e.preventDefault();
    if (!form.mail.trim() || !form.password.trim()) {
      return setError("Required fields");
    }
    setLoginLoading(true);
    FetchFunction({
      url: `${URL_API}/user/login`,
      method: "POST",
      body: form,
    }).then((res) => {
      setLoginLoading(false);
      if (res.status === 400 || res.status === 404) {
        return setError("Invalid credentials");
      } else if (res.status === 500) {
        return setError("Server error");
      } else if (res.status === 200) {
        setError("");
        logIn(res.data.uid, res.data.token, res.data.refreshToken);
        navigate("/");
      }
    });
  };

  return {
    form,
    error,
    loginLoading,
    handleChange,
    handleSubmitLogin,
  };
};
export default useLogin;
