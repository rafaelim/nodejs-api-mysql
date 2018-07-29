import Sequelize from "sequelize";
import fs from "fs";
import path from "path";

let database = null;
export let sequelize = null;
function loadModels(sequelize) {
  const dir = path.join(__dirname, "../model");
  const models = [];
  fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    models[model.name] = model;
  });
  return models;
}

function loadRelations() {
  for (const modelName in database.models) {
    if ("associate" in database.models[modelName]) {
      database.models[modelName].associate(database.models);
    }
  }
}

export default function() {
  if (!database) {
    sequelize = new Sequelize("dual_production", "root", "root", {
      host: "127.0.0.1",
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });

    database = {
      sequelize,
      Sequelize,
      models: {}
    };

    database.models = loadModels(sequelize);
    loadRelations();

    sequelize.sync({force: true}).done(() => database);
  }
  return database;
}
