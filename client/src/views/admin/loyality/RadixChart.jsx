import React from "react";
import ApexChart from "components/charts/LineArea";

function RadixChart({ userData }) {
console.log(userData);
    const age = userData && userData.map((user) => user.age).slice(0, 7);
  age && console.log(age);
  const sendData = {
    type: "radar",
    series: [
      {
        name: "Series 1",
        data: age,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "radar",
      },
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            strokeColors: "#e9e9e9",
            fill: {
              colors: ["#f8f8f8", "#fff"],
            },
          },
        },
      },
      title: {
        text: "Radar with Polygon Fill",
      },
      colors: ["#FF4560"],
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColor: "#FF4560",
        strokeWidth: 2,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      xaxis: {
        categories: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: function (val, i) {
            if (i % 2 === 0) {
              return val;
            } else {
              return "";
            }
          },
        },
      },
    },
  };

  return (
    <div className="">
     {age  && <ApexChart
        series={sendData.series}
        options={sendData.options}
        type={sendData.type}
      />}
    </div>
  );
}

export default RadixChart;
