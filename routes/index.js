import * as dotenv from "dotenv";
import express from "express";
import { fetchJson } from "../helpers/fetchWrapper.js";

dotenv.config(); //afkomstig uit env. bestand / hulpgramma voor gevoelige data (wachtwoorden, api)

const indexRoute = express.Router(); // difinieert de index.js route (staat in het mapje sever)

indexRoute.get("/", (request, response) => {
  //deze route wordt opgehaald wanneer er een een get-verzoek wordt gedaan naar de index.js
  const url = `${process.env.API_URL}/stekjes`; // hier wordt het eindpoint url weergegevene (staat in en .env bestand)
  fetchJson(url).then((data) => {
    //vervolgens wordt de data gefetch en response gestuurd als promise die json-gegvens bevat @helpers map
    response.render("index", data); // ten slot wordt index.ejs gerenderd met JSON-gegevens
  });
});

export default indexRoute; //exporteert de route in het server.js mapje -> import indexRoute from "./routes/index.js";
