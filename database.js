const sql = require('mssql/msnodesqlv8');

// Database configuration with windows authentication
const dbConfig = {
  server: 'CYG619\\SQLEXPRESS',
  database: 'frontend-engineer-db',
  driver: 'msnodesqlv8',

  options: {
    trustedConnection: true,
  },
};

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

module.exports = {
  pool,
  poolConnect,
};
