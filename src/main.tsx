import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import "./index.css";
import Layout from "./Layout.tsx";
import Home from "./pages/Home.tsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.tsx";
import App from "./App.tsx";

import AllEmployee from "./pages/Employee/AllEmployee.tsx";
import AddEmployee from "./pages/Employee/AddEmployee.tsx";

import ShowInventory from "./pages/Inventory/ShowInventory.tsx";
import AddItems from "./pages/Inventory/AddItems.tsx";
import AssignItems from "./pages/Inventory/AssignItems.tsx";

import Approval from "./pages/Approval/Approval.tsx";

import ShowAsset from "./pages/Asset/ShowAsset.tsx";
import AddAsset from "./pages/Asset/AddAsset.tsx";

import AddDefective from "./pages/Defective/AddDefective.tsx";
import ShowDefective from "./pages/Defective/ShowDefective.tsx";

import Profile from "./pages/Settings/Profile.tsx";
import GeneralSettings from "./pages/Settings/GeneralSettings.tsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" >
      
      <Route path="" element={<Home />} />
      
      <Route path="admin" element={<Layout />}>

        <Route path="test" element={<App />} />
        
        <Route path="dashboard" element={<AdminDashboard />} />

        <Route path="employee" >
          <Route path="overview" element={<AllEmployee />} />
          <Route path="add" element={<AddEmployee />} />
        </Route>

        <Route path="inventory">
          <Route path="overview" element={<ShowInventory />} />
          <Route path="add" element={<AddItems />} />
          <Route path="assign" element={<AssignItems />} />
          <Route path="update" element={<AddEmployee />} />
        </Route>

        <Route path="approval">
          <Route path="" element={<Approval />} />
        </Route>

        <Route path="asset">
          <Route path="overview" element={<ShowAsset />} />
          <Route path="add" element={<AddAsset />} />
        </Route>

        <Route path="defective">
          <Route path="overview" element={<ShowDefective />} />
          <Route path="return" element={<AddDefective />} />
        </Route>

        <Route path="settings">
          <Route path="general" element={<GeneralSettings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);