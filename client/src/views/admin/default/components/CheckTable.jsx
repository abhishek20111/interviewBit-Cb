import React from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";

const CheckTable = ({ transaction }) => {
  const limitedTransactions = transaction.slice(0, 6);
  
  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Transactions Algo
        </div>
        <CardMenu />
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2  text-start">Name</th>
                <th className="py-2  text-start">Method</th>
                <th className="py-2  text-start">Status</th>
                <th className="py-2 text-start">Amount</th>
              </tr>
            </thead>
            <tbody>
              {limitedTransactions.map((transaction) => (
                <tr key={transaction._id} className="border-b border-gray-200">
                  <td className="py-3">{transaction.name}</td>
                  <td className="py-3">{transaction.paymentMethod}</td>
                  <td className="py-3">{transaction.status}</td>
                  <td className="py-3">{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default CheckTable;
