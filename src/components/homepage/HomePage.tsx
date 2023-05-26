import {useAppSelector} from "../../hooks/hooks";
import {RootState} from "../../store/store";
import {ITaskItem} from "../../interface/taskItem";
import TaskItem from "../taskItem/TaskItem";
import Container from "@mui/material/Container/Container";

const HomePage = () => {
    const todos = useAppSelector((state: RootState) => state.tasks.taskArray);

    return (
        <Container>
            Tasks.
            {todos.map((task: ITaskItem) => {
                return <TaskItem key={task.id} task={task}/>
            })}
        </Container>
    )
}

export default HomePage;