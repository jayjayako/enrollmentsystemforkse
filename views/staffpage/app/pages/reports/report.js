function Transactiondata() {
  let errortimeout1 = 0,
    errortimeout2 = 0,
    errortimeout3 = 0;

  async function settotalstudent(canvasId, value, max) {
    async function updateChart(chart, value, max) {
      chart.options.cutout = 30;
      chart.options.responsive = false;
      chart.options.animation.duration = 1000;
      chart.options.animation = {
        onProgress: function (animation) {
          const text = value.toString();
          let totaltext = text + max.toString();
          let fontSize = 25;
          fontSize = fontSize - totaltext.length * 2.5;
          chart.ctx.font = fontSize + "px Arial";
          const textWidth = chart.ctx.measureText(text).width * 0.05;
          const textHeight = fontSize * 0.75;
          const textX = Math.round((chart.ctx.canvas.width - textWidth) / 2);
          const textY = Math.round((chart.ctx.canvas.height + textHeight) / 2);
          chart.ctx.fillStyle = "black";
          chart.ctx.textAlign = "center";
          chart.ctx.textBaseline = "middle";
          chart.ctx.fillText(text + "/" + max, textX, textY);
        },
      };
      chart.options.tooltips = {
        enabled: false,
      };
      chart.options.legend = {
        display: false,
      };
      chart.options.elements = {
        arc: {
          borderWidth: 0,
        },
      };
      chart.update();
    }

    try {
      const canvas = document.getElementById(canvasId);
      const ctx = canvas.getContext("2d");
      const progress = (value / max) * 100;

      let chart = Chart.getChart(ctx); // try to get existing chart
      if (chart) {
        chart.data.datasets[0].data = [progress, 100 - progress];
        updateChart(chart, value, max);
      } else {
        chart = new Chart(ctx, {
          type: "doughnut",
          data: {
            datasets: [
              {
                data: [progress, 100 - progress],
                backgroundColor: ["#00392a", "lightgray"],
              },
            ],
          },
          options: {
            cutout: 30,
            responsive: false,
          },
        });
        updateChart(chart, value, max);
      }

      // put here the onprogress function if you dont want animation
      errortimeout3 = 0;
    } catch (error) {
      errortimeout3 += 1;
      if (errortimeout3 >= 10) {
        errortimeout3 = 0;
        alert("Opps Network Error!");
      } else {
        setTimeout(settotalstudent, 1000, canvasId, value, max);
      }
    }
  }
  async function settotalstaff(canvasId, value, max) {
    async function updateChart(chart, value, max) {
      chart.options.cutout = 30;
      chart.options.responsive = false;
      chart.options.animation.duration = 1000;
      chart.options.animation = {
        onProgress: function (animation) {
          const text = value.toString();
          let totaltext = text + max.toString();
          let fontSize = 25;
          fontSize = fontSize - totaltext.length * 2.5;
          chart.ctx.font = fontSize + "px Arial";
          const textWidth = chart.ctx.measureText(text).width * 0.05;
          const textHeight = fontSize * 0.75;
          const textX = Math.round((chart.ctx.canvas.width - textWidth) / 2);
          const textY = Math.round((chart.ctx.canvas.height + textHeight) / 2);
          chart.ctx.fillStyle = "black";
          chart.ctx.textAlign = "center";
          chart.ctx.textBaseline = "middle";
          chart.ctx.fillText(text + "/" + max, textX, textY);
        },
      };
      chart.options.tooltips = {
        enabled: false,
      };
      chart.options.legend = {
        display: false,
      };
      chart.options.elements = {
        arc: {
          borderWidth: 0,
        },
      };
      chart.update();
    }

    try {
      const canvas = document.getElementById(canvasId);
      const ctx = canvas.getContext("2d");
      const progress = (value / max) * 100;

      let chart = Chart.getChart(ctx); // try to get existing chart
      if (chart) {
        chart.data.datasets[0].data = [progress, 100 - progress];
        updateChart(chart, value, max);
      } else {
        chart = new Chart(ctx, {
          type: "doughnut",
          data: {
            datasets: [
              {
                data: [progress, 100 - progress],
                backgroundColor: ["#00392a", "lightgray"],
              },
            ],
          },
          options: {
            cutout: 30,
            responsive: false,
          },
        });
        updateChart(chart, value, max);
      }

      // put here the onprogress function if you dont want animation
      errortimeout2 = 0;
    } catch (error) {
      errortimeout2 += 1;
      if (errortimeout2 >= 10) {
        errortimeout2 = 0;
        alert("Opps Network Error!");
      } else {
        setTimeout(settotalstaff, 1000, canvasId, value, max);
      }
    }
  }

  async function settotaladmin(canvasId, value, max) {
    async function updateChart(chart, value, max) {
      chart.options.cutout = 50;
      chart.options.responsive = false;
      chart.options.animation.duration = 1000;
      chart.options.animation = {
        onProgress: function (animation) {
          const text = value.toString();
          let totaltext = text + max.toString();
          let fontSize = 25;
          fontSize = fontSize - totaltext.length * 2.5;
          chart.ctx.font = fontSize + "px Arial";
          const textWidth = chart.ctx.measureText(text).width * 0.05;
          const textHeight = fontSize * 0.75;
          const textX = Math.round((chart.ctx.canvas.width - textWidth) / 2);
          const textY = Math.round((chart.ctx.canvas.height + textHeight) / 2);
          chart.ctx.fillStyle = "black";
          chart.ctx.textAlign = "center";
          chart.ctx.textBaseline = "middle";
          chart.ctx.fillText(text + "/" + max, textX, textY);
        },
      };
      chart.options.tooltips = {
        enabled: false,
      };
      chart.options.legend = {
        display: false,
      };
      chart.options.elements = {
        arc: {
          borderWidth: 0,
        },
      };
      chart.update();
    }

    try {
      const canvas = document.getElementById(canvasId);
      const ctx = canvas.getContext("2d");
      const progress = (value / max) * 100;

      let chart = Chart.getChart(ctx); // try to get existing chart
      if (chart) {
        chart.data.datasets[0].data = [progress, 100 - progress];
        updateChart(chart, value, max);
      } else {
        chart = new Chart(ctx, {
          type: "doughnut",
          data: {
            datasets: [
              {
                data: [progress, 100 - progress],
                backgroundColor: ["#00392a", "lightgray"],
              },
            ],
          },
          options: {
            cutout: 50,
            responsive: false,
          },
        });
        updateChart(chart, value, max);
      }

      // put here the onprogress function if you dont want animation
      errortimeout1 = 0;
    } catch (error) {
      errortimeout1 += 1;
      if (errortimeout1 >= 10) {
        errortimeout1 = 0;
        alert("Opps Network Error!");
      } else {
        setTimeout(settotaladmin, 1000, canvasId, value, max);
      }
    }
  }

  async function gettotaladmin() {
    errortimeout1 = 0;
    settotaladmin("reportcircletotaladmin", 3, 5);
  }

  async function gettotalstaff() {
    errortimeout2 = 0;
    settotalstaff("reportcircletotalregistrar", 3, 5);
    settotalstaff("reportcircletotalaccounting", 3, 5);
    settotalstaff("reportcircletotalcashier", 3, 5);
    settotalstaff("reportcircletotalenlistment", 3, 5);
  }

  async function gettotalstudent() {
    errortimeout3 = 0;
    settotalstudent("reportcircletotalenrolled", 3, 5);
    settotalstudent("reportcircletotalnotenrolled", 3, 5);
    settotalstudent("reportcircletotalregularstudent", 3, 5);
    settotalstudent("reportcircletotaloldstudent", 3, 5);
    settotalstudent("reportcircletotaltransferee", 3, 5);
    settotalstudent("reportcircletotalforeigner", 3, 5);
  }

  return {
    settotaladmin,
    gettotaladmin,
    settotalstaff,
    gettotalstaff,
    settotalstudent,
    gettotalstudent,
  };
}
