export default {
  input: './src/index.js', // 진입 경로
  output: [
    {
      file: "./dist/esm/bundle.js", // 빌드 파일 저장 경로
      format: "es",                 // 출력 형식
      sourcemap: true               // 디버깅 유용
    },
    {
      file: "./dist/bundle.js",
      format: "cjs", 
      sourcemap: true
    }
  ],
};