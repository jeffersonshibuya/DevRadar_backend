const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    // Buscar todos os devs num raio de 10km e as tecnologias
    const { techs, latitude, longitude } = req.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude * 1, latitude * 1],
          },
          $maxDistance: 10000,
        },
      },
    });

    return res.json(devs);
  },
};
