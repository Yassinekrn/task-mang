import React, { FC } from "react";
import { Task as TaskType, FieldType } from "../lib/definitions";
import { Input, Button, Tooltip, notification, Select, Form } from "antd";
import {
    EditOutlined,
    CopyOutlined,
    PlusCircleOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";

// could use TextArea instead of Input but I decided not to to keep using the icon prefix
// const { TextArea } = Input;
const { Option } = Select;

type TaskFormProps = {
    addTask: (task: TaskType) => void;
};

const TaskForm: FC<TaskFormProps> = ({ addTask }) => {
    const [form] = Form.useForm();
    // states to handle the form inputs, now useless since I'm using the form from antd

    const [api, contextHolder] = notification.useNotification();

    const onFinish = (values: any) => {
        // console.log("Success:", values); // values is an object containing the values of the form

        const newTask: TaskType = {
            id: new Date().getTime().toString(),
            title: values.title || "",
            description: values.description || "",
            status:
                values.status === "in-progress" || values.status === "done"
                    ? values.status
                    : "in-progress",
        };
        addTask(newTask);

        form.resetFields();
    };

    const onFinishFailed = (errorInfo: any) => {
        // error with the form submission
        console.log("Failed:", errorInfo);
    };

    const onStatusChange = (value: string) => {
        switch (value) {
            case "done":
                form.setFieldsValue({ status: "done" });
                break;
            case "in-progress":
                form.setFieldsValue({ status: "in-progress" });
                break;
            case "other":
                form.setFieldsValue({ status: "in-progress" });
                break;
            default:
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            {contextHolder}
            <h2 className="text-2xl font-semibold mb-4">Task Form</h2>

            <Form
                form={form} // Connect the form instance to the Form component
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="space-y-4"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "Please input your task title!",
                        },
                    ]}
                >
                    <Input
                        required
                        type="text"
                        placeholder="Input the title of your task"
                        prefix={<EditOutlined />}
                        className="w-full"
                        suffix={
                            <Tooltip title="tip: pick a short and meaningful title for a cleaner look.">
                                <InfoCircleOutlined
                                    style={{ color: "rgba(0,0,0,.45)" }}
                                />
                            </Tooltip>
                        }
                    />
                </Form.Item>
                <Form.Item
                    label="Desc"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please insert a description for your task!",
                        },
                    ]}
                >
                    <Input
                        required
                        type="text"
                        placeholder="Add a description to your task"
                        prefix={<CopyOutlined />}
                        className="w-full"
                    />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Stat"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Select a status for your task"
                        onChange={onStatusChange}
                        allowClear
                    >
                        <Option value="done">done</Option>
                        <Option value="in-progress">in-progress</Option>
                    </Select>
                </Form.Item>
                <Button
                    icon={<PlusCircleOutlined />}
                    htmlType="submit"
                    style={{ backgroundColor: "#1677ff", color: "white" }}
                    className="w-full"
                >
                    Add Task
                </Button>
            </Form>
        </div>
    );
};

export default TaskForm;
