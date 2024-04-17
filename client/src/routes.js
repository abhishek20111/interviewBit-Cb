import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Loyality from "views/admin/loyality";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import CustomerFeedBack from "views/admin/customerFeedback/CustomerFeedback";
import RTLDefault from "views/rtl/default";
import Top from "views/admin/top";
// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson
} from "react-icons/md";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Segmentation",
    layout: "/admin",
    path: "segmentation",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Loyalty Suggestions",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "loyalityCheck",
    component: < Loyality/>,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Customer Analysis",
    layout: "/admin",
    path: "customer",
    icon: <MdPerson className="h-6 w-6" />,
    component: <CustomerFeedBack/>,
  },
{
  name: "Top Products",
  layout: "/admin",
  path: "top",
  icon: <MdPerson className="h-6 w-6" />,
  component: <Top />,
}
];
export default routes;
