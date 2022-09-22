function date_time(){
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
	if (hourtemp>=12) {
		seconds=seconds+" PM"
	}else{
		seconds=seconds+" AM"
	}
	var time="DATE: "+month+"/"+day+"/"+year+" TIME: "+hour+":"+minute+":"+seconds;

    return time;
}

function intyear(){
    var today = new Date(); 
	var year = today.getFullYear();
	var time=year;

    return time;
}

module.exports = {
    date_time : date_time,
	intyear : intyear
}