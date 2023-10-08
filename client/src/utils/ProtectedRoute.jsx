import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);

  if (user) {
    return <Navigate to={"/"} />;
  }
  // Render the children components if the user is authenticated
  return children;
};

export default ProtectedRoute;
