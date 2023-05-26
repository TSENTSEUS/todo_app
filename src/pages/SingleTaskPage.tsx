import TaskItem from "../components/taskItem/TaskItem";
import {useAppSelector} from "../hooks/hooks";
import {RootState} from "../store/store";
import {useParams} from "react-router-dom";
import {Container, Typography} from "@mui/material";

const SingleTaskPage = () => {
    const todos = useAppSelector((state: RootState) => state.tasks.taskArray);
    const { id } = useParams();
    const task = todos.find((todo) => todo.id === Number(id))
    return (
        <Container>
            <Typography variant="h4" component="h4" my={2}>
                Selected Todo:
            </Typography>
            {task && <TaskItem task={task}/>}
        </Container>
    )
}

export default SingleTaskPage