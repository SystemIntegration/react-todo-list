import { BottomNavigation, Button, Checkbox, Paper, Table, TableCell, TableRow, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import './App.css'
import AllTask from "./component/AllTask";
import ActiveTask from "./component/ActiveTask";
import CompleteTask from "./component/CompleteTask";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [totalTaskNum, setTotalTaskNum] = useState(0);
  const [alignment, setAlignment] = useState('Active');
  const [allValue, setAllValue] = useState(false);
  const [activeValue, setActiveValue] = useState(true);
  const [completeValue, setCompleteValue] = useState(false);
  const [activeValueMap, setActiveValueMap] = useState([]);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks)
    }
  }, []);

  useEffect(() => {
    setTotalTaskNum(tasks.length)
    // setActiveValueMap(tasks);
  }, [tasks]);

  // Method for Add Task
  const addTask = (e) => {
    e.preventDefault();
    if(task !== ''){
      setTasks([...tasks, task]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
    }
    setTask("");
  };

  // Method for delete task
  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  // Method for checkbox are how many times checked
  const checked = (e, tabName) => {
    if(tabName === "ActiveTask"){
    const newTasks = [...activeValueMap];
    setActiveValueMap(newTasks);
    const getIndex = tasks.indexOf(e.target.value)
    const setTaskss = tasks[getIndex].split('-')
    const setValuesss = setTaskss[0] + "-" + true
    tasks.splice(getIndex, 1, setValuesss)
    localStorage.setItem("tasks", JSON.stringify(tasks));}
    else{
      const newTasks = [...activeValueMap];
      setActiveValueMap(newTasks);
      const getIndex = tasks.indexOf(e.target.value)
      const setTaskss = tasks[getIndex].split('-')
      const setValuesss = setTaskss[0] + "-" + false
      tasks.splice(getIndex, 1, setValuesss)
      localStorage.setItem("tasks", JSON.stringify(tasks));}
  };

  // Method for searching
  const searchTask = (e) => {
    setSearch(e.target.value);
  };


  // mainTask list for show in display.
  const filteredTasks = tasks.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase())
  );

  const allTasks = () => {
    setActiveValue(false)
    setCompleteValue(false)
    setAllValue(true)
    console.log('allTasks');
  }
  const activeTasks = () => {
    setActiveValue(true)
    setCompleteValue(false)
    setAllValue(false)
    console.log('activeTasks');
  }
  const complitTasks = () => {
    setActiveValue(false)
    setCompleteValue(true)
    setAllValue(false)
    console.log('complitTasks');
  }
  let active = tasks.filter((data)=>{return(data.split("-")[1] === 'false')})
  let completed = tasks.filter((data)=>{return(data.split("-")[1] === 'true')})

  return (
    <div>
      <div className="heading">
        <h1 style={{ margin: '0' }}>THINGS TO DO</h1>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ border: '1px solid black', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <input
              className="inputTagCSS"
              type="text"
              placeholder="Add Task"
              value={task.split("-")[0]}
              style={{ border: '0', width: 400}}
              onChange={(e) => setTask(e.target.value + "-" + false)}
            />
            <AddIcon onClick={addTask} style={{ cursor: 'pointer', border: '1px solid silver', borderRadius: '50%', padding: '2px', marginRight: '5px' }} />
          </div>
          <div style={{ border: '1px solid black', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '1rem' }}>
            <SearchIcon style={{ cursor: 'pointer', padding: '5px' }} />
            <input
              type="text"
              className="inputTagCSS"
              placeholder="Search Tasks"
              value={search}
              onChange={searchTask}
              style={{ border: '0' }}
            />
          </div>
        </div>
        <Table style={{ width: '61.5%', margin: '0 auto 8rem auto' }}>
          {allValue === true ?
            <AllTask data={filteredTasks} checked={checked} deleteTask={deleteTask} />
            :
            (
              activeValue === true ?
                <ActiveTask data={filteredTasks} checked={checked} deleteTask={deleteTask} />
                :
                (
                  completeValue === true ?
                    <CompleteTask data={filteredTasks} checked={checked} deleteTask={deleteTask} /> : null)

            )

          }
        </Table>
      </div>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          style={{ justifyContent: 'space-between', height: '3rem', backgroundColor: '#F3FEE8' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography style={{ marginLeft: '1rem', fontSize: '1rem' }}>
              {active.length} Items left
            </Typography>
          </div>
          <div>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="All" style={{ border: '0' }} onClick={() => { allTasks() }} >All Tasks: {totalTaskNum}</ToggleButton>
              <ToggleButton value="Active" style={{ border: '0' }} onClick={() => { activeTasks() }} >Active: {active.length}</ToggleButton>
              <ToggleButton value="Completed" style={{ border: '0' }} onClick={() => { complitTasks() }} >Completed: {completed.length}</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </BottomNavigation>
      </Paper>
    </div>
  );
};


export default App;