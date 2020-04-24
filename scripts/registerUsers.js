/**
 * CSV FORMAT
 * name,lastName,email,identification,status,role
 */

const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const UserController = require("../api/modules/users/users-controller");

const init = async () => {
  const csv = fs.readFileSync("scripts/data/usuarios.csv");
  const rows = await parse(csv, { columns: true, skip_empty_lines: true });
  for (const user of rows) {
    console.log(user.email);
    user.status = (user.status === "activo") ? "ACTIVE" : "INACTIVE";
    user.password = user.identification;
    await UserController.register(user, { id: 1 });
  }
};


try {
  init();
} catch (error) {
  console.error(error);
  process.exit(-1);
}