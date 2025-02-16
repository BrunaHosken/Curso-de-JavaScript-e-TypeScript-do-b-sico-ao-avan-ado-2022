const { resolve } = require("path");
const { Sequelize } = require("sequelize");

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
    logging: false,
  };

  const sequelize = new Sequelize(config);

  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Erro na conexão com o banco de dados:", error);
    throw error;
  }

  return sequelize;
}

async function runMigration(sequelize, migrationFile) {
  const migration = require(migrationFile);
  const queryInterface = sequelize.getQueryInterface();

  try {
    await migration.up(queryInterface, Sequelize);
  } catch (error) {
    console.error(`Erro na migração ${migrationFile}:`, error.message);
    throw error;
  }
}

async function runMigrationsForProject(projeto) {
  let sequelize;

  try {
    sequelize = await getSequelizeInstance(projeto);
    const migrationsPath = resolve(
      __dirname,
      "projetos",
      projeto,
      "src",
      "database",
      "migrations"
    );

    const queryInterface = sequelize.getQueryInterface();

    await queryInterface
      .createTable("SequelizeMeta", {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
      })
      .catch((error) => {
        if (!error.message.includes("already exists")) {
          throw error;
        }
      });

    const executedMigrations = await sequelize.query(
      "SELECT name FROM SequelizeMeta",
      {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      }
    );

    const executedNames = new Set(executedMigrations.map((m) => m.name));

    const fs = require("fs");
    const migrationFiles = fs
      .readdirSync(migrationsPath)
      .filter((file) => file.endsWith(".js"))
      .sort()
      .map((file) => ({
        name: file,
        path: resolve(migrationsPath, file),
      }));

    for (const migration of migrationFiles) {
      if (!executedNames.has(migration.name)) {
        await runMigration(sequelize, migration.path);

        await sequelize.query("INSERT INTO SequelizeMeta (name) VALUES (?)", {
          replacements: [migration.name],
          type: Sequelize.QueryTypes.INSERT,
        });
      }
    }
  } catch (error) {
    console.error(`Erro nas migrações do projeto ${projeto}:`, error);
  } finally {
    if (sequelize) {
      await sequelize.close();
    }
  }
}

async function runAllMigrations() {
  for (const projeto of projetos) {
    await runMigrationsForProject(projeto);
  }
}

runAllMigrations().catch((error) => {
  console.error("Erro ao executar migrações:", error);
});
