import { Sequelize } from 'sequelize';
import config from '../config/config.js'; // Adjust the path if necessary

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

if (!dbConfig) {
  throw new Error(`Database configuration not found for environment: ${env}`);
}

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: console.log, // Enable detailed logging
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Required for Render
      },
      connectTimeout: 60000, // Increase timeout to 60 seconds
    },
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('✅ Connection has been established successfully.');
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });

export { sequelize };
