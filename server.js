var grpcjs = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
// proto 파일 로드
var PROTO_PATH_TEST = __dirname  + '/TrendService.proto';
var packageDefinition_Test = protoLoader.loadSync(
    PROTO_PATH_TEST, { keepCase: true
                     , longs: String
                     , enums: String
                     , defaults: true
                     , oneofs: true
                     });
var protoDescriptor_Test = grpcjs.loadPackageDefinition(packageDefinition_Test);

// 서버 연결 서비스 생성
// 현재 서버는 세팅 중이며 완료 시, 실제 URL을 공유 드리겠습니다.
// 하단 URL은 동작하지 않습니다.
var client_Test = new protoDescriptor_Test.TrendService.TrendInfo('192.168.1.2:5000', grpcjs.credentials.createInsecure());

// 요청 데이터(Request)
var data = {
    FromDate : "2021-05-01"
,   ToDate : "2021-05-10"
,   CategoryCode : ["50000234", "50000235"]
}  

// 실제 데이터 요청
client_Test.GetIndustry_PFactor_TrendQuad(data, function(err, data) {
    try 
    {
        console.log('error : ', err);
        console.log(data);
        //console.log(data.Message)
        //console.log(data.Datas[0].Name)
    }
    catch(ex)
    {
        console.log(ex)
    }
});


/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ujsong:xn64sz@taemongdb.r3k7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const collection = client.db("test").collection("devices");
  
    client.close();
}).then(() => {
    console.log("success");
});
*/


/*


// 1. mongoose 모듈 가져y오기
var mongoose = require('mongoose');
// 2. testDB 세팅
mongoose.connect('mongodb+srv://ujsong:xn64sz@taemongdb.r3k7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
// 3. 연결된 testDB 사용
var db = mongoose.connection;
// 4. 연결 실패
db.on('error', function(){
    console.log('Connection Failed!');
});
// 5. 연결 성공
db.once('open', function() {
    console.log('Connected!');
});

// 6. Schema 생성. (혹시 스키마에 대한 개념이 없다면, 입력될 데이터의 타입이 정의된 DB 설계도 라고 생각하면 됩니다.)
var student = mongoose.Schema({
    name : 'string',
    address : 'string',
    age : 'number'
});

// 7. 정의된 스키마를 객체처럼 사용할 수 있도록 model() 함수로 컴파일
var Student = mongoose.model('Schema', student);

// 8. Student 객체를 new 로 생성해서 값을 입력
var newStudent = new Student({name:'Hong Gil Dong', address:'서울시 강남구 논현동', age:'22'});

// 9. 데이터 저장
newStudent.save(function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log('Saved!')
    }
});

// 10. Student 레퍼런스 전체 데이터 가져오기
Student.find(function(error, students){
    console.log('--- Read all ---');
    if(error){
        console.log(error);
    }else{
        console.log(students);
    }
})

// 11. 특정 아이디값 가져오기
Student.findOne({_id:'585b777f7e2315063457e4ac'}, function(error,student){
    console.log('--- Read one ---');
    if(error){
        console.log(error);
    }else{
        console.log(student);
    }
});

// 12. 특정아이디 수정하기
Student.findById({_id:'585b777f7e2315063457e4ac'}, function(error,student){
    console.log('--- Update(PUT) ---');
    if(error){
        console.log(error);
    }else{
        student.name = '--modified--';
        student.save(function(error,modified_student){
            if(error){
                console.log(error);
            }else{
                console.log(modified_student);
            }
        });
    }
});

// 13. 삭제
Student.remove({_id:'585b7c4371110029b0f584a2'}, function(error,output){
    console.log('--- Delete ---');
    if(error){
        console.log(error);
    }

    /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
        어떤 과정을 반복적으로 수행 하여도 결과가 동일하다. 삭제한 데이터를 다시 삭제하더라도, 존재하지 않는 데이터를 제거요청 하더라도 오류가 아니기 때문에
        이부분에 대한 처리는 필요없다. 그냥 삭제 된것으로 처리
    
    console.log('--- deleted ---');
});
*/