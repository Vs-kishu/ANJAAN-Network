import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  console.log("her");
  if (user) {
    return <Navigate to={"/"} />;
  }
  return children;
};
