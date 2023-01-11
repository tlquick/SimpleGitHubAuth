if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const axios = require("axios");
var cors = require("cors");

const app = express();
app.use(cors({ credentials: true, origin: true }));

app.get("/auth/redirect", (req, res) => {
  axios({
    method: "POST",
    url: `${process.env.GITHUB_URL}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.query.code}`,
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    console.log("token is " + response.data.access_token);
    res.redirect(
      `http://localhost:3000?access_token=${response.data.access_token}`
    );
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
