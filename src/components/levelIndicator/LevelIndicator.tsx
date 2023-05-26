import Chip from "@mui/material/Chip";
import {FC} from "react";
import { Level } from "../../interface/taskItem";

const LevelIndicator:FC<{ level: Level, status?: boolean }> = ({level,status}) => {
    let color:any;
    switch (level){
        case "High":
            color = "error";
            break;
        case "Medium":
            color = "info";
            break;
        case "Low":
            color = "success";
            break;
    }
    return (
        <Chip sx={{opacity: status ? '.5' : '1', transition: "background-color 0.5s ease", margin: '12px 0'}} label={level} color={color} />
    )
}

export default LevelIndicator