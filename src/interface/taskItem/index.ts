export type Level = "high" | "medium" | "low";
export interface ITaskItem {
    id: number,
    title: string,
    description: string,
    priority: Level,
    status: boolean,
}