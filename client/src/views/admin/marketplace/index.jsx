import Banner from "./components/Banner";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "components/card/NftCard";

import { useSelector } from "react-redux";
import { useState } from "react";
import SmallApex from "./components/SmallApex";

const Marketplace = () => {
  const userdata = useSelector((state) => state.user.userData) || [];
  const [genderFilter, setGenderFilter] = useState('');

  const handleFilterChange = (filter) => {
    setGenderFilter(filter === 'All' ? '' : filter);
  };

  const setPreference = (user) => {
    const { age, gender, preferences } = user;
    let suggestion = "";
  
    // Check preferences and suggest accordingly
    if (preferences.includes("Electronic")) {
      if (age > 20) {
        suggestion = "PS5";
      } else {
        suggestion = "Electronic toys";
      }
    } else if (preferences.includes("Clothing")) {
      suggestion = "Fashion accessories";
    } else if (preferences.includes("Grocery")) {
      suggestion = "Cooking utensils";
    } else if (preferences.includes("Utility")) {
      suggestion = "Home appliances";
    }
  
    // Check gender and age for specific suggestions
    if (suggestion !== "") {
      if (gender === "Male") {
        if (age > 20) {
          suggestion = `${suggestion}`;
        } else {
          suggestion = `${suggestion}`;
        }
      } else if (gender === "Female") {
        if (age > 20) {
          suggestion = `${suggestion}`;
        } else {
          suggestion = `${suggestion}`;
        }
      }
    }
  
    return suggestion;
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
          <table className="w-full border-collapse border border-g">
            <thead>
              <tr className="bg-white">
                <th className="border hover:bg-gray-200 px-4 py-2">Name</th>
                <th className="border hover:bg-gray-200 px-4 py-2">Email</th>
                <th className="border hover:bg-gray-200 px-4 py-2">Age</th>
                <th className="border hover:bg-gray-200 px-4 py-2">Gender</th>
                <th className="border hover:bg-gray-200 px-4 py-2">City</th>
                <th className=" hover:bg-gray-200 px-4 py-2">
                  Preferences
                </th>
                <th className="border hover:bg-gray-200 px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100 cursor-pointer bg-white">
                  <td className="border border-g px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-g px-4 py-2 overflow-auto">
                    {user.email.split("example")[0]}
                  </td>
                  <td className="border border-g px-4 py-2">
                    {user.age}
                  </td>
                  <td className="border border-g px-4 py-2">
                    {user.gender}
                  </td>
                  <td className="border border-g px-4 py-2">
                    {user.city}
                  </td>
                  <td className="border border-g text-left px-4 py-2">
                    {setPreference(user)}
                  </td>
                  <td  className="p-2">
                    <button className="rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-600 bg-blueSecondary text-white px-2 py-2">

                    Apply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5">
          <h1 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">Advertisement Report</h1>
          <div>
            <SmallApex userData = {userdata}/>
          </div>
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
        <HistoryCard userData = {userdata} />
      </div>
    </div>
  );
};

export default Marketplace;
