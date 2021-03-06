const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('/api/GetIndustry_EFactor_TrendAndFactor');

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
        ToDate : "2021-05-30", 
        Category1 : "패션의류",
        Category2 : "여성의류",
        Category3 : "티셔츠",
        Keyword : "",
        Category_upper : "스타일",
        Name : "베이직"
    }

    client_Test.GetIndustry_EFactor_TrendAndFactor(data2, function(err, data) {
        try {
            console.log('error : ', err);
            console.log(data);
            console.log(data.SentimentFactorDatas);

            res.send(data);
        }
        catch(ex) {
            console.log(ex)
        }
    });
});

module.exports = router;