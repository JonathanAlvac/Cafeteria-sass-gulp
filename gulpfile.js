const { src, dest, watch, series, parallel } = require('gulp');

//CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');


function css() {
    //compilar sass
    //paso 1:Indentificar archivos, 2-compilar, 3-guardar

    return src('src/scss/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'))


}

function imagenes() {
    //1, identifica, 2-guardar
    return src('src/img/**/*') //colocando return no es necesario el done
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'));
}

function versionWebp(){
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('build/img'))
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

function tareaDefault() {
    console.log('Soy la terea por default');
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.default = series(imagenes, versionWebp, css, dev);


//Series : Se inicia una tarea, hasta que finaliza inicia la siguiente
//parallel : Todas inician al mismo tiempo