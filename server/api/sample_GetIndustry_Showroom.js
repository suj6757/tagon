const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('/api/GetIndustry_Showroom');

    var grpcjs = require('@grpc/grpc-js');
    var protoLoader = require('@grpc/proto-loader');

    var PROTO_PATH_TEST = __dirname  + '/TrendService.proto';
    var packageDefinition_Test = protoLoader.loadSync(PROTO_PATH_TEST,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
    var protoDescriptor_Test = grpcjs.loadPackageDefinition(packageDefinition_Test);
    var client_Test = new protoDescriptor_Test.TrendService.TrendInfo('203.245.41.17:50052', grpcjs.credentials.createInsecure());

    // 방식 2
    var data2 = {
        FromDate : "2021-05-01", 
        ToDate : "2021-05-10", 
        Category1 : "패션의류",
        Category2 : "여성의류",
        Category3 : "티셔츠",
        Keyword : "켈린클라인",
    }

    client_Test.GetIndustry_Showroom(data2, function(err, data) {
        try {
            console.log('error : ', err);
            console.log(data);

            res.send(data);
        }
        catch(ex) {
            console.log(ex)
        }
    });
});

module.exports = router;