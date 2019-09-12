const {
  src,
  dest,
  parallel,
  series
} = require( 'gulp' );
const gulp = require( 'gulp' );
const pug = require( 'gulp-pug' );
const less = require( 'gulp-less' );
const minifyCSS = require( 'gulp-csso' );
const concat = require( 'gulp-concat' );
const browserSync = require( 'browser-sync' ).create();



function browserSyncReload( done ) {
  return browserSync.reload();
}

function html( done ) {
  // return
  src( 'src/pug/index.pug' )
    .pipe( pug() )
    .pipe( dest( './docs' ) );

  browserSync.reload();
  done();
}

function css( done ) {
  // return
  src( 'src/pug/*.css' )
    .pipe( less() )
    .pipe( minifyCSS() )
    .pipe( dest( './docs/css' ) );

  browserSync.reload();
  done();
}

function js( done ) {
  // return
  src( 'src/pug/app.js', {
      sourcemaps: true
    } )
    // .pipe(concat('app.min.js'))
    .pipe( dest( './docs/js', {
      sourcemaps: true
    } ) );

  browserSync.reload();
  done();
}

exports.js = js;
exports.css = css;
exports.html = html;

// series(parallel(html, css, js), browserSyncReload)
exports.default = function () {
  browserSync.init( {
    server: {
      baseDir: "./docs"
    }
  } );

  gulp.watch( 'src/pug/*.js', series(js) );
  gulp.watch( 'src/pug/*.css', series(css) );
  gulp.watch( ['src/pug/*.pug'], series( html ) );


};
