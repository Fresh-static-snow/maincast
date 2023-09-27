import { Button, Form, Input, Spin } from "antd";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { useLoginMutation, useRefreshMutation } from "../../redux/api/auth.api";
import { useAppSelector } from "../../redux/store";
import { RoutesList } from "../../routes/pages";
import { queryWrapper } from "../../utils/queryWrapper";

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const navigation = useLocation();

  const { accessToken } = useAppSelector((s) => s.user);

  const [loginWithEmail, { isLoading: isLoadingLoginWithEmail }] =
    useLoginMutation();
  const [refreshAccessToken, { isLoading: isLoadingRefreshAccessToken }] =
    useRefreshMutation();

  const isShowLoader = useMemo(
    () => isLoadingLoginWithEmail || isLoadingRefreshAccessToken,
    [isLoadingLoginWithEmail, isLoadingRefreshAccessToken]
  );

  const onFinish = async (values: { email: string; password: string }) => {
    await queryWrapper(
      async () => {
        return await loginWithEmail(values).unwrap();
      },
      true,
      false
    );
  };

  const redirectOrTryRefresh = useCallback(async () => {
    if (accessToken) {
      const redirectPath = navigation?.state?.from;
      if (redirectPath && redirectPath !== RoutesList.login.path) {
        navigate(navigation.state.from);
      } else {
        navigate(RoutesList.main.path);
      }
    } else {
      await refreshAccessToken({});
    }
  }, [accessToken, navigation, navigate, refreshAccessToken]);

  useEffect(() => {
    redirectOrTryRefresh();
  }, [redirectOrTryRefresh]);

  if (isShowLoader) {
    return (
      <Spin
        size="large"
        spinning={true}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      style={{ maxWidth: 600, margin: "0 auto" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
