const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const connectDatabase = require("./config/database.js");
const cors = require("cors");

const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const clientRoutes = require("./routes/client.js");
const generalRoutes = require("./routes/general.js");
const managementRoutes = require("./routes/management.js");
const salesRoutes = require("./routes//sales.js");
const errorMiddleware = require("./middlewares/error");

//configurantion
dotenv.config({ path: path.join(__dirname, "config/config.env") });
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); //make cross orgin request
app.use(morgan("common")); //if we want api call from other server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

app.use(errorMiddleware);

//mongoose connection
connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(
    `My Server listening to the port: ${process.env.PORT || 5001} in  ${
      process.env.NODE_ENV
    } `
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled rejection error");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception error");
  server.close(() => {
    process.exit(1);
  });
});
