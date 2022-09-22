var studentenrolleesuperid, schoolllevelglobalid, yearlevelglobalid;
function getmessagenotif(options) {
  async function getalldata() {
    try {
      /////////////////// display notifs from server //////////////////
      let response = await fetch(
        "/api/studentwebbackend/messagenotif/displaynotif",
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      // you can if condition if success or not to ouput something
      if (myresult[0].id == "invalid") {
        alert("empty database");
      } else {
        var text = "";
        for (var x in myresult) {
          text +=
            "<div onclick='clicknotification(" +
            '"' +
            myresult[x].id +
            '","' +
            myresult[x].enrolltype +
            '","' +
            myresult[x].status +
            '"' +
            ")' class='body-con1'><p>" +
            myresult[x].content +
            "</p></div>";
        }
        document.getElementById("messageandnotifid").innerHTML = text;
      }
    } catch (error) {
      alert("network error");
    }
  }
  if (options == "getalldata") {
    getalldata();
  }
}

function clicknotification(id, enrolltype, status) {
  studentenrolleesuperid = id;
  if (enrolltype == "Assesment") {
    async function checkstudvalidity() {
      let response = await fetch(
        "/api/studentwebbackend/assessment/assessmentfees/checkassessmentstudent" +
          "?superid=" +
          id,
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult[0].id == "invalid") {
        alert("Invalid");
      } else {
        document.getElementById("selectsclvl").style.display = "block";
        assesmentfunction("loadalldata");
      }
    }
    checkstudvalidity();
  }
  if (enrolltype == "Enlistment") {
    async function checkstudvalidity() {
      let response = await fetch(
        "/api/studentwebbackend/enlistment/displayenlistmentinfo",
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult[0].id == "invalid") {
        alert("Invalid");
      } else {
        schoolllevelglobalid = myresult[0].schoollevel;
        yearlevelglobalid = myresult[0].yearlevel;
      }

      response = await fetch(
        "/api/studentwebbackend/enlistment/checkenlistmentstudent" +
          "?superid=" +
          id,
        {
          method: "GET",
        }
      );
      myresult = await response.json();
      if (myresult[0].id == "invalid") {
        alert("Invalid");
      } else {
        displaysection();
      }
    }

    async function displaysection() {
      let response = await fetch(
        "/api/studentwebbackend/enlistment/displaysection" +
          "?schoollevel=" +
          schoolllevelglobalid +
          "&yearlevel=" +
          yearlevelglobalid,
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult[0].id == "invalid") {
        alert("Invalid");
      } else {
        var text = "";
        for (var x in myresult) {
          text +=
            "<option value='" +
            myresult[x].section +
            "'>" +
            myresult[x].section +
            "</option>";
        }
        document.getElementById("sclvl").innerHTML = text;
        document.getElementById("selectsect").style.display = "block";
      }
    }
    checkstudvalidity();
  }
}

function closemodal(params) {
  if (params == "selectschoollevel") {
    document.getElementById("selectsclvl").style.display = "none";
  }

  if (params == "tuitionandotherfees") {
    document.getElementById("tuitionfee").style.display = "none";
  }

  if (params == "selecttypeofpayment") {
    document.getElementById("seltypepay").style.display = "none";
  }

  if (params == "selectpaymentmethod") {
    document.getElementById("selmd-paymt").style.display = "none";
  }

  if (params == "selectuploadpayment") {
    document.getElementById("payamt").style.display = "none";
  }
  if (params == "selectuploadpaysuccess") {
    document.getElementById("paysub").style.display = "none";
    document.getElementById("selectsclvl").style.display = "none";
    document.getElementById("tuitionfee").style.display = "none";
    document.getElementById("seltypepay").style.display = "none";
    document.getElementById("selectsect").style.display = "none";
    document.getElementById("selmd-paymt").style.display = "none";
    document.getElementById("payamt").style.display = "none";
    document.getElementById("msg-mdl").style.display = "none";
  }

  if (params == "selectsection") {
    document.getElementById("selectsect").style.display = "none";
  }

  if (params == "displayschedule") {
    document.getElementById("displaysched").style.display = "none";
  }
}
