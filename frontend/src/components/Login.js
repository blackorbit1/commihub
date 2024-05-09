import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/authSlice";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("jwt", token);
      const decoded = jwtDecode(token);
      dispatch(setUser(decoded.user));
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate, dispatch]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner size="xl" />
    </div>
  );
}

export default Login;
