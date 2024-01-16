import React, { useState, useEffect, FC } from "react";

import Task from "./Task";
import { Task as TaskType } from "../lib/definitions";
import TaskForm from "./TaskForm";
import { Divider, Modal, Button, notification } from "antd";

type TaskListProps = {};

const TaskList: FC<TaskListProps> = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    // state to store the id of the task to be deleted
    const [deletionId, setDeletionId] = useState<string>("");
    // state for the notification ( antd )
    const [api, contextHolder] = notification.useNotification();

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
        // fetch tasks from the server (node backend)
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

    const openSuccessNotification = () => {
        api.open({
            message: "task added ✅",
            description:
                "- your task has been added successfully, you can check it in the list below",
            duration: 3,
        });
    };

    const addTask = (task: TaskType) => {
        // chekcing if the task already exists, if so, return
        const exists = tasks.find((t) => t.title === task.title);
        if (exists) {
            openErrorNotification();
            return;
        }
        setTasks([...tasks, task]);
        openSuccessNotification();
        return;
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
        setDeletionId(id);
        showModal();
        // const newTasks: TaskType[] = tasks.filter((task) => task.id !== id);
        // setTasks(newTasks);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        // confirm button is clicked
        const newTasks: TaskType[] = tasks.filter(
            (task) => task.id !== deletionId
        );
        setTasks(newTasks);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setDeletionId("");
        setIsModalOpen(false);
    };

    const openErrorNotification = () => {
        api.open({
            message: "task already exists ❌",
            description:
                "- your task already exists, please check the list below",
            duration: 3,
        });
    };

    return (
        <div>
            <Divider>Add a new Task</Divider>
            {contextHolder} {/* notification for the creation */}
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
};

export default TaskList;
