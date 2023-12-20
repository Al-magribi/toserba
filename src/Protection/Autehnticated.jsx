import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Authenticated = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user?.role !== "admin" && user?.role !== "user") {
        navigate("/");
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [user, navigate]);

  useEffect(() => {
    if (logout) {
      navigate("/");
    }
  }, [logout, navigate]);
};

export default Authenticated;
