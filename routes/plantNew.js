import * as dotenv from "dotenv";
import { postJson, fetchJson } from "../helpers/fetchWrapper.js";
import express from "express";

dotenv.config();

const plantRoute = express.Router();

// haalt planten gegevens(data) op uit API
plantRoute.get("/", (request, response) => {
  response.render("plantNew");
});

// Toon het formulier om een nieuw plantje te doneren
plantRoute.get("/aanmelden", (request, response) => {
  response.render("plantNew.ejs");
});

// Handel het versturen van het formulier af
// Roep de API aan met de post methode en post in de API, die vervolgens wordt getoond in de index.ejs waar de get plaats vindt.
plantRoute.post("/", (request, response) => {
  const baseUrl = `${process.env.API_URL}/stekjes`;
  postJson(baseUrl, request.body).then((data) => {
    if (data.success) {
      response.redirect("/"); // plant meegeven, message meegeven
      // Toon opnieuw het formulier (met waarden) als het niet gelukt is
    } else {
      response.render("plantNew.ejs", { error: data.error }); // Fail, message meegeven
    }
    //   //  De waarden uit het formulier (niet de API)
    console.log(JSON.stringify(request.body));
  });
});

export default plantRoute;
