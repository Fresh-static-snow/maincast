import { Button, Layout, theme } from "antd";
import React, { FC, PropsWithChildren } from "react";
import { useAppSelector } from "../../redux/store";
import { useLogoutMutation } from "../../redux/api/auth.api";

const { Header, Content } = Layout;

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [logout] = useLogoutMutation();
  const { accessToken } = useAppSelector((s) => s.user);

  return (
    <Layout style={{ paddingBottom: "50px" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!!accessToken && (
          <Button type="primary" disabled={!accessToken}>
            Card pannel
          </Button>
        )}
        {!!accessToken && (
          <Button type="primary" danger onClick={() => logout({})}>
            Logout
          </Button>
        )}
      </Header>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};
