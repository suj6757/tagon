const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('http://localhost:5000/api/Login');

    var grpcjs = require('@grpc/grpc-js');
    var protoLoader = require('@grpc/proto-loader');

    var PROTO_PATH_TEST = __dirname  + '/LoginService.proto';
    var packageDefinition_Test = protoLoader.loadSync(
    PROTO_PATH_TEST,
    {keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
    });
    var protoDescriptor_Test = grpcjs.loadPackageDefinition(packageDefinition_Test);
    var client_Test = new protoDescriptor_Test.LoginService.UserInfo('203.245.41.17:50052', grpcjs.credentials.createInsecure());

    // 방식 1
    var data1 = protoDescriptor_Test.LoginService.Request_UserInfo
    data1.Userid = "testuser"
    data1.UserPassword = "1234"

    // 방식 2
    var data2 = {
    UserId : "testuser", 
    UserPassword : "1234", 
    }

    client_Test.Login(data2, function(err, data) {
    try
    {
        console.log('error : ', err);
        console.log(data);
        
        res.send(data);
    }
    catch(ex)
    {
        console.log(ex)
    }
    });

});

module.exports = router;