import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import htmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  mode: "development",
  devtool: "eval-source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
export default config;
