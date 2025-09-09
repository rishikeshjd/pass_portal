  GNU nano 5.6.1                                                           App.js                                                                     
import ScheduleTable from './components/ScheduleTable';

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "layouts/dashboard";

function App() {
  return (
 <div>
      <h1>Welcome to PassPortal Dashboard</h1>
      <ScheduleTable />
    </div>
  );
}

export default App;

