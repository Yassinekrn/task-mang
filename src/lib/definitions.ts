export type Task = {
    id: string;
    title: string;
    description: string;
    status: "in-progress" | "done";
};

export type FieldType = {
    title?: string;
    description?: string;
    status?: string;
};
