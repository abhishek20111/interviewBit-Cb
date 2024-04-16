import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";
import Card from "components/card";

const PieChartCard = ({userData}) => {

  let totalElements = 0;
  const categoryCounts = {
    electronic: 0,
    grocery: 0,
    utilities: 0,
    clothes: 0
  };

  const preferenceCounts = userData.reduce((counts, user) => {
    user.preferences.forEach((preference) => {
      counts[preference] = (counts[preference] || 0) + 1;
    });
    return counts;
  }, {});


  // Convert the preference counts to percentage
  const totalUsers = userData.length;
  const series = Object.values(preferenceCounts).map((count) => Math.round((count / totalUsers) * 100));

  // Options for the PieChart
  const options = {
    ...pieChartOptions,
    labels: Object.keys(preferenceCounts),
  };
  userData.forEach((user) => {
    // Count occurrences of each category in user's preferences
    user.preferences.forEach((preference) => {
      if (preference === 'Electronic') {
        categoryCounts.electronic++;
      } else if (preference === 'Grocery') {
        categoryCounts.grocery++;
      } else if (preference === 'Utility') {
        categoryCounts.utilities++;
      } else if (preference === 'Clothing') {
        categoryCounts.clothes++;
      }
    });
    totalElements++;
  });

  const averages = {
    electronic: Math.round((categoryCounts.electronic / totalElements) * 100),
    grocery: Math.round((categoryCounts.grocery / totalElements) * 100),
    utilities: Math.round((categoryCounts.utilities / totalElements) * 100),
    clothes: Math.round((categoryCounts.clothes / totalElements) * 100)
  };

  

  

  console.log(categoryCounts);

  console.log(options, series);

  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Conversion Rate
          </h4>
        </div>

        <div className="mb-6 flex items-center justify-center">
          {/* <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white"> */}
            <div value="monthly">Monthly</div>
            
          {/* </select> */}
        </div>
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        {options && series && <PieChart options={pieChartOptions} series={series} />}
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-brand-500" />
            <p className="ml-1 text-sm font-normal text-gray-600">Average</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
           {totalElements}
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
            <p className="ml-1 text-sm font-normal text-gray-600">System</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            25%
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PieChartCard;
