import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {ChangeEvent, FC} from "react";
import {Level} from "../interface/taskItem";

const SelectPriority:FC<{onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<Level>) => void, value: Level}> = ({onChange, value}) => {
    return (
        <FormControl >
            <InputLabel>Priority</InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                name="priority"
                value={value}
                onChange={onChange}
                label={"Priority"}
            >
                <MenuItem value={'low'}>Low</MenuItem>
                <MenuItem value={'medium'}>Medium</MenuItem>
                <MenuItem value={'high'}>High</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SelectPriority;