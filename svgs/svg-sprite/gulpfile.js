var gulp = require('gulp'),
    svg_sprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename'),
    del = require('del'),
    plumber = require('gulp-plumber');


gulp.task('firstClean', function () {
    return del(['./app/sprites']);
});


var config = {
    mode: {
        css: {
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './app/cssTemplate/sprite.css'
                }
            }
        }
    }
}


// More complex configuration example
// config                  = {
//     shape               : {
//         dimension       : {         // Set maximum dimensions
//             maxWidth    : 32,
//             maxHeight   : 32
//         },
//         spacing         : {         // Add padding
//             padding     : 10
//         },
//         dest            : 'out/intermediate-svg'    // Keep the intermediate files
//     },
//     mode                : {
//         view            : {         // Activate the «view» mode
//             bust        : false,
//             render      : {
//                 scss    : true      // Activate Sass output (with default options)
//             }
//         },
//         symbol          : true      // Activate the «symbol» mode
//     }
// };


// Creating Stripe
gulp.task('stripe', function () {
    return gulp.src('./app/svg-container/**/*.svg')
        .pipe(plumber())
        .pipe(svg_sprite(config))
        .on('error', function (error) {
            console.log(error)
        })

        .pipe(gulp.dest('./app/sprites'));
});


// Moving css to root folder Stripes
gulp.task('organize_css', ['stripe'], function(){
    return gulp.src('./app/sprites/css/sprite.css')
    .pipe(gulp.dest('./app/sprites/'));

});

// Moving created SVG to root folder Stripes
gulp.task('organize_created_svg', ['stripe'], function(){
    return gulp.src('./app/sprites/css/*.svg')
    .pipe(gulp.dest('./app/sprites/'));

});


// Deleting created Temp Files
gulp.task('lastClean',['organize_css','organize_created_svg'],function () {
    return del(['./app/sprites/css']);
});


// MAIN CMD TO RUN make-stripe
gulp.task('make-stripe', ['firstClean', 'stripe', 'organize_css', 'organize_created_svg', 'lastClean']);