/* eslint-env node, process */
"use strict";

// Gulp and node
const gulp = require( "gulp" );
const cp = require( "child_process" );
const notify = require( "gulp-notify" );
const size = require( "gulp-size" );

// Basic workflow plugins
const browserSync = require( "browser-sync" );
const browserify = require( "browserify" );
// const source = require( "vinyl-source-stream" );
// const buffer = require( "vinyl-buffer" );
const clean = require( "gulp-clean" );
// const sass = require( "gulp-sass" );
const jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll";
const messages = {
    jekyllBuild: "<span style=\"color: grey\">Running:</span> $ jekyll build"
};

// Performance workflow plugins
// const htmlmin = require( "gulp-htmlmin" );
// const prefix = require( "gulp-autoprefixer" );
// const sourcemaps = require( "gulp-sourcemaps" );
// const uglify = require( "gulp-uglify" );
// const critical = require( "critical" );
// const sw = require( "sw-precache" );

// Image Generation
const responsive = require( "gulp-responsive" );
// const rename = require( "gulp-rename" );\

// Images
const imagemin = require( "gulp-imagemin");

gulp.task( "default", () => {
  return gulp.src( "_img/posts/*.{png,jpg}" )
    .pipe( responsive( {
        "*": [ // For all the images in the posts folder
          {
            width: 230,
            rename: { suffix: "_placehold" }
          },
          { // thubmnail
            width: 535,
            rename: { suffix: "_thumb" }
          },
          { // thumbnail @2x
            width: 535 * 2,
            rename: { suffix: "_thumb@2x" }
          },
          {
            width: 575,
            rename: { suffix: "_xs" }
          }, 
          {
            width: 767,
            rename: { suffix: "_sm" }
          },
          {
            width: 991,
            rename: { suffix: "_md" }
          },
          {
            width: 1999,
            rename: { suffix: "_lg" }
          },
          { // max-width hero
            width: 1920
          }
        ]
      },
      {
        quality: 70,
        progressive: true,
        withMetadata: false,
        errorOnEnlargement: false,
        errorOnUnusedConfig: false,
        silent: true
      } ) )
      .pipe( imagemin() )
      .pipe( gulp.dest( "assets/img/posts/" ) );
} );
