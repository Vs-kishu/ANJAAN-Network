import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);

  if (user) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);

  if (!user) {
    return <Navigate to={"/register"} />;
  }
  return children;
};
