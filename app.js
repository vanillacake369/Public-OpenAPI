const express = require('express');
const path = require('path'); // 파일, 디렉터리 정보 관리 
const morgan = require('morgan'); //요청과 응답에 대한 정보 콘솔 기록
const { default: axios } = require('axios');

const app = express();
const port = process.env.port || 3006;

app.use(express.static("public_html"));
app.listen(port, function () {
    console.log("서버 시작됨");
});

//다른 도메인 간 데이터 가져올 때 보안이슈로 인한 cors에러 처리
// http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?serviceKey=fcrUrXZBzKF80weBuXdbezoZ8IcTtdTBGY0SdJnp1Fpr5ItzPvjQiquY1BIXahkKDqn1bT2LmEzEI%2FzIGxdqOQ%3D%3D&Q0=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C&Q1=%EA%B0%95%EB%82%A8%EA%B5%AC&QT=1&QN=%EC%82%BC%EC%84%B1%EC%95%BD%EA%B5%AD&ORD=NAME&pageNo=1&numOfRows=10
app.get('/pharmach_list', (req, res) => {
    const response = null;
    try {
        const api = async () => {
            response = await axios.get("http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire", {
                params: {
                    "serviceKey": "fcrUrXZBzKF80weBuXdbezoZ8IcTtdTBGY0SdJnp1Fpr5ItzPvjQiquY1BIXahkKDqn1bT2LmEzEI%2FzIGxdqOQ%3D%3D",
                    "Q0": "서울특별시",
                    "Q1": "강남구",
                    "QT": "",
                    "QN": "",
                    "ORD": "",
                    "pageNo": "1",
                    "numOfRows": "1000"
                }
            });
        }
        return response;
    } catch (e) {
        console.log(e);
    }
});