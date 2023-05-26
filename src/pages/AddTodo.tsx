import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {SelectChangeEvent} from "@mui/material/Select";
import {Button, Container, FormHelperText, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {ITaskItem, Level} from "../interface/taskItem";
import {useAppDispatch} from "../hooks/hooks";
import {addNewTask} from "../features/tasks/TasksSlice";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import FormControl from "@mui/material/FormControl";

const AddTodo = () => {
    const id = Number(Math.random().toString().substring(2, 7));
    const [error, setError] = useState('');
    const [fields, setFields] = useState<ITaskItem>({
        id: id,
        title: '',
        description: '',
        priority:'Low',
        status: false,
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const priority:Level[] = ['Low', 'Medium', 'High'];
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = event.target as HTMLInputElement;

        setFields((prevState: ITaskItem) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const addNewTodo = () => {
        const { title, description } = fields;
        if(title && description) {
            dispatch(addNewTask(fields))
            navigate('/');
        }
        setError('Please, fill all required fields.')
    }
    return (
        <Container sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
        }}>
            <Typography variant="h4" component="h4" my={2}>
                Add New Todo
            </Typography>
            <Stack direction={'column'}
                   sx={{minWidth:'50%'}}>
                <FormControl sx={{
                    display:'flex',
                    flexDirection:'column',
                    rowGap: '10px'
                }} error={Boolean(error)} variant="standard">
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
                <Dropdown name="priority" label="Priority" defaultValue={fields.priority} values={priority} onChange={handleChange}/>
                    <FormHelperText>{error}</FormHelperText>
                <Button variant="outlined" onClick={addNewTodo}>Submit</Button>
                </FormControl>

            </Stack>

        </Container>
    )
}

export default AddTodo;