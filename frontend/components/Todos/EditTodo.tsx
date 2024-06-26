import React, { useState, useEffect, Fragment } from "react";
import { Todos } from "../../types/todos";
import { useRouter } from "next/router";
import { Button, Checkbox, Form, Input } from "antd";
import { mutate } from "swr";
import useGetAllTodos from "../../hooks/todos/getAllTodos";
import useEditTodo from "../../hooks/todos/editTodos";
import { FORM } from "../../constants/text";
import MasterLayout from "../layout/MasterLayout";
import useGetTodo from "@/hooks/todos/getTodo";

function EditTodoComponent() {
  const router = useRouter();
  const [todoVal, setTodo] = useState<Todos>();

  const { id } = router.query;

  const { updateResponse, isSubmitting, setUpdatedTodo } = useEditTodo();

  const { todo, isLoading, error } = useGetTodo(Number(id));

  useEffect(() => {
    if (id) {
      mutate("/todos/get/todo-id");
    }
  }, [id]);

  useEffect(() => {
    setUpdatedTodo(todoVal);
  }, [todoVal, setUpdatedTodo]);

  const onFinish = (values: any) => {
    console.log("onfiiiiiiiiiiiniiiish");
    console.log(values);
    const todo: Todos = {
      id: values.id,
      title: values.title,
    };
    setTodo(todo);
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
                label="id"
                name="id"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
                initialValue={isSubmitting === false && todo?.id}
                hidden={true}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="title"
                name="title"
                rules={[
                  { required: true, message: "Please input your title!" },
                ]}
                initialValue={isSubmitting === false && todo?.title}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-green-700"
                >
                  {FORM.EDIT}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </MasterLayout>
    </>
  );
}

export default EditTodoComponent;
