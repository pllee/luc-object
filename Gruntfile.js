module.exports = function(grunt) {
  grunt.initConfig({ 
    exec: {
      test: {
        cmd: 'node_modules/.bin/mocha -R list'
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-exec');
  grunt.registerTask('default', ['exec']);

};
