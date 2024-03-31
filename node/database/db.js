import { Sequelize } from "sequelize";

const db = new Sequelize("blogs", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;

