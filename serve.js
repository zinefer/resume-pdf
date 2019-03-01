const path     = require('path'),
      express  = require('express'),
      chokidar = require('chokidar'),
      reload   = require('reload');

const dataSrc = './src/data.js';

var watcher = chokidar.watch('src');

var app = express()
            .set('view engine', 'pug')
            .set('views', 'src');

var reloadServer = reload(app);

watcher.on('ready', () => {
  watcher.on('all', (id, path) => {
    console.log(`Change detected in ${path}`);
    delete require.cache[require.resolve(dataSrc)]
    reloadServer.reload();
  });
});

app.use((req, res, next) => {
  var data = require(dataSrc);
  data.preview = true;
  res.render('index', data);
});

app.listen(8080);