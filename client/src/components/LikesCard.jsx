import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const LikesCard = ({ props }) => {
  const { likes, setOpenLike } = props;

  return (
    <div
      onClick={() => setOpenLike(false)}
      className="fixed flex justify-center items-center h-screen z-50 backdrop-blur-sm w-screen top-0 left-0 bg-black bg-opacity-25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-pink-300 w-52 p-5 rounded-xl shadow-xl shadow-black"
      >
        <h2 className="text-center text-white  font-bold px-4 py-2">Likes</h2>
        <AiFillCloseCircle
          onClick={() => setOpenLike(false)}
          className="text-2xl cursor-pointer text-pink-950 absolute top-2 right-2 hover:scale-110 "
        />
        <hr className="h-2" />
        <ul>
          {likes?.map(({ userName, id }) => (
            <li
              className="font-semibold cursor-pointer hover:scale-105 text-pink-700 text-center"
              key={id}
            >
              <Link to={`/profile/${userName}`}> {userName}</Link>
              <hr className="bg-pink-400 h-0.5 border-0" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LikesCard;
