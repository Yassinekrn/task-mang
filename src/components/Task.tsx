import React from "react";
import { Task as TaskType } from "../lib/definitions";
import { Card, Button, Tooltip } from "antd";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

export default function Task({
    id,
    title,
    description,
    status,
    updateTask,
    deleteTask,
}) {
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
                            style={{ transform: "translateY(-4px)" }}
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
            style={{ width: 350 }}
            extra={
                status == "done" ? (
                    <Tooltip title={status}>
                        <Button
                            onClick={() => {
                                updateTask(id);
                            }}
                            disabled={status === "done"}
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
                            disabled={status === "done"}
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
            <div className="text-center "></div>
        </Card>
    );
}
