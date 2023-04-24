import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

const reservationRoute = express.Router();

//  De GET-request haalt gegeven op uit de server. Vervolgens wordt er gecontroleerd of er een query Id is meegegeven. Als deze niet bestaat, wordt de gebruiker terug gestuurd naar index.ejs PAGE
reservationRoute.get("/", (request, response) => {
  response.render("plantReservation");
  const url = `${process.env.API_URL}/stekjes/?id=${id}`;
});

export default reservationRoute;
