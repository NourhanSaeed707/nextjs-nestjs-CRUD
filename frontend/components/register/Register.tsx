import React from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { UserType } from "../../types/users";
import { useRouter } from "next/router";
import useAddUser from "../../hooks/user/addUser";
import { FORM } from "../../constants/text";
import MasterLayout from "../layout/MasterLayout";

function Register() {
  const router = useRouter();
  const { setUserData, storeError, storeResponse } = useAddUser();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    const user: UserType = {
      id: values.id,
      name: values.name,
      username: values.username,
      password: values.password,
    };
    setUserData(user);
    router.push("/");
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
                label="name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="password"
                name="password"
                rules={[
                  { required: true, message: "Please input your salary!" },
                ]}
              >
                <Input.Password />
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

export default Register;
