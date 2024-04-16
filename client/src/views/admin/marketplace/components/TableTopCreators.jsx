import Card from "components/card";
import Progress from "components/progress";
import React, { useMemo } from "react";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

function TopCreatorTable(props) {
  const { userData } = props;

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <img
              src={getUserIcon(row.original.gender)} // Get user icon based on gender
              className="h-[30px] w-[30px] rounded-full"
              alt=""
            />
            <p className="text-sm font-medium text-navy-700 dark:text-white">
              {row.original.name}
            </p>
          </div>
        ),
      },
      {
        Header: "Suggestion",
        accessor: "suggestion",
      },
    ],
    []
  );

  const getSuggestion = (age, gender) => {
    if (age >= 10 && age <= 20) {
      return "YouTube Ads";
    } else if (age > 20 && age <= 30 && gender === "Female") {
      return "Instagram Ads";
    } else if (age > 20 && age <= 30 && gender === "Male") {
      return "Gym Protein Ads";
    } else {
      return "Other Suggestions";
    }
  };

  const data = useMemo(
    () =>
      userData
        .slice(0, 6) // Limit to only 7 users
        .map((user) => ({
          name: user.name,
          suggestion: getSuggestion(user.age, user.gender),
          gender: user.gender,
        })),
    [userData]
  );

  const getUserIcon = (gender) => {
    switch (gender) {
      case "Male":
        return avatar1; // Use male avatar icon
      case "Female":
        return avatar2; // Use female avatar icon
      default:
        return avatar3; // Use default avatar icon
    }
  };

  return (
    <Card extra={"h-[390px] w-full"}>
      <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
        <table className="w-full min-w-[400px] overflow-x-scroll">
          <thead>
            <tr className="text-start">
              {columns.map((column) => (
                <th key={column.Header} className="py-2 px-4 text-left">
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                {columns.map((column, colIndex) => (
                  <td key={`${rowIndex}-${colIndex}`} className="align-top py-3 px-4">
                    {column.accessor === "name" ? (
                      <div className="flex items-center">
                        <img
                          src={getUserIcon(row.gender)} // Get user icon based on gender
                          className="h-[30px] w-[30px] rounded-full mr-2"
                          alt="Icon"
                        />
                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                          {row[column.accessor]}
                        </p>
                      </div>
                    ) : (
                      <>{row[column.accessor]}</>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default TopCreatorTable;
