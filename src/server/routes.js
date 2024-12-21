const { postPredictHandler, getPredictHistoriesHandler } = require("./handler");
const InputError = require("../exceptions/InputError");
const FileSizeError = require("../exceptions/FileSizeError");

const routes = [
  {
    path: "/predict",
    method: "POST",
    handler: postPredictHandler,
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 1000000,
        failAction: (request, h, err) => {
          throw new FileSizeError(
            "Payload content length greater than maximum allowed: 1000000"
          );
        },
      },
    },
  },
  {
    path: "/predict/histories",
    method: "GET",
    handler: getPredictHistoriesHandler,
  },
];

module.exports = routes;
