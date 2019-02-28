var path = require('path'),
    express = require('express'),
    chokidar = require('chokidar'),
    reload = require('reload');

var watcher = chokidar.watch('src');

var app = express()
            .set('view engine', 'pug')
            .set('views', path.join(__dirname, '/src'));

var reloadServer = reload(app);

watcher.on('ready', () => {
  watcher.on('all', (id, path) => {
    console.log(`Reload for ${path}`);
    reloadServer.reload();
  });
});

app.use((req, res, next) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.listen(8080);