import * as dotenv from "dotenv";
import express from "express";
import { postJson, fetchJson } from "../helpers/fetchWrapper.js";


dotenv.config();

const reservationRoute = express.Router();

// GET-request haalt gegevens op uit de server. 
// Vervolgens wordt er gecontroleerd of er een query Id is meegegeven. 
// Als deze niet bestaat, wordt de gebruiker terug gestuurd naar index.ejs pagina.
reservationRoute.get("/", (request, response) => {
  const id = request.query.id
  const url = `${process.env.API_URL}/stekjes/?id=${id}`;
  fetchJson(url).then((data) => {
    console.log(data.stekje)
    //vervolgens wordt de data gefetch en response gestuurd als promise die json-gegvens bevat @helpers map
    response.render("plantReservation",
        data
      ); // ten slot wordt index.ejs gerenderd met JSON-gegevens
  });
});

// haalt data van 1 plant op uit API
reservationRoute.get("/", (request, response) => {
  response.render("plantReservation");
});

// Toont het formulier om een plant te reserveren
reservationRoute.get("/reserveren", (request, response) => {
  response.render("plantReservation.ejs");
});


// Handelt het versturen van het formulier af
// POST Roept API aan,  (GET op index.ejs haalt de nieuwe data binnen)
reservationRoute.post("/", (request, response) => {
  const baseUrl = `${process.env.API_URL}/stekje`;
  postJson(baseUrl, request.body).then((data) => {
    if (data.success) {
      response.redirect("/"); // Success = success message meegeven
      // No success = Toont opnieuw het formulier (met eerder ingevulde waarden)
    } else {
      response.render("plantReservation.ejs", { error: data.error }); // Fail = message meegeven
    }
    // De eerder ingevulde waarden uit het formulier 
    console.log(JSON.stringify(request.body));
  });
});

export default reservationRoute;
