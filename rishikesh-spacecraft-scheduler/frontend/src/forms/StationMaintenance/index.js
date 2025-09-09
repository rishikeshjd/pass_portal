/*
    Coded By: Shubhangi Agrawal

*/

import React, { useState, useMemo, useCallback } from "react"; 
import Select from "react-select";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { Grid, Input } from "@mui/material";
import Card from "@mui/material/Card";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";

import stnIcon from "assets/images/small-logos/station1.png";
import endIcon from "assets/images/small-logos/end_date.png"

import { readStnCnfg, getTerminalList} from "layouts/support-services/data/StationsConfig.js";
import MDButton from "components/MDButton";
import { position } from "stylis";
import { BorderColor } from "@mui/icons-material";
import MDAlert from "components/MDAlert";

function StationMaintenanceForm(){
    var x = new Date();
    x.setTime((x.getTime()+(24*60*60*1000))); //--Maintenance can be requested only from next working day
    var y = new Date((x.getTime()+(30*24*60*60*1000)));    
    
    const minDate = x.toISOString().substring(0,10);
    const maxDate = y.toISOString().substring(0,10);
    console.log("Cur,Min,Max Date:", x, minDate, maxDate);

    //--get terminal list from config file
    const stnCnfg = readStnCnfg();
    const trmnlList = useMemo(() => getTerminalList(stnCnfg));

    console.log("Terminals = ",trmnlList);

    let hourList = [{value:0, label:"Hour"}];
    for(let i=0;i<24;i++){
        if(i<10)
            hourList.push({value:(i+1), label:"0"+i});
        else
            hourList.push({value:(i+1), label:i});
    }

    let minList = [{value:0, label:"Minutes"}];
    for(let i=0;i<60;i++){
        if(i<10)
            minList.push({value:(i+1), label:"0"+i});
        else
            minList.push({value:(i+1), label:i});
    }
    
    const [selStns, setSelectedStns] = useState([]);//{value:"vB01", label:"B01"}, {value:"vB02", label:"B02"}]);
    const [startDate, setStartDate] = useState("");
    const [startHour, setStartHour] = useState("");
    const [startMins, setStartMins] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endHour, setEndHour] = useState("");
    const [endMins, setEndMins] = useState("");

    const [errors, setError] = useState([]);

    const handleOnSelectChangeStn = (selectOption) => {
      setSelectedStns(selectOption);      
    };

    const handleSubmit = () => {
      //check inputs are OK
      console.log("start date", startDate, startHour, startMins, startDate.substring(8,10));
      console.log("end date", endDate, endHour, endMins);
      if (selStns.length === 0)
        setError((old = []) => old.splice(old.length, 0, "Station for maintenance not selected!!"));
      else if(startDate === "")
        setError((old = []) => old.splice(old.length, 0, "Start date is empty!!"));      
      else if(startHour === "")
        setError((old = []) => old.splice(old.length, 0, "Start Hour is not set!!"));
      /*else if(startMins === "")
        setError("Start Minutes is not set!!");
      else if(endDate === "")
        setError("End date is empty!!");
      else if(endHour === "")
        setError("End Hour is not set!!");
      else if(endMins === "")
        setError("End Minutes is not set!!");
      //let st = new Date(startDate.substring(0,4), parseInt(startDate.substring(5,7))-1, startDate.substring(8,10)+1);
      let st = new Date(startDate);
      st.setHours(startHour);
      st.setMinutes(startMins);      
      console.log("start date set as ", st.toISOString());      
      let en = new Date(endDate);
      //TBD: multiline error message display for all errors at once
      //en.setHours(endHour);
      //en.setMinutes(endMins);*/




    };


    const FieldVal = ({ image, name, ele }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}  >        
          <MDBox display="flex" alignItems="center" px={4} width="40%" sx={{ fontSize:12 }} >
            <MDAvatar src={image} name={name} size="sm" variant="rounded" />
          <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
            {name}
          </MDTypography>
          </MDBox>
          <MDBox px={8} py={2} width="60%" sx={{ fontSize:12 }} >
            {ele}
          </MDBox>          
        </MDBox>
    );  

    
    /*const customStyles = {
        container: (provided) => ({
          ...provided,
          width: '100%', // Full width
        }),
        control: (provided) => ({
          ...provided,
          borderRadius: '4px', // Rounded corners
          borderColor: 'lightgray', // Border color
          boxShadow: 'none', // Remove default shadow
          '&:hover': {
            borderColor: 'gray', // Border color on hover
          },
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: '4px',
        }),
        menuList: (provided) => ({
          ...provided,
          padding: 0,
        }),
        option: (provided, state) => ({
          ...provided,
          fontSize: '12px',
          backgroundColor: state.isSelected ? '#d3d3d3' : '#ffffff', // Background color for selected option
          color: state.isSelected ? '#000000' : '#333333', // Text color for selected option
          '&:hover': {
            backgroundColor: '#e0e0e0', // Background color on hover
          },
        }),
      };*/

    return (
        <MDBox display="flex" justifyContent="space-between" alignItems="center" px={6} py={6}>        
            <Grid container spacing={6}>
              <Grid item xs={12}>
               <Card>
                <FieldVal image={stnIcon} name={"Select Station for Maintenance"} ele={
                    <Select
                        //styles={customStyles}
                        onChange={handleOnSelectChangeStn}            
                        placeholder="Select Antenna"            
                        isMulti={true}
                        options={trmnlList}
                        value={selStns}
                    />
                } />
                <FieldVal image={endIcon} name={"Enter Maintenance Start Time (UT)"} ele={
                    <Grid container spacing={1}>
                      <Grid item xs={5} sx={{ fontWeight: "light", fontSize: 12}}>
                        <input
                            type="date"
                            value={startDate || ""}
                            onChange={(e) => { setStartDate(e.target.value) }}
                            min={minDate}
                            max={maxDate}
                            style={{
                                border: '1px solid lightgray',
                                borderRadius: '4px',
                                padding: '10px',
                                fontSize: '12px',
                                fontWeight: 'medium',
                                color: 'gray',
                                width: '100%',
                            }}         
                        />
                      </Grid> 
                      <Grid item xs={3} sx={{ fontWeight: "light", fontSize: 12 }}>
                        <Select
                            placeholder="Hour"
                            value={startHour || ""}                                                                                                   >
                            options={hourList}
                            onChange={(option) => {setStartHour(option)}}
                            noOptionsMessage={({inputValue}) => !inputValue ? noOptionsText : "Invalid Hour Value"}
                        />
                      </Grid>
                      <Grid item xs={4} sx={{ fontWeight: "light", fontSize: 12 }}>
                        <Select
                            placeholder="Minutes"
                            value={startMins || ""}
                            options={minList}
                            onChange={(option) => {setStartMins(option)}}            
                            noOptionsMessage={({inputValue}) => !inputValue ? noOptionsText : "Invalid Value for Minutes"}                            >
                        />
                      </Grid>
                    </Grid>
                } />
                <FieldVal image={endIcon} name={"Enter Maintenance End Time (UT)"} ele={
                    <Grid container spacing={1}>
                        <Grid item xs={5} sx={{ fontWeight: "light", fontSize: 12}}>
                            <input
                                type="date"
                                value={endDate || ""}
                                onChange={(e) => { setEndDate(e.target.value) }}
                                min={minDate}
                                max={maxDate}
                                style={{
                                    border: '1px solid lightgray',
                                    borderRadius: '4px',
                                    padding: '10px',
                                    fontSize: '12px',
                                    fontWeight: 'medium',
                                    color: 'gray',
                                    width: '100%',
                                }}         
                            />
                        </Grid> 
                        <Grid item xs={3} sx={{ fontWeight: "light", fontSize: 12 }}>
                            <Select
                                placeholder="Hour"
                                value={endHour || ""}                                                                                                 >
                                options={hourList}
                                onChange={(option) => {setEndHour(option)}}
                                noOptionsMessage={({inputValue}) => !inputValue ? noOptionsText : "Invalid Hour Value"}
                            />
                        </Grid>
                        <Grid item xs={4} sx={{ fontWeight: "light", fontSize: 12 }}>
                            <Select
                                placeholder="Minutes"
                                value={endMins || ""}
                                options={minList}
                                onChange={(option) => {setEndMins(option)}}            
                                noOptionsMessage={({inputValue}) => !inputValue ? noOptionsText : "Invalid Value for Minutes"}                        >
                            />
                        </Grid>
                    </Grid>
                }/>
                <MDBox display="flex" justifyContent="space-between" alignItems="right" py={4} px={4}>
                    <MDButton variant="gradient" color="info" type="submit" onClick={handleSubmit}>Submit</MDButton>
                </MDBox>
                {errors.length > 0 && (errors.map((error) => {
                  <MDAlert color="error" dismissable onClick={() => setError("")}>
                    <MDTypography variant="body2" color="white" fontWeight="bold">
                      {error}
                    </MDTypography>
                  </MDAlert>
                }))} 
              </Card>
            </Grid>
          </Grid>
        </MDBox>        

  );
}  

export default StationMaintenanceForm;


