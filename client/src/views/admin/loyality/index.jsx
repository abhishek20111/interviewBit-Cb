import React, { useState } from "react";
import { useSelector } from "react-redux";
import ApexRadientChart from 'components/charts/LineArea';
import RadixChart from "./RadixChart";

function UserTable() {
  const userData = useSelector((state) => state.user.userData);
  const [filteredData, setFilteredData] = useState(userData.slice(0, 7));
  console.log(userData);

  const handleFilterChange = (filter) => {
    if (filter === "Male") {
      const data = userData.filter((user) => user.gender === "Male");
      setFilteredData(data.slice(0,7))
    } else if (filter === "Female") {
      const data = userData.filter((user) => user.gender === "Female");
      setFilteredData(data.slice(0,7));
    } else {
      setFilteredData(userData);
    }
  };
  const { electronicData, utilityData, clothingData, groceryData } = {
    "electronicData": ["Smartphone", "Laptop", "Headphones", "Smart Watch", "Tablet", "Camera", "Gaming Console", "Bluetooth Speaker"],
    "utilityData": ["Bulb", "Fan", "Refrigerator", "Air Conditioner", "Washing Machine", "Microwave Oven", "Water Purifier", "Vacuum Cleaner"],
    "clothingData": ["T-shirt", "Jeans", "Dress", "Shoes", "Jacket", "Sweater", "Skirt", "Socks"],
    "groceryData": ["Rice", "Milk", "Bread", "Eggs", "Vegetables", "Fruits", "Pasta", "Cereal"]
  };
  
  // Create a hashmap to store the counts of each category
  const categoryCounts = {
    electronicData: 0,
    utilityData: 0,
    clothingData: 0,
    groceryData: 0
  };
  
  // Iterate through each item in the user's cart
   userData.forEach(user => {
    // Iterate through each item in the user's cart
    user.cart.forEach(item => {
      // Check if the item belongs to any of the categories and increment the corresponding count
      if (electronicData.includes(item)) {
        categoryCounts.electronicData++;
      } else if (utilityData.includes(item)) {
        categoryCounts.utilityData++;
      } else if (clothingData.includes(item)) {
        categoryCounts.clothingData++;
      } else if (groceryData.includes(item)) {
        categoryCounts.groceryData++;
      }
    });
  });
  const series1 = Object.values(categoryCounts);
  // Now categoryCounts object contains the count of items in each category
  console.log(categoryCounts,series1);

  const setPreference = (user) => {
    const { preferences, cart, gender } = user;
    const { electronicData, utilityData, clothingData, groceryData } = {
      electronicData: [
        "Smartphone",
        "Laptop",
        "Headphones",
        "Smart Watch",
        "Tablet",
        "Camera",
        "Gaming Console",
        "Bluetooth Speaker",
      ],
      utilityData: [
        "Bulb",
        "Fan",
        "Refrigerator",
        "Air Conditioner",
        "Washing Machine",
        "Microwave Oven",
        "Water Purifier",
        "Vacuum Cleaner",
      ],
      clothingData: [
        "T-shirt",
        "Jeans",
        "Dress",
        "Shoes",
        "Jacket",
        "Sweater",
        "Skirt",
        "Socks",
      ],
      groceryData: [
        "Rice",
        "Milk",
        "Bread",
        "Eggs",
        "Vegetables",
        "Fruits",
        "Pasta",
        "Cereal",
      ],
    };

    const familyCounts = {
      electronic: 0,
      utility: 0,
      clothing: 0,
      grocery: 0,
    };

    // Ensure cart exists before processing
    if (cart) {
      // Count the number of items in the cart belonging to each family
      cart.forEach((item) => {
        if (electronicData.includes(item)) {
          familyCounts.electronic++;
        } else if (utilityData.includes(item)) {
          familyCounts.utility++;
        } else if (clothingData.includes(item)) {
          familyCounts.clothing++;
        } else if (groceryData.includes(item)) {
          familyCounts.grocery++;
        }
      });
    }

    // Check if three or more items belong to the same family
    const maxCount = Math.max(...Object.values(familyCounts));
    const maxFamily = Object.keys(familyCounts).find(
      (key) => familyCounts[key] === maxCount
    );

    if (cart.length > 0 && maxCount >= 3) {
      return `Get 60% discount on your next purchase of ${maxFamily} items.`;
    } else {
      let suggestion = "";
      // Create suggestions based on different conditions
      if (
        Object.keys(familyCounts).filter((key) => familyCounts[key] > 0)
          .length >= 3
      ) {
        suggestion +=
          "Choose items from different families and get additional discounts on your next purchase. ";
      }
      if (gender === "Male" && cart.includes("Men's Shorts")) {
        suggestion +=
          "Get 20% off on payment with a credit cart for Men's Shorts.";
      }
      return suggestion || "Free Delivery on purchase of "+cart[cart.length-1];
    }
  };

  

  // Initialize an object to store the count of users in each age range
  const ageCounts = {
    "10-20": 10,
    "20-30": 0,
    "30-40": 0,
    "40-50": 15,
  };
  
  // Iterate through each user and count the number of users in each age range
  userData.forEach(user => {
    const age = user.age;
    // Determine the age range the user falls into and increment the corresponding count
    if (age >= 10 && age < 20) {
      ageCounts["10-20"]+=10;
    } else if (age >= 20 && age < 30) {
      ageCounts["20-30"]+=5;
    } else if (age >= 30 && age < 40) {
      ageCounts["30-40"]+=5;
    } else if (age >= 40 && age < 50) {
      ageCounts["40-50"]+10;
  }}
  );
  const series2 = Object.values(ageCounts);
  // Now ageCounts object contains the count of users in each age range
  console.log(ageCounts, series2);

  const LineData = {
    type:"line",
    series: [{
        name: 'Age',
        type: 'column',
        data: series2.splice(0,4)
    }, {
        name: 'Prefrence',
        type: 'area',
        data: series1
      }, {
        name: 'Revenue',
        type: 'line',
        data: [30, 25, 36, 10]
      }
    ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false,
        },
        stroke: {
          width: [0, 2, 5],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '50%'
          }
        },
        
        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },
        labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003'
        ],
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          title: {
            text: 'Points',
          },
          min: 0
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
              }
              return y;
        
            }
          }
        }
      },
  }
  
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* User Table */}

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
        <div className="mt-5">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Age</th>
                <th className="border px-4 py-2">Gender</th>
                <th className="border px-4 py-2">City</th>
                <th className="border px-4 py-2">Reward</th>
                <th className="border px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {console.log(filteredData)}
              {filteredData &&
                filteredData.map((user) => (
                  <tr
                    key={user._id}
                    className="cursor-pointer bg-white hover:bg-gray-100"
                  >
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="overflow-auto border px-4 py-2">
                      {user.email.split("example")[0]}
                    </td>
                    <td className="border px-4 py-2">{user.age}</td>
                    <td className="border px-4 py-2">{user.gender}</td>
                    <td className="border px-4 py-2">{user.city}</td>
                    <td className="hover:text-black border px-4 py-2 text-left hover:font-semibold hover:shadow-lg">
                      {setPreference(user)}
                    </td>

                    <td className="border p-2">
                      <button className="rounded-xl bg-blueSecondary px-2 py-2 text-white shadow-lg hover:bg-blue-600 hover:shadow-xl">
                        Apply
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div>Getting more data , please click on All Button</div>
      </div>
      <div className="m-3 w-full p-4">
        <div className="bg-white rounded-xl">
            {series1[0]>0 && <ApexRadientChart series={LineData.series} options={LineData.options}/>}
            
        </div>
        <div className="bg-white">
              {userData && <RadixChart userData={userData}/>}      
        </div>
      </div>
    </div>
  );
}

export default UserTable;
