import { Card, Form, Input, Button, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../queries/auth/useLogin";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin(() => navigate("/"));

  return (
    <div className="max-w-md mx-auto mt-6 px-4" dir="rtl">
      <Card className="rounded-xl ">
        <Title level={5} className="text-center mb-10">
          ورود به فروشگاه
        </Title>

        <Form
          name="login"
          onFinish={(values) => loginMutation.mutate(values)}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "ایمیل را وارد کنید" },
              { type: "email", message: "ایمیل معتبر نیست" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="ایمیل" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "رمز عبور را وارد کنید" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="رمز عبور" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loginMutation.isPending}
            >
              ورود
            </Button>
          </Form.Item>

          <div className="text-center text-sm">
            حساب ندارید؟{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-500 cursor-pointer"
            >
              ثبت‌نام کنید
            </span>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
