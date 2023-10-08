import ReactDOM from "react-dom/client";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";

const token = localStorage.getItem("userToken");
const client = new ApolloClient({
  uri: "http://localhost:8080/",
  cache: new InMemoryCache(),
  headers: {
    Authorization: token ? `Bearer ${token}` : "", // Add the token to the headers
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
