import Chip from "@mui/material/Chip";
import {FC} from "react";
import { Level } from "../../interface/taskItem";

const LevelIndicator:FC<{ level: Level, status?: boolean }> = ({level,status}) => {
    let color:any;
    switch (level){
        case "high":
            color = "error";
            break;
        case "medium":
            color = "info";
            break;
        case "low":
            color = "success";
            break;
    }
    return (
        <Chip sx={{opacity: status ? '.5' : '1', transition: "background-color 0.5s ease"}} label={level} color={color} />
    )
}

export default LevelIndicator