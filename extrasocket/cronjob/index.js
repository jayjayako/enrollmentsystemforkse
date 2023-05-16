const schedule = require("node-schedule");
const { sendnotif } = require("../notification");

var mjob;

function samplecron(useridnum, datetime, strsubscription) {
  mjob = schedule.scheduleJob(useridnum, datetime, () => {
    console.log(strsubscription);
    const payload = JSON.stringify({
      "title": "Push Message",
      "content": "sample message",
    });
    sendnotif(strsubscription, payload);
    mjob.cancel(useridnum);
  });
}

module.exports = { samplecron: samplecron };
