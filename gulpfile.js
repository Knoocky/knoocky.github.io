const { src, pipe, watch, dest, series } = require("gulp");
const browsersync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const minifyCss = require("gulp-clean-css");
const concat = require("gulp-concat");

function scssTask() {
  return src("src/scss/*.scss")
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(concat("bundle.css"))
    .pipe(dest("src/css"));
}

function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: "src",
    },
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

function watchTask() {
  watch("*.html", browsersyncReload);
  watch(["src/**/*.scss", "src/*.html"], series(scssTask, browsersyncReload));
}

exports.default = series(scssTask, browsersyncServe, watchTask);
