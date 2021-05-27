const express = require('express');
const app = express();
const process = require('process');
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3005;
const bodyParser = require('body-parser');
const adminRouter = require('./controllers/admin');
const { loadNuxt, build } = require('nuxt');
const fileUpload = require('express-fileupload');
const apiRouter = require('./controllers/api');
// const authMiddware = require('./middleware/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
  limitHandler: function(req, res) {
    res.json({
      msg: '文件太大了',
      code: -1,
    });
  }
}));

app.get('hello', (req, res) => {
  res.end('hello');
});

// app.set('port', port);

// Import API Routes
app.use('/api/v1', apiRouter);
app.use('/admin-api', adminRouter);
// Start nuxt.js
async function start() {
  // Import and Set Nuxt.js options
  // let config = require('../nuxt.config.js');
  const isDev = !(process.env.NODE_ENV === 'production');
  // Instanciate nuxt.js
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start');
  app.use(nuxt.render);
  if (isDev) {
    build(nuxt);
  }
  app.listen(port, host);
  console.log('Server listening on ' + host + ':' + port);
}

start();

