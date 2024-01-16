import React, { FC } from "react";

import { Card, Button, Tooltip } from "antd";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

type TaskProps = {
    id: string;
    title?: string;
    description?: string;
    status: "done" | "in-progress";
    updateTask: (id: string) => void;
    deleteTask: (id: string) => void;
};

const Task: FC<TaskProps> = ({
    id,
    title,
    description,
    status,
    updateTask,
    deleteTask,
}) => {
    return (
        <Card
            hoverable
            title={
                <>
                    <Button
                        shape="circle"
                        type="primary"
                        danger
                        onClick={() => {
                            deleteTask(id);
                        }}
                    >
                        <DeleteOutlined
                            style={{ transform: "translateY(-4px)" }} // align icon in the middle
                        />
                    </Button>
                    {"   "}
                    <span style={{ paddingLeft: "8px" }}>
                        ✒️
                        {title ? title : "Untitled"}
                    </span>
                </>
            }
            bordered={false}
            style={{ width: "350px" }}
            extra={
                status == "done" ? (
                    <Tooltip title={status}>
                        <Button
                            onClick={() => {
                                updateTask(id);
                            }}
                            disabled={true}
                            icon={<CheckCircleOutlined />}
                            style={{
                                backgroundColor: "#5eb008",
                                color: "white",
                            }}
                            shape="circle"
                        ></Button>
                    </Tooltip>
                ) : (
                    <Tooltip title={status}>
                        <Button
                            onClick={() => {
                                updateTask(id);
                            }}
                            disabled={false}
                            icon={<ClockCircleOutlined />}
                            style={{
                                backgroundColor: "orange",
                                color: "white",
                            }}
                            shape="circle"
                        ></Button>
                    </Tooltip>
                )
            }
        >
            <p>
                <i>📑 description:</i>
            </p>
            <ul>
                <li>
                    {description ? (
                        <p>{description}</p>
                    ) : (
                        <p>No description provided</p>
                    )}
                </li>
            </ul>
        </Card>
    );
};

export default Task;
