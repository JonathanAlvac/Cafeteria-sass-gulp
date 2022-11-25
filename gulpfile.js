const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');


function css(done) {
    //compilar sass
    //paso 1:Indentificar archivos, 2-compilar, 3-guardar

    src('src/scss/app.scss')
        .pipe(sass())
        .pipe( postcss([autoprefixer()]))
        .pipe(dest('build/css'))

    done();
}

function dev(){
    watch('src/scss/**/*.scss', css)
}

function tareaDefault() {
    console.log('Soy la terea por default');
}

exports.css = css;
exports.dev = dev;
exports.default = series( css, dev);

//Series : Se inicia una tarea, hasta que finaliza inicia la siguiente
//parallel : Todas inician al mismo tiempo