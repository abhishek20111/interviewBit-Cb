import React from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import Card from 'components/card';
import BarChart from 'components/charts/BarChart';
import { barChartDataDailyTraffic } from 'variables/charts'; // Assuming you have defined this variable
import { barChartOptionsDailyTraffic } from 'variables/charts'; // Assuming you have defined this variable

const DailyTraffic = ({ userData }) => {
  const transactionData = userData || [];

  // Create a hashmap to store city occurrences with their frequencies
  const cityCounts = {};
  transactionData.forEach((transaction) => {
    const city = transaction.city;
    cityCounts[city] = (cityCounts[city] || 0) + 1;
  });

  // Sort cities by frequency in descending order
  const sortedCities = Object.entries(cityCounts).sort((a, b) => b[1] - a[1]);

  // Take the top 5 cities with their frequencies
  const topCities = sortedCities.slice(0, 7);

  // Calculate the average traffic of the week
  const weeklyTraffic = barChartDataDailyTraffic[0].data.reduce((acc, value) => acc + value, 0);
  const averageTraffic = weeklyTraffic / barChartDataDailyTraffic[0].data.length;

  // Calculate the percentage change in the last two data points
  const lastDataPoint = barChartDataDailyTraffic[0].data.slice(-1)[0];
  const secondLastDataPoint = barChartDataDailyTraffic[0].data.slice(-2, -1)[0];
  const percentageChange = ((lastDataPoint - secondLastDataPoint) / secondLastDataPoint) * 100;

  // Determine the arrow icon based on the direction of change
  const ArrowIcon = percentageChange >= 0 ? MdArrowDropUp : MdArrowDropDown;

  // Extract city names and frequencies
  const chartData = {
    name: 'Daily Traffic',
    data: topCities.map(([city, frequency]) => frequency),
  };
console.log(chartData);
  // CSS styles for the chart
  const chartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
        fontFamily: undefined,
        backgroundColor: '#000000',
      },
      onDatasetHover: {
        style: {
          fontSize: '12px',
          fontFamily: undefined,
        },
      },
      theme: 'dark',
    },
    xaxis: {
      categories: topCities.map(([city]) => city), // Set city names as x-axis categories
      labels: {
        style: {
          colors: '#A3AED0',
          fontSize: '14px',
          fontWeight: '500',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#CBD5E0',
          fontSize: '14px',
        },
      },
    },
    grid: {
      show: true, // Show grid lines
      borderColor: 'rgba(163, 174, 208, 0.3)', // Set grid border color
      strokeDashArray: 0, // Remove stroke dash array for solid grid lines
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: '#4318FF',
              opacity: 1,
            },
            {
              offset: 100,
              color: 'rgba(67, 24, 255, 1)',
              opacity: 0.28,
            },
          ],
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '40px',
        colors: {
          // Set consistent color for all bars
          ranges: [{ from: 0, to: 100 }],
          backgroundBarColors: ['#4318FF'], // Set background color for bars
          backgroundBarOpacity: 1,
        },
      },
    },
  };

  return (
    <Card extra="pb-7 p-[20px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          <p className="text-sm font-medium leading-4 text-gray-600">Weekly Impact</p>
          <p className="text-[34px] font-bold text-navy-700 dark:text-white">
          {averageTraffic.toFixed(2)}{' '}
            <span className="text-sm font-medium leading-6 text-gray-600">Visitors</span>
          </p>
        </div>
        <div className="mt-2 flex items-start">
          <div className="flex items-center text-sm text-green-500">
            <MdArrowDropUp className="h-5 w-5" />
            <p className="font-bold">+2.45% </p>
            {/* <p className="font-bold">{percentageChange.toFixed(2)}%</p> */}
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full pt-10 pb-0">
        {userData && chartData.data.length>0 && <BarChart chartData={barChartDataDailyTraffic} chartOptions={chartOptions} />}
      </div>
    </Card>
  );
};

export default DailyTraffic;
