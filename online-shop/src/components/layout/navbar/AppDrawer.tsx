import {
  ShopOutlined,
  ShoppingCartOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Drawer, Button, Collapse, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;
const { Text } = Typography;

interface AppDrawerProps {
  visible: boolean;
  onClose: () => void;
  token: string | null;
}

export default function AppDrawer({ visible, onClose, token }: AppDrawerProps) {
  const navigate = useNavigate();

  const goTo = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    goTo("/login");
  };

  return (
    <Drawer
      title={
        <Text strong className="text-lg text-right">
          منو فروشگاه
        </Text>
      }
      placement="right"
      open={visible}
      onClose={onClose}
      width={320}
      bodyStyle={{ padding: 16 }}
    >
      <div className="py-4 text-center">
        <Button
          type="primary"
          block
          size="large"
          onClick={() => goTo(token ? "/profile" : "/login")}
        >
          {token ? "ثبت فروشگاه" : "ورود / ثبت نام"}
        </Button>
      </div>

      <Collapse ghost accordion className="text-right">
        {/* فروشگاه */}
        <Panel
          key="1"
          header={
            <span className="font-semibold flex flex-row-reverse items-center gap-2">
              <ShopOutlined className="text-[#5e7bff]" />
              فروشگاه
            </span>
          }
          className="mb-3 rounded-lg bg-gray-50"
        >
          <div className="flex flex-col gap-2 border-r-2 border-gray-300 pr-4 mr-2 ">
            <Button type="text" className="text-right">
              مشاهده سفارشات
            </Button>
            <Button type="text" className="text-right">
              سفارشات در حال ارسال
            </Button>
          </div>
        </Panel>

        {/* سفارشات من */}
        <Panel
          key="2"
          header={
            <span className="font-semibold flex flex-row-reverse items-center gap-2">
              <ShoppingCartOutlined className="text-[#5e7bff]" />
              سفارشات من
            </span>
          }
          className="mb-3 rounded-lg bg-gray-50"
        >
          <div className="flex flex-col gap-2 border-r-2 border-gray-300 pr-4 mr-2">
            <Button type="text" className="text-right">
              مشاهده سفارشات
            </Button>
            <Button type="text" className="text-right">
              سفارشات در حال ارسال
            </Button>
          </div>
        </Panel>

        {/* پشتیبانی */}
        <Panel
          key="3"
          header={
            <span className="font-semibold flex flex-row-reverse items-center gap-2">
              <QuestionCircleOutlined className="text-[#5e7bff]" />
              پشتیبانی
            </span>
          }
          className="mb-3 rounded-lg bg-gray-50"
        >
          <div className="flex flex-col gap-2 border-r-2 border-gray-300 pr-4 mr-2">
            <Button type="text" className="text-right">
              تماس با ما
            </Button>
            <Button type="text" className="text-right">
              سوالات متداول
            </Button>
            <Button type="text" className="text-right">
              شرایط و قوانین
            </Button>
          </div>
        </Panel>
      </Collapse>

      {/* خروج */}
      {token && (
        <div className="w-[80%] p-2">
          <Button
            danger
            size="middle"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{
              position: "fixed",
              bottom: "100px",
              // width: "100%",
              height: "40px",
            }}
          >
            خروج از حساب
          </Button>
        </div>
      )}
    </Drawer>
  );
}
