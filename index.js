const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const models = require("./models/index.js");
const watermarkRoutes = require("./routes/watermark");
const postRoutes = require("./routes/post");
const app = express();
const PORT = process.env.PORT;


// cors 설정
app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

// api 통신을 위한 모듈 설정
app.use(bodyParser.json({ limit : "3mb",extended: true }));
app.use(bodyParser.urlencoded({ limit : "3mb",extended: true }));



//라우터 설정
app.use("/watermark", watermarkRoutes);
app.use("/post", postRoutes);

// 데이터베이스 연동
models.sequelize
    .sync()
    .then(() => {
        console.log(" DB 연결 성공");
    })
    .catch((err) => {
        console.log("연결 실패");
        console.log(err);
    });


app.listen(PORT, async () => {
    console.log(`      🚀 HTTP Server is starting on ${PORT}`);
});
