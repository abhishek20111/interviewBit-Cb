import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";
import { useSelector } from 'react-redux';
import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";


const Dashboard = () => {
  const transaction = useSelector((state) => state.user.transactionData) || '';
  const product = useSelector((state) => state.user.productData) || '';
  const userData = useSelector((state)=> state.user.userData) || '';
 
  console.log(userData);
  
  // Calculate total amounts for different transaction statuses
  const completedAmount = transaction.reduce((acc, curr) => {
    if (curr.status === 'Completed') {
      return acc + curr.amount;
    }
    return acc;
  }, 0);

  const pendingAmount = transaction.reduce((acc, curr) => {
    if (curr.status === 'Pending') {
      return acc + curr.amount;
    }
    return acc;
  }, 0);

  const cancelledAmount = transaction.reduce((acc, curr) => {
    if (curr.status === 'Cancelled') {
      return acc + curr.amount;
    }
    return acc;
  }, 0);

  // Calculate total earnings (completed + pending)
  const totalEarnings = (completedAmount + pendingAmount);
  const totalSales = product.reduce((acc, curr) => acc + curr.sales, 0);

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        
      <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Earnings"}
          subtitle={"$" + (totalEarnings? totalEarnings : 0)}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Pending Payment"}
          subtitle={"$" + pendingAmount}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Completed Payment"}
          subtitle={"$" + completedAmount}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Cancelled Payment"}
          subtitle={"$" + cancelledAmount}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={totalSales?totalSales:'0'}
        />
       
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        
        <WeeklyRevenue />
      </div>


      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Transaction Table */}
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
            transaction={transaction}
          />
        </div>

        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic userData={userData} />
          <PieChartCard userData={userData}/>
        </div>

        {/* Complex Table , Task & Calendar */}
        <ComplexTable
          product={product}
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
