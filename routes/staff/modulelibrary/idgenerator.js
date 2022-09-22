var randomstring = require("randomstring");

// generates session id
function generateid(){
	// this is used to create unique id
	var today = new Date(); 
	var month = today.getMonth()+1;
	var day = today.getDate();/*day yan hindi date*/
	var year = today.getFullYear();
	var hour = today.getHours();
	var hourtemp;
	if (hour>12) {
		hourtemp=hour;
		hour=hour-12;
	}else{
		hourtemp=hour;
	}
	var minute = today.getMinutes();
	var seconds = today.getSeconds();
	var milli=today.getMilliseconds();
	if (hourtemp>=12) {
		milli=milli+"PM"
	}else{
		milli=milli+"AM"
	}
	var idnumber="DATE"+month+""+day+""+year+"TIME"+hour+""+minute+""+seconds+""+milli;
	//////////////////////////////////////////////////////////////////////
	// creates random characters
	var myrandomstring=randomstring.generate(20);
	//////////////////////////////////////////////////////////////////////
	return idnumber+"_"+myrandomstring;
}
/////////////////////////////////////////////////////////////////////////

module.exports = {
    generateid : generateid
}