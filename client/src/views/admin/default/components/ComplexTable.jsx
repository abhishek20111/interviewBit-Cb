import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import Progress from "components/progress";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useMemo } from "react";

const ComplexTable = ({ product }) => {
  // Limiting the displayed data to 6 entries
  const limitedProductData = useMemo(() => product.slice(0, 6), [product]);

  const columnsData = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
        // Custom rendering for the ID column
        Cell: ({ value }) => <p className="text-sm font-bold text-navy-700 dark:text-white">XXX{value.slice(-4)}</p>,
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Sales",
        accessor: "sales",
      },
      {
        Header: "Rating",
        accessor: "rating",
      },
      {
        Header: "Discount",
        accessor: "discount",
        // Custom rendering for the Discount column
        Cell: ({ value }) => <p className="text-sm font-bold text-navy-700 dark:text-white">{value}%</p>,
      },
    ],
    []
  );

  const data = useMemo(() => limitedProductData, [limitedProductData]);

  const tableInstance = useTable(
    {
      columns: columnsData,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  return (
    <Card extra="w-full h-full px-6 pb-6 sm:overflow-x-auto">
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Complex Table
        </div>
        <CardMenu />
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <p className="text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = cell.value;

                    return (
                      <td
                        className="pt-[14px] text-semibold pb-[18px] "
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {data.length==24?"XXX"+data.slice(-4):data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ComplexTable;
