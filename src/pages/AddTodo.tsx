import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {SelectChangeEvent} from "@mui/material/Select";
import Button from "@mui/material/Button/Button";
import {Container} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {ITaskItem, Level} from "../interface/taskItem";
import {useAppDispatch} from "../hooks/hooks";
import {addNewTask} from "../features/tasks/TasksSlice";
import { useNavigate } from "react-router-dom";
import SelectPriority from "../components/SelectPriority";

const AddTodo = () => {
    const id = Number(Math.random().toString().substring(2, 7));
    const [fields, setFields] = useState<ITaskItem>({
        id: id,
        title: '',
        description: '',
        priority:'low',
        status: false,
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<Level>) => {
        const { name, value } = event.target as HTMLInputElement;

        setFields((prevState: ITaskItem) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const addNewTodo = () => {
        dispatch(addNewTask(fields))
        navigate('/');
    }
    return (
        <Container sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
        }}>
            Add New Todo
            <Stack direction={'column'}
                   sx={{minWidth:'50%'}}
                   spacing={3}>
                <TextField
                    name="title"
                    value={fields.title}
                    onChange={handleChange}
                    label="Title"
                    variant="outlined" />
                <TextField
                    name="description"
                    value={fields.description}
                    onChange={handleChange}
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                />
                <SelectPriority value={fields.priority} onChange={handleChange}/>
                <Button variant="outlined" onClick={addNewTodo}>Submit</Button>
            </Stack>

        </Container>
    )
}

export default AddTodo;