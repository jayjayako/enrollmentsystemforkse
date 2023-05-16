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
    if (seconds == 0) {
      seconds = 60;
    }
    var milli = today.getMilliseconds();
    if (hourtemp >= 12) {
      seconds = seconds + " PM";
    } else {
      seconds = seconds + " AM";
    }

    var weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    var month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let weekdayname = weekday[today.getDay()];
    document.getElementById("weekday").innerHTML = weekdayname.toUpperCase();

    let monthname = month[today.getMonth()];

    var date = monthname + " " + day + " " + year;

    document.getElementById("date").innerHTML = date;
    if (parseInt(hour) < 10) {
      hour = "0" + hour;
    }
    if (parseInt(minute) < 10) {
      minute = "0" + minute;
    }
    if (parseInt(seconds) < 10) {
      seconds = "0" + seconds;
    }
    var hours = hour + ":" + minute + ":" + seconds;
    document.getElementById("time").innerHTML = hours;
  } catch (error) {}
}, 1000);
