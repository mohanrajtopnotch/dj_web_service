exports.request = (req) => {
    let route = req.baseUrl;
    console.log(new Date().toString() + " Access route " + route);
};

exports.response = (req, res, responseData) => {
    console.log(responseData)
    let dataMap = undefined !== responseData ? responseData : "";
    let route = req.baseUrl;
    let responseMap = {
        status: "success",
        code: "200",
        result: dataMap,
    };
    console.log(new Date().toString() + " " + route + " get completed");
    return res.status(200).json(responseMap);
};

exports.error = (req, res, errorCode, errorData) => {
    let route = req.baseUrl;
    let responseMap = {
        status: "error",
        code: errorCode,
        result: errorData,
    };
    console.log(new Date().toString() + " " + route + " get failed");
    console.log(errorData);
    return res.status(errorCode).json(responseMap);
};
