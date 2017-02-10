module.exports = function () {
  var projectDir = process.env.PWD = process.cwd() + '/',
    npmDir = 'node_modules/',
    srcDir = 'src/',
    srcScriptDir = srcDir + 'scripts/',
    srcStylesDir = srcDir + 'styles/',
    destDir = 'www/';

  var scripts = {
    src: [
      srcScriptDir + 'components/modal/modal-model.js',
      srcScriptDir + 'components/veil/veil-model.js',
      srcScriptDir + 'components/modal/modal.js',
      srcScriptDir + 'components/veil/veil.js',
      srcScriptDir + 'components/index-page-content/index-page-content.js',
      srcScriptDir + 'pages/index-page.js'
    ],
    vendors: [
      npmDir + 'angular/angular.js',
      npmDir + 'signals/dist/signals.js'
    ]
  };

  var pipelines = {
    build: {
      src: {
        app: scripts.src,
        vendors: scripts.vendors
      },
      dest: destDir + 'scripts/'
    },
    server: {
      src: destDir,
      options: {
        host: 'localhost',
        port: 8080,
        directoryListing: false,
        open: true
      }
    },
    styles: {
      src: srcStylesDir + 'main.scss',
      dest: destDir + 'styles/'
    },
    templateCache: {
      src: [
        srcDir.concat('**/*-template.html')
      ],
      dest: destDir + 'scripts/',
      fileName: 'templates.js',
      opts: {
        module: 'a11y.resources.Templates',
        root: '/',
        standalone: true
      }
    },
    watch: {
      src: [
        srcDir + '**/*.html',
        srcDir + '**/*.js',
        srcDir + '**/*.scss'
      ]
    }
  };
  return pipelines;
}
