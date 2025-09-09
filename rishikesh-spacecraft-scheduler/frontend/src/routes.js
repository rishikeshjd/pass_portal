/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import SupportServices  from "layouts/support-services";
import RequestStatus  from "layouts/request-status";
import SupportServices3  from "layouts/support-services3";
//import Billing from "layouts/billing";
//import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ClashSummary from "layouts/clash-summary";

import UserProfile from "layouts/user-profile";
import UserManagement from "layouts/user-management";


import Login from "auth/login";
import Register from "auth/register";
import ForgotPassword from "auth/forgot-password";
import ResetPassword from "auth/reset-password";

// @mui icons
import Icon from "@mui/material/Icon";
import Maintenance from "layouts/maintenance";
import Reporting from "layouts/reporting";
import TestPasses from "layouts/test-passes";
import FreeSlot from "layouts/free-slot";
import GuidelinesChange from "layouts/guidelines-change";
import UnderConstruction from "layouts/under-construction";

//--Icons
import PersonIcon from "@mui/icons-material/Person";
import SchIcon from "@mui/icons-material/TableView";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SFSIcon from "@mui/icons-material/Satellite";
import InboxIcon from "@mui/icons-material/Notifications";
import ReportsIcon from "@mui/icons-material/Assignment";
import UsersIcon from "@mui/icons-material/PersonAdd";
import StationIcon from "@mui/icons-material/CellTower";
import ListIcon from "@mui/icons-material/List";
import UpdGuidelinesIcon from "@mui/icons-material/AppRegistration";
import NormalcyIcon from "@mui/icons-material/SettingsInputAntenna";
import ReqStatusIcon from "@mui/icons-material/Checklist";
import CoolOffIcon from "@mui/icons-material/WifiTetheringOff";
import BallotIcon from "@mui/icons-material/Ballot";
import TestIcon from "@mui/icons-material/Flaky";

const routes = [
  
   
  /*{
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "examples",
    name: "User Profile",
    key: "user-profile",
    icon: <Icon fontSize="small">list</Icon>,
    route: "/user-profile",
    component: <UserProfile />,
  },  
  */
  
  //--General routes allowed for all users
  {
    type: "general",
    name: "View Schedule",
    fnctns: "VEW_SCH",
    key: "view-schedule",
    icon: <SchIcon />,//<Icon fontSize="small">table_view</Icon>,
    route: "/view-schedule",
    component: <Tables />,
  }, 
  {
    type: "general",
    name: "View Dashboard",
    fnctns: "VEW_DBD",
    key: "dashboard",
    icon: <DashboardIcon />,//<Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "general",
    name: "Station Free Slot",
    fnctns: "REQ_SFS",
    key: "station-free-slot",
    icon: <SFSIcon />,//icon: "satellite",
    route: "/station-free-slot",
    component: <FreeSlot />,
  },
  
  //--Account related routes allowed for all users
  {
    type: "account",
    name: "View Inbox",
    fnctns: "VEW_IBX",
   key: "notifications",
    icon: <InboxIcon />,//<Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "account",
    name: "Profile",
    fnctns: "CHG_PWD",
    key: "profile",
    icon: <PersonIcon />,//<Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },

  //--Account related routes allowed only for admin user
  {
    type: "account",
    name: "User Management",
    fnctns: "REG_USR",
    key: "user-management",
    icon: <UsersIcon />,//<Icon fontSize="small">assignment</Icon>,
    route: "/Reports",
    component: <UserManagement />,
  },
  //--Specific routes allowed for selected users
  {
    type: "specific",
    name: "Support Services",
    fnctns: "REQ_PAS,DEL_PAS,MOD_PAS,MOD_STN,MOD_ALS",
    key: "support-services",
    icon: <ListIcon />, //<Icon fontSize="small">list</Icon>,
    route: "/support-services",
    component: <SupportServices />,
  },
  {
    type: "specific",
    name: "Request Status",
    fnctns: "VEW_REQ",
    key: "request-status",
    icon: <ReqStatusIcon />,//<Icon fontSize="small">list</Icon>,
    route: "/request-status",
    component: <RequestStatus />,
  },
  {
    type: "specific",
    name: "Update Guidelines",
    fnctns: "CHG_GDL",
    key: "update-guidelines",
    icon: <UpdGuidelinesIcon />,//<Icon fontSize="small">list</Icon>,
    route: "/update-guidelines",
    component: <GuidelinesChange />,
  },
  {
    type: "specific",
    name: "Station Maintenance",
    fnctns: "REQ_DWT,REQ_MNT",
    key: "request-maintenance",
    icon: <StationIcon />,//<Icon fontSize="small">assignment</Icon>,
    route: "/request-maintenance",
    component: <Maintenance />,
  },
  {
    type: "specific",
    name: "Declare Station Normalcy",
    fnctns: "DEC_NRM",
    key: "declare-normalcy",
    icon: <NormalcyIcon />,//<Icon fontSize="small">assignment</Icon>,
    route: "/declare-normalcy",
    component: <UnderConstruction />,
  },  
  {
    type: "specific",
    name: "Station Cool-off",
    fnctns: "REQ_SCO",
    key: "request-cool-off",
    icon: <CoolOffIcon />,//<Icon fontSize="small">assignment</Icon>,
    route: "/request-cool-off",
    component: <UnderConstruction />,
  }, 
  {
    type: "specific",
    name: "Test/Angle CAL Passes",
    fnctns: "REQ_TST,REQ_ANG,REQ_TRK",
    key: "request-ang-cal-passes",
    icon: <TestIcon />,//<Icon fontSize="small">assignment</Icon>,
    route: "/request-test-passes",
    component: <UnderConstruction />,
  },
  {
    type: "specific",
    name: "Reporting",
    fnctns: "DLD_MSR,DLD_SUR",
    key: "reports",
    icon: <ReportsIcon />,//<Icon fontSize="small">assignment</Icon>,
    route: "/request-reports",
    component: <Reporting />,
  },    
  {
    type: "specific",
    name: "Support Services 3",
    fnctns: "",
    key: "support-services3",
    icon: <BallotIcon />,//<Icon fontSize="small">list</Icon>,
    route: "/support-services3",
    component: <SupportServices3 />,
  },       
  
  //--login and registration routes
  {
    type: "auth",
    name: "Login",
    fnctns: "",
    key: "login",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/auth/login",
    component: <Login />,
  },
  {
    type: "auth",
    name: "Register",
    fnctns: "",
    key: "register",
    icon: <Icon fontSize="small">reigster</Icon>,
    route: "/auth/register",
    component: <Register />,
  },
  {
    type: "auth",
    name: "Forgot Password",
    fnctns: "",
    key: "forgot-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/auth/forgot-password",
    component: <ForgotPassword />,
  },  
  {
    type: "auth",
    name: "Reset Password",
    fnctns: "",
    key: "reset-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/auth/reset-password",
    component: <ResetPassword />,
  },
  {
    type: "test",
    name: "Clash Summary",
    fnctns: "",
    key: "clash-summary",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/clash-summary",
    component: <ClashSummary />,
  },
  {
    type: "test",
    name: "Sign Up",
    fnctns: "",
    key: "sign-up",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "test",
    name: "Sign In",
    fnctns: "",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  }, 
  
];

export default routes;



