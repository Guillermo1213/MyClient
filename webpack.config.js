const path = require('path')

module.exports = {
    mode: 'development',
    entry: './public/js/main.js',
    output: {
        path: path.resolve(__dirname, 'public/js/'),
        filename: 'bundle.js',
    },
    // watch: true,
    resolve: {
        modules: ['node_modules']
    },
    module: {
        rules:
            [{
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader','sass-loader']
            }]
    }
};