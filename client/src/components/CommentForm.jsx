import { TextField } from "@mui/material";
import { useForm } from "../utils/hooks/useForm";
import { gql, useMutation } from "@apollo/client";
import { GET_POSTS } from "../graphql/queries";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
const CommentForm = ({ props }) => {
  const { setIsOpen, comments, id } = props;
  const { user } = useSelector((store) => store.user);
  const { values, onChange, onSubmit } = useForm(handlePost, {
    postID: id,
    body: "",
  });

  const [createPost] = useMutation(CREATE_COMMENT, {
    update(_, { data }) {
      console.log(data);
    },
    refetchQueries: [GET_POSTS, "getPosts"],
    variables: values,
  });

  const [deletePost] = useMutation(DELETE_COMMENT, {
    update(_, { data }) {
      console.log(data);
    },
    refetchQueries: [GET_POSTS, "getPosts"],
  });
  function handlePost() {
    createPost();
    setIsOpen(false);
  }
  function handleDelete(commentID) {
    deletePost({ variables: { postID: id, commentID } });
  }
  return (
    <div
      onClick={() => setIsOpen(false)}
      className="h-screen w-screen z-50 bg-black bg-opacity-50 backdrop-blur-sm fixed flex justify-center items-center top-0 left-0"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-100 flex flex-col gap-4 w-96 p-4 rounded-xl"
        onSubmit={onSubmit}
      >
        <div>
          <ul>
            {comments.map(({ body, id, userName }) => (
              <li className="flex justify-between" key={id}>
                <span className="text-pink-950 font-bold">{userName}</span> 🚀{" "}
                {body}
                {user?.userName === userName && (
                  <MdDelete
                    className="text-lg hover:text-pink-950 cursor-pointer hover:scale-110"
                    onClick={() => handleDelete(id)}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
        <TextField
          label="comment"
          variant="standard"
          name="body"
          value={values.body}
          onChange={onChange}
        />

        <button
          type="submit"
          className="bg-pink-700 py-1 rounded-full hover:bg-pink-600 text-bold font-kalam text-xl"
        >
          COMMENT
        </button>
      </form>
    </div>
  );
};

export default CommentForm;

const CREATE_COMMENT = gql`
  mutation createComment($postID: ID!, $body: String!) {
    createComment(postID: $postID, body: $body) {
      id
    }
  }
`;
const DELETE_COMMENT = gql`
  mutation deleteComment($postID: ID!, $commentID: ID!) {
    deleteComment(postID: $postID, commentID: $commentID)
  }
`;
