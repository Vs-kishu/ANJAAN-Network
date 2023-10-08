import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import { useCheckAuth } from "./utils/hooks/useCheckAuth";
import { useEffect } from "react";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  const { checkUser } = useCheckAuth();
  useEffect(() => {
    console.log("rendered");
    checkUser();
  }, [checkUser]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="register"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
