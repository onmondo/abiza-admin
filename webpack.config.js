const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = [
    {
        entry: "./src/index.tsx",
        mode: "development",
        target: "web",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js",
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: './src/index.html',
                // favicon: './src/favicon.ico',
            }),
            new Dotenv()
        ],
        resolve: {
            extensions: [".js", ".ts", ".tsx", ".jsx"]
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: 'ts-loader'
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
                        }
                    }
                },
                {
                    test: /\.*css$/,
                    exclude: /node_modules/,
                    // order is important
                    use: [
                        "style-loader",
                        "css-loader",
                        // "postcss-loader", // temporary disabled: style-loader is used
                        "sass-loader"
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|ico|tff)$/,
                    type: "asset/resource"
                }
            ]
        }
    }
]