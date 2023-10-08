import { PiPersonFill } from "react-icons/pi";
import { GiExitDoor } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../store/slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  return (
    <nav className="relative bg-gray-50 flex justify-start md:justify-center gap-5 items-center shadow-sm z-[1000] shadow-slate-600 p-3">
      <h1 className=" text-xl sm:text-4xl  font-croisant text-red-950">
        ANJAAN-NETWORK
      </h1>
      <div className="flex items-center gap-2 absolute right-5 md:right-20">
        <span className="font-bold font-kalam text-pink-900">
          {user?.userName}
        </span>
        {user ? (
          <PiPersonFill className="text-4xl cursor-pointer" />
        ) : (
          <Link to={"register"} className="font-kalam hover:text-gray-400">
            LogIn/SignUp
          </Link>
        )}
        {user && (
          <GiExitDoor
            onClick={() => dispatch(removeUser())}
            className="text-4xl cursor-pointer "
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
