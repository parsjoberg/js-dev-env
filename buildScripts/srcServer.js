import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(
  require("webpack-dev-middleware")(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.get('/', function (_req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function (_req, res) {
  //Hard coding for simplicity. Pretend this hits a real database
  res.json([
    { "id": 1, "firstName": "Bob", "lastName": "Smith", "email": "bob@gmail.info" },
    { "id": 2, "firstName": "Tammy", "lastName": "Norton", "email": "tammy@gmail.info" },
    { "id": 3, "firstName": "Tina", "lastName": "Lee", "email": "tina@gmail.info" },
  ])
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
