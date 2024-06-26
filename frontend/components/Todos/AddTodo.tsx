import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { Todos } from "../../types/todos";
import useGetAllTodos from "../../hooks/todos/getAllTodos";
import { useRouter } from "next/router";
import useAddTodo from "../../hooks/todos/addTodos";
import { FORM } from "../../constants/text";
import MasterLayout from "../layout/MasterLayout";

function AddTodo() {
  const router = useRouter();
  const { todos, loading } = useGetAllTodos();
  const { setNewTodo, storeError, storeResponse } = useAddTodo();

  const [todoList, setTodosList] =
    useState<{ value: string; label: string }[]>();

  useEffect(() => {
    const list = [] as { value: string; label: string }[];
    if (loading === false) {
      todos &&
        todos.forEach((item) => {
          list.push({ value: String(item.id), label: item.title });
        });
      setTodosList(list);
    }
  }, [todos, loading]);

  const onFinish = (values: any) => {
    const todo: Todos = {
      id: values.id,
      title: values.title,
    };
    setNewTodo(todo);
    router.push("/todos");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <MasterLayout>
        <div className="w-auto h-screen flex justify-center items-center bg-gray-500">
          <div className="w-96 h-fit bg-white rounded-lg p-7">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="title"
                name="title"
                rules={[
                  { required: true, message: "Please input your title!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-green-700"
                >
                  {FORM.SUBMIT}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </MasterLayout>
    </>
  );
}

export default AddTodo;
