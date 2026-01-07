import { Card, Form, Input, Button, Typography } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../queries/auth/useRegister";

const { Title } = Typography;

const Signup = () => {
  const navigate = useNavigate();

  const registerMutation = useRegister(() => {
    navigate("/");
  });

  return (
    <div dir="rtl">
      <Card className="rounded-xl">
        <Title level={5} className="text-center mb-1">
          ثبت‌نام در فروشگاه
        </Title>

        <Form
          name="signup"
          onFinish={(values) => registerMutation.mutate(values)}
          layout="vertical"
          size="large"
          className="mt-10"
        >
          <Form.Item name="name">
            <Input prefix={<UserOutlined />} placeholder="نام (اختیاری)" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "لطفاً ایمیل خود را وارد کنید" },
              { type: "email", message: "ایمیل معتبر نیست" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="ایمیل" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "لطفاً رمز عبور را وارد کنید" },
              { min: 6, message: "رمز عبور باید حداقل ۶ کاراکتر باشد" },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="رمز عبور" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "تأیید رمز عبور را وارد کنید" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("رمزهای عبور مطابقت ندارند"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="تأیید رمز عبور"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={registerMutation.isPending}
            >
              ثبت‌نام
            </Button>
          </Form.Item>

          <div className="text-center text-sm">
            قبلاً حساب دارید؟{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer"
            >
              وارد شوید
            </span>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
