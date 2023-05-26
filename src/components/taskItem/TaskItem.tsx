import React, {ChangeEvent, FC, useState} from "react";
import {
    Card,
    CardContent,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {ITaskItem} from "../../interface/taskItem";
import {useAppDispatch} from "../../hooks/hooks";
import {toggleTask} from '../../features/tasks/TasksSlice'
import {useNavigate, useParams} from "react-router-dom";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Stack from "@mui/material/Stack";
import EditIcon from '@mui/icons-material/Edit';
import {Level} from '../../interface/taskItem'
import {SelectChangeEvent} from "@mui/material/Select";
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {editTask, deleteTask} from '../../features/tasks/TasksSlice'
import LevelIndicator from "../levelIndicator/LevelIndicator";
import Dropdown from "../Dropdown";

const TaskItem: FC<{ task: ITaskItem }> = ({task}) => {
    const params = useParams();
    const {id, title, description, priority, status} = task
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editData, setEditData] = useState({
        id: id,
        title: title,
        description: description,
        priority: priority,
        status: status,
    })
    const deleteHandler = () => {
        dispatch(deleteTask(id))
    }
    const editModeHandler = () => {
        setEditMode((prevState) => !prevState);
        if (editMode) {
            dispatch(editTask(editData))
        }
    }
    const editDataHandler = (event: { target: { name: string, value: string }; }) => {
        const {name, value} = event.target;
        if (editMode) {
            setEditData((prevData) => ({
                ...prevData,
                [name.toLowerCase()]: value,
            }));
        }
    }
    const toggleTaskHandler = () => {
        dispatch(toggleTask(id))
    }
    const singleTaskHandler = () => {
        if (params.id) {
            return navigate('/');
        }
        navigate(`/${id}`)
    }

    return (
        <Card variant="outlined" sx={{mb: 2, backgroundColor: status ? 'gray' : 'none', transition: "background-color 0.5s ease",}}>
            <Stack direction="row" alignItems="start" justifyContent="space-between">
                <CardContent>
                    <Stack direction="column" spacing={editMode ? 2 : 1}>
                        <EditComponent
                            editMode={editMode}
                            name="Title"
                            variant='h6'
                            value={editData.title}
                            onChange={editDataHandler}/>
                        <EditComponent editMode={editMode}
                                       name="Description"
                                       color={'text.secondary'}
                                       variant='body2'
                                       value={editData.description}
                                       onChange={editDataHandler}/>
                        <EditComponent
                            color={'text.secondary'}
                            editMode={editMode}
                            variant="body2"
                            name="Priority"
                            status={status}
                            value={editData.priority}
                            onChange={() => editDataHandler}/>
                    </Stack>
                    <LevelIndicator status={status} level={editData.priority}/>
                </CardContent>
                <div>
                    <IconButton size="small" onClick={toggleTaskHandler}>
                        <CheckCircleIcon/>
                    </IconButton>
                    <IconButton size="small" onClick={singleTaskHandler}>
                        {params.id ? <ArrowBackIcon/> : <OpenInFullIcon/>}
                    </IconButton>
                    <IconButton size="small" onClick={deleteHandler}>
                        <DeleteIcon/>
                    </IconButton>
                    {params.id && <IconButton size="small" onClick={editModeHandler}>
                        {editMode ? <SaveIcon/> : <EditIcon/>}
                    </IconButton>}
                </div>
            </Stack>
        </Card>
    )
}

interface IEdit {
    editMode: boolean,
    name: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void,
    color?: string,
    variant: any,
}

const EditComponent: FC<IEdit> = ({editMode, name, value, onChange, color, variant}) => {
    const priority:Level[] = ['Low', 'Medium', 'High'];

    return (
        <>
            {editMode
                ? `${name.toLowerCase()}` === 'priority' ? <Dropdown name="priority" label="Priority" defaultValue={value} values={priority} onChange={onChange}/>
                    : <TextField value={value} label={name} variant="outlined" name={name} onChange={onChange}/>
                : `${name.toLowerCase()}` !== 'priority' && <Typography variant={variant} component="div" color={color}>
                        {value}
                    </Typography>
            }
        </>
    )
}
export default TaskItem;