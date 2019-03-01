var path     = require('path'),
    express  = require('express'),
    chokidar = require('chokidar'),
    reload   = require('reload');

var watcher = chokidar.watch('src');

var app = express()
            .set('view engine', 'pug')
            .set('views', 'src');

var reloadServer = reload(app);

watcher.on('ready', () => {
  watcher.on('all', (id, path) => {
    console.log(`Change detected in ${path}`);
    reloadServer.reload();
  });
});

app.use((req, res, next) => {
   res.render('index', { preview: true })
});

app.listen(8080);