const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const db = require("./Config/db");
const bodyParser = require("body-parser");
const UserRoutes = require("./Routes/UserRoute");
const { errorMiddleware } = require("./Middleware/ErrorMiddleware");
dotenv.config();
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");

db();

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", UserRoutes);
app.use(errorMiddleware);

// app.get("/", (req, res) => {
//   res.json({ message: "Hello Oyewale" });
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
