import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get(
      "access_token"
    );
    const user_url = process.env.REACT_APP_GITHUB_USER;
    axios
      .get(`${user_url}`, {
        headers: {
          Authorization: " Bearer " + token,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }, []);
  const auth_url =
    process.env.REACT_APP_GITHUB_AUTH +
    "?client_id=" +
    process.env.REACT_APP_CLIENT_ID +
    "&redirect_uri=" +
    process.env.REACT_APP_REDIRECT;
  return (
    <div className="App text-center container-fluid">
      {!loggedIn ? (
        <>
          <img
            className="mb-4"
            src={process.env.REACT_APP_GITHUB_LOGO}
            width="150"
            alt=""
          ></img>
          <h1 className="h3 mb-3 font-weight-normal">Sign in with GitHub</h1>
          <Button type="primary" className="btn" size="lg" href={auth_url}>
            Sign in
          </Button>
        </>
      ) : (
        <>
          <h1>Welcome! {user.name}</h1>
          <p>
            This is a simple integration between OAuth2 on GitHub with Node.js
          </p>
        </>
      )}
    </div>
  );
}

export default App;
