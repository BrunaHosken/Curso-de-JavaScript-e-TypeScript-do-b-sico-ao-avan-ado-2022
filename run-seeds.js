const { resolve } = require("path");
const { Sequelize } = require("sequelize");

// Lista de projetos que precisam executar seeds
const projetos = ["api_rest"];

async function getSequelizeInstance(projeto) {
  const dbConfig = require(resolve(
    __dirname,
    "projetos",
    projeto,
    "src",
    "config",
    "database.js"
  ));

  const config = {
    ...dbConfig,
    dialectOptions: {
      connectTimeout: 20000,
      ...dbConfig.dialectOptions,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };

  const sequelize = new Sequelize(config);

  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
    throw error;
  }

  return sequelize;
}

async function runSeed(sequelize, seedFile) {
  const seed = require(seedFile);
  const queryInterface = sequelize.getQueryInterface();

  try {
    await seed.up(queryInterface, Sequelize);
  } catch (error) {
    console.error(`Erro ao executar seed ${seedFile}:`, error.message);
    throw error;
  }
}

async function runSeedsForProject(projeto) {
  let sequelize;

  try {
    sequelize = await getSequelizeInstance(projeto);
    const seedsPath = resolve(
      __dirname,
      "projetos",
      projeto,
      "src",
      "database",
      "seed"
    );

    const fs = require("fs");
    const seedFiles = fs
      .readdirSync(seedsPath)
      .filter((file) => file.endsWith(".js"))
      .map((file) => resolve(seedsPath, file));

    for (const seedFile of seedFiles) {
      await runSeed(sequelize, seedFile);
    }
  } catch (error) {
    console.error(`Erro ao executar seeds para ${projeto}:`, error);
  } finally {
    if (sequelize) {
      await sequelize.close();
    }
  }
}

async function runAllSeeds() {
  for (const projeto of projetos) {
    await runSeedsForProject(projeto);
  }
}

runAllSeeds().catch(console.error);
