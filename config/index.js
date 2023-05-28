const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

module.exports = {
  rootPath: path.resolve(__dirname, '..'),
  SALT: process.env.SALT,
  serviceName: process.env.SERVICE_NAME,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_SALT: process.env.JWT_SALT,
  JWT_EXPIRED: process.env.JWT_EXPIRED,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD
}
