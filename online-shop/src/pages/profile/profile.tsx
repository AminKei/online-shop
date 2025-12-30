import {
  Card,
  List,
  Avatar,
  Button,
  Typography,
  Badge,
  Space,
  Divider,
} from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  CreditCardOutlined,
  CustomerServiceOutlined,
  LogoutOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useEffect } from "react";
import { useUserProfile } from "../../queries/user/useUserProfile";
import { useUserOrders } from "../../queries/user/useUserOrders";

const { Title, Text } = Typography;

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { data: user } = useUserProfile(!!token);
  const { data: orders = [] } = useUserOrders(!!token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("با موفقیت خارج شدید");
    navigate("/login");
  };

  const activeOrders = orders.filter(
    (o: any) => o.status !== "DELIVERED"
  ).length;

  const menuItems = [
    {
      icon: <ShoppingCartOutlined />,
      title: "سفارش‌های من",
      desc: "مشاهده وضعیت سفارشات",
      badge: activeOrders > 0 ? activeOrders : null,
      onClick: () => navigate("/orders"),
    },
    {
      icon: <HeartOutlined />,
      title: "علاقه‌مندی‌ها",
      desc: "محصولات ذخیره شده",
      onClick: () => navigate("/favorites"),
    },
    {
      icon: <CreditCardOutlined />,
      title: "آدرس‌های من",
      desc: "مدیریت آدرس تحویل",
      onClick: () => message.info("به زودی اضافه می‌شود"),
    },
    {
      icon: <CustomerServiceOutlined />,
      title: "پشتیبانی",
      desc: "تماس با ما و سوالات",
      onClick: () => navigate("/support"),
    },
  ];

  return (
    <div style={{ paddingBottom: 80, direction: "rtl" }}>
      {/* هدر */}
      <div
        style={{
          background: "linear-gradient(135deg, #522bff, #1100ff)",
          color: "white",
          padding: "20px 16px",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        <Space
          align="center"
          style={{ justifyContent: "space-between", width: "100%" }}
        >
          <Avatar
            size={40}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#fff", color: "#0145ff" }}
          />
          <Title level={4} style={{ margin: 0, color: "white" }}>
            پروفایل
          </Title>
          <RightOutlined
            style={{ fontSize: 20, cursor: "pointer" }}
            className="rotate-180"
            onClick={() => navigate(-1)}
          />
        </Space>
      </div>

      {/* کارت کاربر */}
      <Card style={{ marginTop: 10, borderRadius: 16, textAlign: "center" }}>
        <Avatar
          size={70}
          icon={<UserOutlined />}
          style={{
            backgroundColor: "#d7e7ff",
            color: "#003afa",
            marginBottom: 12,
          }}
        />
        <Title level={4} style={{ margin: "8px 0" }}>
          {user?.name || "کاربر مهمان"}
        </Title>
        <Text type="secondary">{user?.email || "مهمان"}</Text>
        <Divider />
        <Text type="secondary">عضو از اردیبهشت ۱۴۰۴</Text>
      </Card>

      {/* سفارش فعال */}
      {activeOrders > 0 && (
        <Card
          style={{
            margin: "0 16px 24px",
            borderRadius: 16,
            border: "1px solid #d9f7be",
            background: "#f6ffed",
          }}
        >
          <Space>
            <Badge status="success" dot />
            <Text strong>{activeOrders} سفارش فعال دارید</Text>
          </Space>
        </Card>
      )}

      <List
        itemLayout="horizontal"
        dataSource={menuItems}
        renderItem={(item) => (
          <List.Item
            onClick={item.onClick}
            style={{
              padding: "12px 16px",
              cursor: "pointer",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <List.Item.Meta
              avatar={
                <div style={{ fontSize: 22, color: "#0099ff" }}>
                  {item.icon}
                </div>
              }
              title={
                <Space
                  style={{ justifyContent: "space-between", width: "100%" }}
                >
                  <Text strong>{item.title}</Text>
                  {item.badge && (
                    <Badge
                      count={item.badge}
                      style={{ backgroundColor: "#f5222d" }}
                    />
                  )}
                </Space>
              }
              description={<Text type="secondary">{item.desc}</Text>}
            />
            <LeftOutlined style={{ color: "#bbb" }} />
          </List.Item>
        )}
      />

      {/* خروج */}
      <div style={{ padding: "24px 16px" }}>
        <Button
          danger
          block
          size="large"
          icon={<LogoutOutlined />}
          style={{ borderRadius: 12, height: 48 }}
          onClick={handleLogout}
        >
          خروج از حساب
        </Button>
      </div>
    </div>
  );
};

export default Profile;
