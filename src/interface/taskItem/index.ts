export type Level = "High" | "Medium" | "Low";
export interface ITaskItem {
    id: number,
    title: string,
    description: string,
    priority: Level,
    status: boolean,
}