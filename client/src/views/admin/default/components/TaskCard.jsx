import React, { useState, useEffect } from "react";
import CardMenu from "components/card/CardMenu";
import Checkbox from "components/checkbox";
import { MdDragIndicator, MdCheckCircle } from "react-icons/md";
import Card from "components/card";

const TaskCard = () => {
  // Array of tasks
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Define your array of tasks here
    const allTasks = [
      "Platform Report",
      "Analysis report",
      "Check sales",
      "Instagram ad details",
      "Fund in advertisement",
      "Marketing Strategy",
      "Product Development",
      "Customer Support",
      "Email Campaign",
      "Social Media",
      "Website Optimization",
      "Market Research",
      "Content Creation",
      "Brand Promotion",
      "Sales Forecasting",
      "Budget Management",
      "Team Collaboration",
      "Data Analysis",
      "Event Planning",
      "Feedback Collection",
      "Product Launch",
      "Competitor Analysis",
      "Inventory Management",
      "Customer Retention",
      "Lead Generation",
      "Performance Tracking",
      "Risk Assessment",
      "Vendor Negotiation",
      "Quality Assurance",
      "Training Sessions"
    ];
    

    // Randomly select 5 tasks
    const randomTasks = [];
    while (randomTasks.length < 5) {
      const randomIndex = Math.floor(Math.random() * allTasks.length);
      if (!randomTasks.includes(allTasks[randomIndex])) {
        randomTasks.push(allTasks[randomIndex]);
      }
    }

    // Set the selected tasks
    setTasks(randomTasks);
  }, []);

  return (
    <Card extra="pb-7 p-[20px]">
      {/* task header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
            <MdCheckCircle className="h-6 w-6 text-brand-500 dark:text-white" />
          </div>
          <h4 className="ml-4 text-xl font-bold text-navy-700 dark:text-white">
            Tasks
          </h4>
        </div>
        <CardMenu />
      </div>

      {/* task content */}
      <div className="h-full w-full">
        {tasks.map((task, index) => (
          <div className="mt-5 flex items-center justify-between p-2" key={index}>
            <div className="flex items-center justify-center gap-2">
              <Checkbox />
              <p className="text-base font-bold text-navy-700 dark:text-white">
                {task}
              </p>
            </div>
            <div>
              <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TaskCard;
