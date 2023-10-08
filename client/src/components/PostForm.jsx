import { TextField } from "@mui/material";
import { useForm } from "../utils/hooks/useForm";
import { gql, useMutation } from "@apollo/client";
import { GET_POSTS } from "../graphql/queries";
const PostForm = ({ props }) => {
  const { setIsOpen } = props;
  const { values, onChange, onSubmit } = useForm(handlePost, { body: "" });

  const [createPost] = useMutation(CREATE_POST, {
    update(_, { data }) {
      console.log(data);
    },
    refetchQueries: [GET_POSTS, "getPosts"],
    variables: values,
  });
  function handlePost() {
    createPost();
    setIsOpen(false);
  }
  return (
    <div
      onClick={() => setIsOpen(false)}
      className="h-screen w-screen  z-50 bg-black bg-opacity-50 backdrop-blur-sm fixed flex justify-center items-center top-0 left-0"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-100 flex flex-col gap-4 w-96 p-4 rounded-xl"
        onSubmit={onSubmit}
      >
        <TextField
          id="outlined-multiline-static"
          label="CREATE POST"
          multiline
          rows={4}
          name="body"
          value={values.body}
          onChange={onChange}
        />
        <button
          type="submit"
          className="bg-pink-700 py-1 rounded-full hover:bg-pink-600 text-bold font-kalam text-4xl"
        >
          POST
        </button>
      </form>
    </div>
  );
};

export default PostForm;

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
    }
  }
`;
