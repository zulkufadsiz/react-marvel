const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const antDesignThemePlugin = require("antd-theme-webpack-plugin");

const PRODJECT_DIR = path.resolve(__dirname, "../");
const BUILD_DIR = `${PRODJECT_DIR}/build`;
const SRC_DIR = `${PRODJECT_DIR}/src`;
console.log("React Marvel Project is Starting...");

const options = {
    stylesDir: `${SRC_DIR}/styles`,
    antDir: `${PRODJECT_DIR}/node_modules/antd`,
    varFile: `${SRC_DIR}/styles/variables.less`,
    mainLessFile: `${SRC_DIR}/styles/index.less`,
    lessUrl: `${PRODJECT_DIR}/assets/less.js`,
    themeVariables: [
        "@primary-color",
        "@secondary-color",
        "@text-color",
        "@text-color-secondary",
        "@heading-color",
        "@layout-body-background",
        "@btn-primary-bg",
        "@layout-header-background",
        "@border-color-base",
        "@table-header-sort-active-bg",
        "@table-header-filter-active-bg",
        "@border-radius-base",
        "@menu-item-color",
        "@menu-dark-color",
        "@disabled-color"
    ],
    indexFileName: false,
    generateOnce: true
};
const copyWebpackPlugin = new CopyWebpackPlugin(
    [{
            from: `${PRODJECT_DIR}/assets`,
            to: "./"
        }]
);
const config = {
    stats: {
        errors: true,
        warnings: false
    },
    devtool: "source-map",
    entry: {
        main: `${SRC_DIR}/index.js`
    },
    cache: true,
    devServer: {
        historyApiFallback: true,
    },
    output: {
        filename: "marvelApp-[name].js",
        chunkFilename: "marvelApp-[name]-chunk.js",
        path: BUILD_DIR,
        publicPath: '/'
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.j(sx|s)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "cache-loader"
                    },
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: "cache-loader"
                    },
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "resolve-url-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            javascriptEnabled: true,
                            modifyVars: {
                                "@card-head-background": "#dde0df",
                                "@modal-header-bg": "#dde0df",
                                "@layout-header-background": "#539fd4",
                                "@menu-bg": "#28334F",
                                "@layout-sider-background": "#28334F",
                                "@menu-item-color": "#ffffff",
                                "@background-color-light": "#539fd4"
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                include: /fonts/,
                use: [
                    {
                        loader: "file-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: "url-loader"
            }
        ]
    },
    plugins: [copyWebpackPlugin, new antDesignThemePlugin(options)]
};

module.exports = config;
