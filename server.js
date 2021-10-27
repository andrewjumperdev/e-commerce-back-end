const http = require('http');
const app = require('./app');
const port = 5000;
const db = require('./models');

db.sequelize.sync().then(() => {
  db.sequelize.query("ALTER TABLE Users AUTO_INCREMENT = 1;")
  app.listen(port, () => {
    console.log(`listen on port ${port}`);
  });
});

const server = http.createServer(app);
