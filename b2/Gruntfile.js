module.exports = function(grunt)
{
    grunt.initConfig(
    {
        pkg: grunt.file.readJSON('package.json'),
        concat: //合并文件
        {
            options:
            { // 定义一个用于插入合并输出文件之间的字符
                separator: ';'
            },
            dist:
            { // 将要被合并的文件
                src: ['app/javascripts/*.js'],
                // 合并后的JS文件的存放位置
                dest: 'app/js/<%= pkg.name %>.js'
            }
        },
        uglify: //压缩
        {
            options:
            { // 此处定义的banner注释将插入到输出文件的顶部
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist:
            {
                files:
                { //uglify会自动压缩concat任务中生成的文件
                    'app/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        connect:
        {
            //这里为插件子刷新方式
            options:
            {
                port: 9000,
                hostname: 'localhost', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                livereload: 35729 //声明给 watch 监听的端口
            },
            server:
            {
                options:
                {
                    open: true, //自动打开网页 http://
                    base: [
                        '.' //主目录
                    ]
                }
            }

        },
        watch:
        {
            livereload:
            {
                options:
                {
                    livereload: '<%=connect.options.livereload%>' //监听前面声明的端口  35729
                },
                files: [ //下面文件的改变就会实时刷新网页
                    'app/*.html',
                    'app/stylesheets/{,*/}*.css',
                    'app/javascripts/{,*/}*.js',
                    'app/images/{,*/}*.{png,jpg}'

                ]
            },
            files: ['app/javascripts/**/*.js'],
            tasks: ['concat', 'uglify']
        },
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', ['connect:server', 'watch','concat', 'uglify']);
};
