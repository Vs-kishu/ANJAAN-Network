import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import { useCheckAuth } from "./utils/hooks/useCheckAuth";
import { useEffect } from "react";
import ProfilePage from "./components/ProfilePage";
import { AuthRoute } from "./utils/AuthRoute";

const App = () => {
  const { checkUser } = useCheckAuth();
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="register"
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />
        <Route path="/profile/:userName" element={<ProfilePage />}></Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
