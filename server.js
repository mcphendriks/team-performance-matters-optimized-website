import express from "express";
import indexRoute from "./routes/index.js";
import reservationRoute from "./routes/plantReservation.js";
import plantRoute from "./routes/plantNew.js";

// Maak een nieuwe express app
const server = express();

// Stel het poortnummer in
server.set("port", process.env.PORT || 8080);

// Stel de views in
server.set("view engine", "ejs");
server.set("views", "./views");

// Stel de public map in
server.use(express.static("public"));

// na submit Stel afhandeling van formulieren in
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Stel de files routes in
server.use("/", indexRoute);
server.use("/plant", reservationRoute);
server.use("/aanmelden", plantRoute);

// Start met luisteren
server.listen(server.get("port"), () => {
  console.log(`Application started on http://localhost:${server.get("port")}`);
});
