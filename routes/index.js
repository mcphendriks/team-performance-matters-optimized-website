import * as dotenv from "dotenv";
import express from "express";
import { fetchJson } from "../helpers/fetchWrapper.js";

dotenv.config(); //afkomstig uit env. bestand / hulpgramma voor gevoelige data (wachtwoorden, api)

const fakeFilters = [
  {
    difficult: {
      filter: "difficult",
      label: "Moeilijk",
      value: true,
    },
    aLotOfWater: {
      filter: "aLotOfWater",
      label: "Veel water",
      value: true,
    },
    insidePlant: {
      filter: "insidePlant",
      label: "Binnenplant",
      value: true,
    },
  },
  {
    difficult: {
      filter: "difficult",
      label: "Makkelijk",
      value: false,
    },
    aLotOfWater: {
      filter: "aLotOfWater",
      label: "Veel water",
      value: true,
    },
    insidePlant: {
      filter: "insidePlant",
      label: "Binnenplant",
      value: true,
    },
  },
  {
    difficult: {
      filter: "difficult",
      label: "Moeilijk",
      value: true,
    },
    aLotOfWater: {
      filter: "aLotOfWater",
      label: "Weinig water",
      value: false,
    },
    insidePlant: {
      filter: "insidePlant",
      label: "Binnenplant",
      value: true,
    },
  },
  {
    difficult: {
      filter: "difficult",
      label: "Moeilijk",
      value: true,
    },
    aLotOfWater: {
      filter: "aLotOfWater",
      label: "Veel water",
      value: true,
    },
    insidePlant: {
      filter: "insidePlant",
      label: "Buitenplant",
      value: false,
    },
  },
  {
    difficult: {
      filter: "difficult",
      label: "Moeilijk",
      value: true,
    },
    aLotOfWater: {
      filter: "aLotOfWater",
      label: "Veel water",
      value: true,
    },
    insidePlant: {
      filter: "insidePlant",
      label: "Binnenplant",
      value: true,
    },
  },
  {
    difficult: {
      filter: "difficult",
      label: "Moeilijk",
      value: true,
    },
    aLotOfWater: {
      filter: "aLotOfWater",
      label: "Veel water",
      value: true,
    },
    insidePlant: {
      filter: "insidePlant",
      label: "Binnenplant",
      value: true,
    },
  },
  {
    difficult: {
      filter: "difficult",
      label: "Moeilijk",
      value: true,
    },
    aLotOfWater: {
      filter: "aLotOfWater",
      label: "Veel water",
      value: true,
    },
    insidePlant: {
      filter: "insidePlant",
      label: "Binnenplant",
      value: true,
    },
  },
  {
    difficult: {
      filter: "difficult",
      label: "Moeilijk",
      value: true,
    },
    aLotOfWater: {
      filter: "aLotOfWater",
      label: "Veel water",
      value: true,
    },
    insidePlant: {
      filter: "insidePlant",
      label: "Binnenplant",
      value: true,
    },
  },
  {
    difficult: {
      filter: "difficult",
      label: "Moeilijk",
      value: true,
    },
    aLotOfWater: {
      filter: "aLotOfWater",
      label: "Veel water",
      value: true,
    },
    insidePlant: {
      filter: "insidePlant",
      label: "Binnenplant",
      value: true,
    },
  },
  {
    difficult: {
      filter: "difficult",
      label: "Moeilijk",
      value: true,
    },
    aLotOfWater: {
      filter: "aLotOfWater",
      label: "Veel water",
      value: true,
    },
    insidePlant: {
      filter: "insidePlant",
      label: "Binnenplant",
      value: true,
    },
  },
  {
    difficult: {
      filter: "difficult",
      label: "Moeilijk",
      value: true,
    },
    aLotOfWater: {
      filter: "aLotOfWater",
      label: "Veel water",
      value: true,
    },
    insidePlant: {
      filter: "insidePlant",
      label: "Binnenplant",
      value: true,
    },
  },
  {
    difficult: {
      filter: "difficult",
      label: "Moeilijk",
      value: true,
    },
    aLotOfWater: {
      filter: "aLotOfWater",
      label: "Veel water",
      value: true,
    },
    insidePlant: {
      filter: "insidePlant",
      label: "Binnenplant",
      value: true,
    },
  },
  {
    difficult: {
      filter: "difficult",
      label: "Moeilijk",
      value: true,
    },
    aLotOfWater: {
      filter: "aLotOfWater",
      label: "Veel water",
      value: true,
    },
    insidePlant: {
      filter: "insidePlant",
      label: "Binnenplant",
      value: true,
    },
  },
  {
    difficult: {
      filter: "difficult",
      label: "Moeilijk",
      value: true,
    },
    aLotOfWater: {
      filter: "aLotOfWater",
      label: "Veel water",
      value: true,
    },
    insidePlant: {
      filter: "insidePlant",
      label: "Binnenplant",
      value: true,
    },
  },
];

const indexRoute = express.Router(); // difinieert de index.js route (staat in het mapje sever)
indexRoute.get("/", (request, response) => {
  //deze route wordt opgehaald wanneer er een een get-verzoek wordt gedaan naar de index.js
  const url = `${process.env.API_URL}/stekjes`; // hier wordt het eindpoint url weergegevene (staat in en .env bestand)
  fetchJson(url).then((data) => {
    const newData = data.stekjes.map((stek, index) => {
      stek.filters = [
        fakeFilters[index].difficult,
        fakeFilters[index].aLotOfWater,
        fakeFilters[index].insidePlant,
      ];
      return stek;
    });

    const difficultyRating = request.query.difficult || "all";
    const filteredData = newData.filter((stek) => {
      if (
        difficultyRating == "all" ||
        stek.filters[0].value.toString() == difficultyRating
      ) {
        return stek;
      }
    });
    // console.log(newData);
    //vervolgens wordt de data gefetch en response gestuurd als promise die json-gegvens bevat @helpers map
    response.render("index", { stekjes: filteredData }); // ten slot wordt index.ejs gerenderd met JSON-gegevens
  });
});

export default indexRoute; //exporteert de route in het server.js mapje -> import indexRoute from "./routes/index.js";
