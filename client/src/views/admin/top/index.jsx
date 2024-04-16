import Banner from "./components/Banner";




import { useSelector } from "react-redux";
import { useState } from "react";
import Banner1 from "./components/Banner";
import Banner2 from "./components/Banner2";
import Banner3 from "./components/Banner3";

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
    <div className="container mx-auto p-4">
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="col-span-1 xl:col-span-1">
            <Banner1 />
        </div>
        <div className="col-span-1 xl:col-span-1">
            <Banner2 />
        </div>
        <div className="col-span-1 xl:col-span-1">
            <Banner3 />
        </div>
    </div>
</div>

  );
};

export default Marketplace;
