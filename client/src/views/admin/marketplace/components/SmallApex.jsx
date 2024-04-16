import React from 'react'
import ApexChart from 'components/charts/ApexChart';

function SmallApex({userData}) {
    console.log(userData);

    // Initialize counts for each preference
let groceryCount = 0;
let electronicCount = 0;
let utilityCount = 0;
let clothingCount = 0;

// Iterate over userData to count preferences
userData.forEach((user) => {
  user.preferences.forEach((preference) => {
    switch (preference) {
      case 'Grocery':
        groceryCount++;
        break;
      case 'Electronic':
        electronicCount++;
        break;
      case 'Utility':
        utilityCount++;
        break;
      case 'Clothing':
        clothingCount++;
        break;
      default:
        break;
    }
  });
});

// Create an array containing the counts of preferences
const preferenceCounts = [groceryCount*10, electronicCount*10, utilityCount*10, clothingCount*10];
console.log(preferenceCounts);

  return (
    <div>
      {preferenceCounts && <ApexChart series={preferenceCounts}/>}
    </div>
  )
}

export default SmallApex
