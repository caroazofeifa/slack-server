module.exports = {  
  // Secret key for JWT signing and encryption
  'secret': 'its not a seccret',
  // Database connection information
  'database': 'mongodb://localhost:27017/slack',
  // Setting port for server
  'port': process.env.PORT || 3000
}