import Banner from "./components/Banner";


import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "components/card/NftCard";
import { useSelector } from "react-redux";
import { useState } from "react";

const Marketplace = () => {
  const userdata = useSelector((state) => state.user.userData) || [];
  const [genderFilter, setGenderFilter] = useState('');

  const handleFilterChange = (filter) => {
    setGenderFilter(filter === 'All' ? '' : filter);
  };

  const filteredData = genderFilter
    ? userdata.filter((user) => user.gender === genderFilter)
    : userdata;

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* client Table */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Client Table
          </h4>
          <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
            <li>
              <button
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                onClick={() => handleFilterChange("Male")}
              >
                Male
              </button>
            </li>
            <li>
              <button
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                onClick={() => handleFilterChange("Female")}
              >
                Female
              </button>
            </li>
            <li>
              <button
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                onClick={() => handleFilterChange("All")}
              >
                All
              </button>
            </li>
          </ul>
        </div>
        {/* User Table */}
        <div className="mt-5">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">Name</th>
                <th className="border border-gray-200 px-4 py-2">Email</th>
                <th className="border border-gray-200 px-4 py-2">Age</th>
                <th className="border border-gray-200 px-4 py-2">Gender</th>
                <th className="border border-gray-200 px-4 py-2">City</th>
                <th className="border border-gray-200 px-4 py-2">
                  Preferences
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {user.email.split("example")[0]}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {user.age}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {user.gender}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {user.city}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {user.preferences}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* right side section */}
      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <TopCreatorTable
        userData = {userdata}
          extra="mb-5"
          tableData={tableDataTopCreators}
          columnsData={tableColumnsTopCreators}
        />
        <HistoryCard />
      </div>
    </div>
  );
};

export default Marketplace;
