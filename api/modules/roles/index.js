const RolesController = require("./roles-controller");

module.exports = (app) => {
  app.route("/roles")
    .post(async (req, res) => {
      const data = await RolesController.createRole(req.body.name);
      res.send({ status: 200, data: data.id });
    });
};
