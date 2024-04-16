import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  setGroceryData,
  setElectronicData,
  setUtilityData,
  setClothingData,
  setTransactionData,
  setProductData,
  setUserData,
} from "./store/UserSilce";

const App = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const [
        groceryResponse,
        electronicResponse,
        utilityResponse,
        clothingResponse,
        transactionResponse,
        productResponse,
        userResponse,
      ] = await Promise.all([
        axios.get("http://localhost:8080/grocery"),
        axios.get("http://localhost:8080/electronic"),
        axios.get("http://localhost:8080/utility"),
        axios.get("http://localhost:8080/clothing"),
        axios.get('http://localhost:8080/transactions'),
        axios.get('http://localhost:8080/products'),
        axios.get('http://localhost:8080/users')
      ]);

      dispatch(setGroceryData(groceryResponse.data));
      dispatch(setElectronicData(electronicResponse.data));
      dispatch(setUtilityData(utilityResponse.data));
      dispatch(setClothingData(clothingResponse.data));
      dispatch(setTransactionData(transactionResponse.data));
      dispatch(setProductData(productResponse.data));
      dispatch(setUserData(userResponse.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [dispatch]);


  return (
    <>
    {/* <button onClick={fetchData}>Click me</button> */}
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>

</>
  );
};

export default App;
