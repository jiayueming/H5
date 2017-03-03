/**
 * Created by Administrator on 2016/9/26.
 */
module.exports = function (grunt) {
    grunt.initConfig({pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'},
            build:
            {
                src: 'public/javascripts/*.js',
                // src: 'public/javascripts/<%= pkg.name %>.js',
                dest: 'public/build/<%= pkg.name %>.<%= pkg.version %>.min.js'
            }
        }
    });
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['uglify'])};
