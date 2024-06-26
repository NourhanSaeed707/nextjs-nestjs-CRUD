import React, { ReactNode } from "react";
import { Layout } from "antd";
import NavBar from "./NavBar";

type Props = {
  children: ReactNode;
};
function MasterLayout({ children }: Props) {
  return (
    <Layout>
      <Layout.Header className="w-full ">
        <NavBar />
      </Layout.Header>
      <Layout.Content className="mt-5 h-screen">{children}</Layout.Content>
    </Layout>
  );
}

export default MasterLayout;
