const path = require('path'); //node.js içerisinde default olarak gelir.

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: './src/index.js',
    output: {
        path: '',
        filename: 'bundle.js',
        publicPath: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.jsx'] //Hehangi bir dosyayı import ederkene uzantı belirtmemişsek bunlarrla tamamlamaya çalışacak
    },
    module:{
        rules:[
            {
                test:/\.js$/, //tüm javascript dosyalarımızda
                loader:'babel-loader', //babel sayesine next generation javascript ve jsx kodlarımızı derleyebileceğiz.
                exclude:/node_modules/
            }
        ]
    }
};