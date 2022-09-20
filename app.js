const express = require('express');
const path = require('path'); // 파일, 디렉터리 정보 관리 
const morgan = require('morgan'); //요청과 응답에 대한 정보 콘솔 기록
const { axios } = require('axios');

const app = express();
const port = process.env.port || 3006;

app.use(express.static("public_html"));
app.listen(port, function () {
    console.log("서버 시작됨");
});

//다른 도메인 간 데이터 가져올 때 보안이슈로 인한 cors에러 처리
// http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?serviceKey=fcrUrXZBzKF80weBuXdbezoZ8IcTtdTBGY0SdJnp1Fpr5ItzPvjQiquY1BIXahkKDqn1bT2LmEzEI%2FzIGxdqOQ%3D%3D&Q0=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C&Q1=%EA%B0%95%EB%82%A8%EA%B5%AC&QT=1&QN=%EC%82%BC%EC%84%B1%EC%95%BD%EA%B5%AD&ORD=NAME&pageNo=1&numOfRows=10
app.get('/pharmach_list', (req, res) => {
    const api = async () => {
        const response = null;
        try {
            response = await axios.get("http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire", {
                params: {
                    "serviceKey": "fcrUrXZBzKF80weBuXdbezoZ8IcTtdTBGY0SdJnp1Fpr5ItzPvjQiquY1BIXahkKDqn1bT2LmEzEI/zIGxdqOQ==",
                    "Q0": req.query.Q0,
                    "Q1": req.query.Q1,
                    "QT": req.query.QT,
                    "QN": req.query.QN,
                    "ORD": req.query.ORD,
                    "pageNo": req.query.pageNo,
                    "numOfRows": req.query.numOfRows
                }
            });
        } catch (e) {
            console.log(e);
        }
        return response;
    }
    api().then((response) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response.data.response.body);
    });
    /** npm error 뜸
     * 일단 then() 절에 res.json에서
        - json()은 무슨 함수인지
        - 코드의 의도가 무엇이길래 response.data.response.body를 불러오는지
    */
});