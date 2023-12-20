import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admin_protection = () => {
  const navigate = useNavigate();
  const { user, logout } = useSelector((state) => state.user);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user?.role !== "admin") {
        navigate("/");
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [user, navigate]);

  useEffect(() => {
    if (logout) {
      navigate("/");
    }
  }, [logout, navigate]);
};

export default Admin_protection;
