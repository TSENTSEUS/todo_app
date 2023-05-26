import { createSlice } from '@reduxjs/toolkit'
import type {PayloadAction} from "@reduxjs/toolkit";
import { ITaskItem } from "../../interface/taskItem";

interface TasksState {
    taskArray: ITaskItem[]
}

const initialState: TasksState = {
    taskArray: [],
}

export const tasksSlice = createSlice({
    name: 'tasksSlice',
    initialState,
    reducers: {
        addNewTask: (state, action: PayloadAction<ITaskItem>) => {
            state.taskArray.push(action.payload);
        },
        toggleTask: (state, action: PayloadAction<number>) => {
            const task = state.taskArray.find((task) => task.id === action.payload)
            if(task) {
                task.status = !task.status
            }
        },
        editTask: (state, action: PayloadAction<ITaskItem>) => {
            const updatedTask = action.payload
            const index = state.taskArray.findIndex((task) => task.id === updatedTask.id)
            if(index !== -1) {
                state.taskArray[index] = updatedTask;
            }
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.taskArray = state.taskArray.filter((task) => task.id !== action.payload);
        }
    }
})

export const { addNewTask, toggleTask , editTask,deleteTask} = tasksSlice.actions;

export default tasksSlice.reducer;