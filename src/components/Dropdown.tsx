import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {ChangeEvent, FC} from "react";

const Dropdown:FC<{
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void,
    defaultValue: string,
    name:string,
    label: string,
    values: string[]}> = ({onChange, values,defaultValue,name,label}) => {
    return (
        <FormControl>
            <InputLabel>{label}</InputLabel>
            <Select
                name={name}
                value={defaultValue}
                onChange={onChange}
                label={label}
            >
                {values.map((option,i) => {
                    return <MenuItem key={i} value={option}>{option}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}

export default Dropdown;