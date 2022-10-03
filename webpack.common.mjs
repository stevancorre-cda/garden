import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import StylelintPlugin from "stylelint-webpack-plugin";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default {
    entry: ["./src/app.ts", "./src/app.scss"],
    optimization: {
        usedExports: true,
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                    },
                },
            },
            {
                test: /\.(woff|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/i,
                use: {
                    loader: "url-loader",
                },
            },
            {
                test: /\.(png|jpe?g|webp|git|svg|)$/i,
                type: "asset/resource",
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].css",
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: "./src/assets/images/favicon.ico",
            inject: true,
        }),
        new ForkTsCheckerWebpackPlugin(),
        new ESLintPlugin({
            extensions: ["ts", "mjs"],
            fix: true,
        }),
        new StylelintPlugin({
            extensions: "scss",
            fix: true,
        }),
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: ["imagemin-mozjpeg", "imagemin-pngquant"],
                },
            },
            generator: [
                {
                    preset: "webp",
                    implementation: ImageMinimizerPlugin.imageminGenerate,
                    options: {
                        plugins: ["imagemin-webp"],
                    },
                },
            ],
        }),
    ],
};
