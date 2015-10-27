module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'dist/app.js',
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.s?css$/, loaders: ['style', 'css', 'sass'] },
            { test: /\.(eot|woff2?|ttf|svg)$/, loaders: ['file', 'url'] }
        ]
    }
};
