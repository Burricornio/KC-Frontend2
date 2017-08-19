var gulp = require("gulp"); // importamos la librería gulp
var sass = require("gulp-sass"); // Copilacionde sass
var notify = require("gulp-notify"); // notificaciones
var browserSync = require("browser-sync").create();

// definimos la tarea por defecto
gulp.task("default", function(){

    // iniciamos el servidor de desarrollo
    browserSync.init({ server: "src/" });

    // observa cambios en los archivos SASS, y entonces ejecuta la tarea 'sass'
    gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"]);

    //Observa cambios en los archivos HTML y entonces carga el navegador 
    gulp.watch("src/*.html", function(){
        browserSync.reload();
        notify().write("HTML rulando a topete 👻");
    });
});

// compilar sass
gulp.task("sass", function(){
    gulp.src("src/scss/style.scss") // cargamos el archivo style.scss
        .pipe(sass().on("error", function(error){
            return notify().write(error);
        })) // lo compilamos con gulp-sass
        .pipe(gulp.dest("src/css/")) // guardamos el resultado en la carpeta css
        .pipe(browserSync.stream()) // recargue el CSS del navegador
        .pipe(notify("SASS compilado 🙌")); // Muestra notificación al actualizas SASS
});