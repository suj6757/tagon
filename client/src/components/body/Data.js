import React, { useState } from 'react';
import axios from 'axios';

function Data(props) {
    const [result, setResult] = useState();

    const callApi = (e) => {
        axios({
            method: "get",
            url: e.target.value,
            responseType: "type"
        }).then(({ data }) => {
            setResult(JSON.stringify(data));
        }).catch(function(error) {
            alert("오류");
        });
    }

    return (
        <>
            <div>{result}</div>
            <div><button value='/api/GetIndustry_EFactor_GI' onClick={callApi}>EFactor_GI</button></div>
            <div><button value='/api/GetIndustry_EFactor_TrendAndFactor' onClick={callApi}>EFactor_TrendAndFactor</button></div>
            <div><button value='/api/GetIndustry_EFactor_TrendQuad' onClick={callApi}>EFactor_TrendQuad</button></div>
            <div><button value='/api/GetIndustry_PFactor_GI' onClick={callApi}>PFactor_GI</button></div>
            <div><button value='/api/GetIndustry_PFactor_TrendAndFactor' onClick={callApi}>PFactor_TrendAndFactor</button></div>
            <div><button value='/api/GetIndustry_PFactor_TrendQuad' onClick={callApi}>PFactor_TrendQuad</button></div>
            <div><button value='/api/GetIndustry_Showroom' onClick={callApi}>Showroom</button></div>
            <div><button value='/api/GetIndustry_TotalCategory_List' onClick={callApi}>TotalCategory_List</button></div>
            <div><button value='/api/Login' onClick={callApi}>Login</button></div>
        </>
    );
}

export default Data;