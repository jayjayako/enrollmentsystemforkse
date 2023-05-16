function Transactiondata() {
  let errortimeout1 = 0;

  async function setstudentstatscard(canvasId, value, max) {
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
                backgroundColor: ["#57cbb4", "lightgray"],
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
      errortimeout1 = 0;
    } catch (error) {
      errortimeout1 += 1;
      if (errortimeout1 >= 10) {
        errortimeout1 = 0;
        alert("Opps Network Error!");
      } else {
        setTimeout(setstudentstatscard, 1000, canvasId, value, max);
      }
    }
  }

  async function getstudentstatscard() {
    errortimeout1 = 0;
    await setstudentstatscard("dashcirclecard1", 3, 5);
    await setstudentstatscard("dashcirclecard2", 60, 100);
    await setstudentstatscard("dashcirclecard3", 50, 100);
    await setstudentstatscard("dashcirclecard4", 30, 200);
  }

  return {
    setstudentstatscard,
    getstudentstatscard,
  };
}

const transaction = Transactiondata();
transaction.getstudentstatscard();
