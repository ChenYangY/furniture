const express = require('express');
const app = express();
const process = require('process');
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3004;
const bodyParser = require('body-parser');
const session = require('express-session');
const adminRouter = require('./controllers/admin');
const { loadNuxt, build } = require('nuxt');
const fileUpload = require('express-fileupload');
const apiRouter = require('./controllers/api');
const loginContoller = require('./controllers/login');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((session({
  secret: 'furniture',
  resave: false,
  saveUninitialized: true,
})));
app.use(fileUpload({
  limits: { fileSize: 500 * 1024 * 1024 },
  // debug: true,
  abortOnLimit: true,
  responseOnLimit: `{"msg": "文件太大了_${Date.now()}","code": -1}`,
}));

app.get('hello', (req, res) => {
  res.end('hello');
});


// app.set('port', port);

// Import API Routes
app.use('/api/v1', apiRouter);
app.use('/admin-api', adminRouter);
app.post('/login', loginContoller.login);


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

