const {
  createImage,
  getImages,
  getImageById,
} = require("./signature.controller");
const signatureRouter = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

signatureRouter.post("/", createImage);
signatureRouter.get("/", getImages);
signatureRouter.get("/:id", getImageById);

module.exports = signatureRouter;
