/////////////////// mobile api token ////////////////
function mobileauth(req, res, next){
    var mytoken = req.params.apitoken;

    if(mytoken=="d293ji8y7232023iqwmlduiwhy89d2i209d2n3dmlahsw"){
        next();
    }else{
        res.send(JSON.stringify([{id: 'invalid'}]));
        res.end();
    }
}
/////////////////////////////////////////////////////////////////////////////

module.exports = {
    mobileauth : mobileauth
}