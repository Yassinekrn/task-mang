import React, { useState, useEffect } from "react";
import Task from "./Task";
import { Task as TaskType } from "../lib/definitions";
import TaskForm from "./TaskForm";
import { Divider, Modal, Button } from "antd";

export default function TaskList() {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [delId, setDelId] = useState<string>("");
    console.log(tasks);
    useEffect(() => {
        const fetchedTasks: TaskType[] = [
            {
                id: "1425635985632",
                title: "read a book",
                description: "choose a book and read it",
                status: "in-progress",
            },
            {
                id: "2254145258969",
                title: "prepare a presentation",
                description:
                    "collect the data and assets needed, combine them into a good layout and finally add some animations to it",
                status: "done",
            },
        ];
        // async function fetchTasks() {
        //     fetch("http://localhost:3000/tasks").then((response) => {
        //         response.json().then((data) => {
        //             setTasks(data);
        //         });
        //     });
        // }
        // fetchTasks();
        setTasks(fetchedTasks);
    }, []);

    const addTask = (task: TaskType) => {
        setTasks([...tasks, task]);
    };

    const updateTask = (id: string) => {
        const newTasks: TaskType[] = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    status: "done",
                };
            }
            return task;
        });
        setTasks(newTasks);
    };

    const deleteTask = (id: string) => {
        setDelId(id);
        showModal();
        // const newTasks: TaskType[] = tasks.filter((task) => task.id !== id);
        // setTasks(newTasks);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        const newTasks: TaskType[] = tasks.filter((task) => task.id !== delId);
        setTasks(newTasks);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setDelId("");
        setIsModalOpen(false);
    };

    return (
        <div>
            <Divider>Add a new Task</Divider>
            <TaskForm addTask={addTask} />
            <Divider>Manage your tasks</Divider>
            <div className="flex justify-center content-center flex-wrap gap-5">
                {tasks.map((task: TaskType) => (
                    <Task
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        status={task.status}
                        id={task.id}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                    ></Task>
                ))}
                <Modal
                    title="Confirm Delete"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="confirm delete"
                    cancelText="cancel"
                    okButtonProps={{ danger: true }}
                >
                    <p>are you sure you want to delete this task?</p>
                </Modal>
            </div>
        </div>
    );
}
