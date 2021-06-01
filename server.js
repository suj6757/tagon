const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');

//사용하지 않아도 json방식으로 반환되는거 확인
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended : true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : conf.host
,   user : conf.user
,   password : conf.password
,   port : conf.port
,   database : conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({ dest : './upload' });

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER"
    ,   (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.post('/api/customerChart', (req, res) => {
    let sql = "SELECT @rownum := @rownum + 1 AS ID, JOB, COUNT(*) AS COUNT FROM CUSTOMER WHERE (@rownum := 0) = 0 GROUP BY JOB";
    console.log(req);

    connection.query(sql, (err, rows, fields) => {
        res.send(rows);
    });
});

app.use('/image', express.static('./upload'));
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = "INSERT INTO CUSTOMER VALUES(null, ?, ?, ?, ?, ?)";
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let age = req.body.age;
    let job = req.body.job;
    let remk = req.body.remk;
    let params = [image, name, age, job, remk];

    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    });
});

app.listen(port, () => console.log(`Listening port ${port}`));