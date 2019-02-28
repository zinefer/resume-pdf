var path     = require('path'),
    express  = require('express'),
    chokidar = require('chokidar'),
    reload   = require('reload'),
    sass     = require('node-sass-middleware');

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

app.use(
  sass({
    src: path.join(__dirname, 'src/sass'),
    dest: path.join(__dirname, 'dist'),
    debug: true,
  })
);

app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {
   res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.listen(8080);