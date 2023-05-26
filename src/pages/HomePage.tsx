import {useAppSelector} from "../hooks/hooks";
import {RootState} from "../store/store";
import {ITaskItem} from "../interface/taskItem";
import TaskItem from "../components/taskItem/TaskItem";
import Container from "@mui/material/Container/Container";
import {ChangeEvent, useEffect, useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import Button from "@mui/material/Button";
import Dropdown from "../components/Dropdown";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {Typography} from "@mui/material";

const HomePage = () => {
    const tasks = useAppSelector((state: RootState) => state.tasks.taskArray);
    const priority = ['None', 'Low', 'Medium', 'High'];
    const status = ['None','Done','Not Done'];
    const [filteredTasks, setFilteredTasks] = useState({
        tasks,
        priority: priority[0],
        status: status[0],
        title: '',
    });
    useEffect(() => {
        setFilteredTasks((prevState) => ({...prevState, tasks: tasks}))
    },[tasks])

    const filterHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = event.target as HTMLInputElement;
        setFilteredTasks((prevState) => ({...prevState,
        [name]: value
        }))
    }

    const searchHandler = () => {
        const {title,status,priority} = filteredTasks;
        let result = tasks;
        if(title) {
            result = result.filter((task) => task.title.includes(filteredTasks.title))
        }
        if(status !== 'None') {
            result = result.filter((task) => task.status === (status === 'Done'))
        }
        if(priority !== 'None') {
            result = result.filter((task) => task.priority === filteredTasks.priority)
        }
        setFilteredTasks((prevState) => ({...prevState, tasks: result}))

    }

    return (
        <Container sx={{
            display:"flex",
            flexDirection:"column",
        }}>
            <Typography variant="h4" component="h4" my={2}>
                Task List
            </Typography>
            <Stack direction={{sm:"column", md: "row" }} sx={{rowGap: '10px'}}  spacing={{md:2}} mb={2}>
                <TextField label="Search by title" name="title" variant="outlined" onChange={filterHandler}/>
                <Dropdown onChange={filterHandler} defaultValue={filteredTasks.status} name={"status"} label={"Status"} values={status}/>
                <Dropdown name="priority" label="Priority" defaultValue={filteredTasks.priority} values={priority} onChange={filterHandler}/>
                <Button variant="outlined" onClick={searchHandler}>Search by filter</Button>
            </Stack>
            {filteredTasks.tasks.map((task: ITaskItem) => {
                return <TaskItem key={task.id} task={task}/>
            })}
        </Container>
    )
}

export default HomePage;