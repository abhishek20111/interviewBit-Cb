import React from "react";
import Card from "components/card";
import BarChart from "components/charts/BarChart";
import { MdBarChart } from "react-icons/md";
import { useSelector } from 'react-redux';

const WeeklyRevenue = () => {
  const transactionData = useSelector(state => state.user.transactionData);

  // Function to extract status data from transactions
  const getStatusData = () => {
    const statusCounts = {};
    transactionData.forEach(transaction => {
      const status = transaction.status;
      if (statusCounts[status]) {
        statusCounts[status]++;
      } else {
        statusCounts[status] = 1;
      }
    });
    return statusCounts;
  };

  // Function to prepare chart data from status data
  const prepareChartData = () => {
    const statusData = getStatusData();
    const labels = Object.keys(statusData);
    const data = Object.values(statusData);
    return [{ data }];
  };

  // Function to prepare chart options
  const prepareChartOptions = () => {
    return {
      chart: {
        id: 'weekly-revenue-chart',
      },
      xaxis: {
        categories: Object.keys(getStatusData()),
      },
    };
  };

  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Weekly Revenue
        </h2>
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="h-[250px] w-full xl:h-[350px]">
          {console.log(transactionData)}
          <BarChart
            chartData={prepareChartData()}
            chartOptions={prepareChartOptions()}
          />
        </div>
      </div>
    </Card>
  );
};

export default WeeklyRevenue;
