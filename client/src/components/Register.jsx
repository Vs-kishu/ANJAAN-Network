import { PiPersonArmsSpreadFill } from "react-icons/pi";
import register from "../assets/register.svg";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "../utils/hooks/useForm";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "../store/slices/userSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogIn, setIsLogIn] = useState(false);
  const [error, setError] = useState({});
  const initialState = isLogIn
    ? { userName: "", password: "" }
    : { userName: "", email: "", password: "", confirmPassword: "" };

  const { onChange, onSubmit, values } = useForm(RegisterOrLogIn, initialState);

  const [addUser, { loading }] = useMutation(
    isLogIn ? LOGIN_INPUTS : REGISTER_INPUTS,
    {
      update(_, { data }) {
        const { login: LoginInfo, register: SignupInfo } = data;
        dispatch(saveUser(LoginInfo || SignupInfo));
        dispatch;
        navigate("/");
        window.location.reload();
      },
      onError(err) {
        setError(err.graphQLErrors[0].extensions.errors);
      },
      variables: values,
    }
  );

  function RegisterOrLogIn() {
    addUser();
  }

  const handleToggle = () => {
    setError({});
    setIsLogIn(!isLogIn);
  };

  const handleGuestLogin = async () => {
    await addUser({ variables: { userName: "GUEST", password: "guest" } });
  };

  return (
    <section className="flex flex-col items-center mt-5 ">
      <div className=" flex  items-center gap-2 mb-2">
        <PiPersonArmsSpreadFill className="text-4xl text-gray-500" />
        <h1 className="text-4xl font-kalam">
          {isLogIn ? "Log In" : "Sign Up"}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row  md:justify-between   gap-2 shadow-xl shadow-slate-400 roundes-xl px-4 py-8 md:h-[550px] w-full lg:w-[900px] bg-gray-50 border border-gray-400 rounded-xl">
        <div className="max-md:h-52 w-full md:w-96 flex-shrink-0 rounded-l-xl">
          <img
            className="w-full h-full "
            src={register}
            alt="Register and Login"
          />
        </div>
        <form
          onSubmit={onSubmit}
          className=" flex flex-col gap-4 font-kalam justify-center w-full md:w-96 rounded-r-xl"
        >
          <label htmlFor="userName" className="grid place-items-center">
            User Name
            <input
              type="text"
              id="userName"
              name="userName"
              value={values.userName}
              onChange={onChange}
              className="w-full py-2 rounded-xl px-5 border border-gray-400 font-sans"
            />
          </label>
          {!isLogIn && (
            <label htmlFor="email" className="grid place-items-center">
              Email Address
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={onChange}
                className="w-full py-2 rounded-xl px-5 border border-gray-400 font-sans"
              />
            </label>
          )}

          <label htmlFor="password" className="grid place-items-center">
            Password
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={onChange}
              className="w-full py-2 rounded-xl px-5 border border-gray-400 font-sans"
            />
          </label>

          {!isLogIn && (
            <label
              htmlFor="confirmPassword"
              className="grid place-items-center"
            >
              Confirm Password
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={onChange}
                className="w-full py-2 rounded-xl px-5 border border-gray-400 font-sans"
              />
            </label>
          )}
          <button
            className={`${
              loading && "animate-pulse"
            }  w-72 mx-auto rounded-full text-2xl py-2 font-bold bg-gray-500 hover:bg-gray-200`}
          >
            {loading ? "loading..." : isLogIn ? "Log In" : "Sign Up"}
          </button>
          {isLogIn && (
            <button
              type="button"
              onClick={handleGuestLogin}
              className={`${
                loading && "animate-pulse"
              }  w-72 mx-auto rounded-full text-2xl py-2 font-bold bg-gray-500 hover:bg-gray-200`}
            >
              {loading ? "loading..." : "Guset Log In"}
            </button>
          )}

          <span onClick={handleToggle} className="cursor-pointer">
            {isLogIn ? "Not An Account? " : "Already have an Account? "}
            <span className="hover:text-gray-500">
              {isLogIn ? "SignUp" : "LogIn"}
            </span>
          </span>
        </form>
      </div>
      {Object.keys(error).length > 0 && (
        <div className="absolute left-10 bottom-10">
          <Alert severity="error">
            <ul>
              {Object.values(error).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Alert>
        </div>
      )}
    </section>
  );
};

const REGISTER_INPUTS = gql`
  mutation register(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      userName
      token
      createdAt
    }
  }
`;
const LOGIN_INPUTS = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      id
      email
      userName
      token
      createdAt
    }
  }
`;

export default Register;
