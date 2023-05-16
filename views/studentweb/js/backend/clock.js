setInterval(function () {
  try {
    var today = new Date();
    var month = today.getMonth() + 1;
    var day = today.getDate(); /*day yan hindi date*/
    var year = today.getFullYear();
    var hour = today.getHours();
    var hourtemp;
    if (hour > 12) {
      hourtemp = hour;
      hour = hour - 12;
    } else {
      hourtemp = hour;
    }
    var minute = today.getMinutes();
    var seconds = today.getSeconds();
    var milli = today.getMilliseconds();
    if (hourtemp >= 12) {
      seconds = seconds + " PM";
    } else {
      seconds = seconds + " AM";
    }
    var datetime =
      "DATE: " +
      month +
      "/" +
      day +
      "/" +
      year +
      " TIME: " +
      hour +
      ":" +
      minute +
      ":" +
      seconds;
    document.getElementById("time").innerHTML = datetime;
  } catch (error) {}
}, 1000);
