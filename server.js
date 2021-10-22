const http = require('http');
const app = require('./app');
const port = 5000;
const db = require('./models');

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`listen on port ${port}`);
  });
});

const server = http.createServer(app);
