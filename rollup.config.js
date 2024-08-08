import babel from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import autoprefixer from "autoprefixer";
import cssimport from "postcss-import";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default {
  input: "./src/index.ts", // 진입 경로
  output: [
    {
      file: "./dist/esm/bundle.js", // 빌드 파일 저장 경로
      format: "es", // 출력 형식
      sourcemap: true, // 디버깅 유용
    },
    {
      file: "./dist/bundle.js",
      format: "cjs",
      sourcemap: true,
    },
  ],
  external: ["react-aria", "clsx"], // 외부 종속성
  plugins: [
    // 바벨 트랜스파일러 설정
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-env", "@babel/preset-react"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    peerDepsExternal(),
    typescript(),
    postcss({
      plugins: [cssimport(), autoprefixer()],
    }),
  ],
};
