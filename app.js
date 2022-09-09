const express = require('express');
const path = require('path'); // 파일, 디렉터리 정보 관리 
const morgan = require('morgan'); //요청과 응답에 대한 정보 콘솔 기록

const app = express();
const port = process.env.port || 3006;

app.use(express.static("public_html"));
app.listen(port, function () {
    console.log("서버 시작됨");
});