import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Form, Button, Input, Switch, Checkbox } from "antd";
import { LoginUser } from "../../types/users";
import Link from "next/link";
import { FORM } from "../../constants/text";
import MasterLayout from "../layout/MasterLayout";

function Login() {
  const { login, isSubmitting } = useAuth();

  const onFinish = (values: LoginUser) => {
    console.log("vaaaaaaalues:");
    console.log(values);
    login(values);
  };

  return (
    <MasterLayout>
      <div className="bg-red-300 w-fit h-fit  rounded-[25px] mx-auto my-44">
        <div className="h-fit flex items-center justify-center p-11">
          <Form onFinish={onFinish}>
            <Form.Item
              className="main-form-input form-font"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please Enter email",
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Please Enter email" required name="email" />
            </Form.Item>
            <Form.Item
              className="main-form-input form-font"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please Enter password",
                },
              ]}
            >
              <Input.Password
                placeholder="Please Enter password"
                required
                name="password"
                type="password"
              />
            </Form.Item>

            <div className="mt-4 flex justify-between"></div>
            <div className="flex justify-center items-center mt-5">
              <Button
                loading={isSubmitting}
                htmlType="submit"
                className="w-full flex justify-center bg-green-800 text-white rounded-full h-auto py-[10px]"
              >
                {FORM.LOGIN}
              </Button>
            </div>
            <div className="flex justify-center gap-2 mt-3">
              <h2 className="text-[#363940] form-font">Do not have account?</h2>
              <Link href="/register" className="text-nobooghSecondary">
                <span className="cursor-pointer text-white form-font">
                  {FORM.REGISTER}
                </span>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </MasterLayout>
  );
}

export default Login;
