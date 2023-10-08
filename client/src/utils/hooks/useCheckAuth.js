import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { saveUser } from "../../store/slices/userSlice";
export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const checkUser = () => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("userToken");
        return;
      }
      dispatch(saveUser({ token, decodedToken }));
    }
  };
  return { checkUser };
};
