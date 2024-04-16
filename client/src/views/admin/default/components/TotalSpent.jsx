import React from "react";
import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdBarChart,
} from "react-icons/md";
import Card from "components/card";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import LineChart from "components/charts/LineChart";
import { useSelector } from 'react-redux';
// import { options } from "prettier-plugin-tailwindcss";

const TotalSpent = () => {
  const products = useSelector((state) => state.user.productData) || [];
  console.log(products);

   // Calculate total sales
   const totalSales = products.reduce((acc, product) => acc + product.sales, 0);

   let percentageDifference = 0;
   if (products.length >= 2) {
     const lastProductSales = products[products.length - 1].sales;
     const secondLastProductSales = products[products.length - 2].sales;
     percentageDifference = ((lastProductSales - secondLastProductSales) / secondLastProductSales) * 100;
   }

   // Function to format number in rounded off thousands (k)
   const formatSales = (sales) => {
     if (sales >= 1000) {
       return `$${(sales / 1000).toFixed(1)}k`;
     }
     return `$${sales}`;
   };
 

// Prepare data for the chart
const options = {
  chart: {
    id: 'apexchart-example'
  },
  xaxis: {
    categories: products.map((product, index) => index * 50), // Generate time in seconds with a difference of 50
    tickAmount: 10, // Set the number of ticks to display on the x-axis
    min: 0
  }
};

const series = [{
  name: 'Sales',
  data: products.map(product => product.sales) // Extract sales data for each product
}];

  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday />
          <span className="text-sm font-medium text-gray-600">This month</span>
        </button>
        {/* <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button> */}
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
          {formatSales(totalSales)}
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">Total Spent</p>
            <div className="flex flex-row items-center justify-center">
              <MdArrowDropUp className="font-medium text-green-500" />
              <p className="text-sm font-bold text-green-500"> +2.45% </p>
              {/* <p className="text-sm font-bold text-green-500">{percentageDifference.toFixed(2)}%</p> */}
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <LineChart options={options} series={series} />
          {/* <LineChart options={data.options} series={data.series} /> */}
        </div>
      </div>
    </Card>
  );
};

export default TotalSpent;
