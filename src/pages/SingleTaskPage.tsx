import TaskItem from "../components/taskItem/TaskItem";
import {useAppSelector} from "../hooks/hooks";
import {RootState} from "../store/store";
import {useParams} from "react-router-dom";
import {Container} from "@mui/material";

const SingleTaskPage = () => {
    const todos = useAppSelector((state: RootState) => state.tasks.taskArray);
    const { id } = useParams();
    const task = todos.find((todo) => todo.id === Number(id))
    return (
        <Container>
            Selected Todo:
            {task && <TaskItem task={task}/>}
        </Container>
    )
}

export default SingleTaskPage