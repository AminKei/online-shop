import {
  Card,
  Tabs,
  Typography,
  Badge,
  Button,
  Empty,
  Space,
  message,
  Avatar,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  RightOutlined,
  ShoppingCartOutlined,
  SyncOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import api from "../../config/axios/axiosConfig";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Orders = () => {
  const navigate = useNavigate();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: () => api.get("/user/orders").then((res) => res.data),
  });

  // دسته‌بندی سفارشات بر اساس وضعیت
  const currentOrders = orders.filter(
    (o: any) => o.status === "PENDING" || o.status === "SHIPPED");
  const cancelledOrders = orders.filter((o: any) => o.status === "CANCELLED");
  const deliveredOrders = orders.filter((o: any) => o.status === "DELIVERED");
  const returnedOrders = orders.filter((o: any) => o.status === "RETURNED");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
      case "SHIPPED":
        return "#1890ff"; // آبی
      case "DELIVERED":
        return "#52c41a"; // سبز
      case "CANCELLED":
        return "#f5222d"; // قرمز
      case "RETURNED":
        return "#faad14"; // نارنجی
      default:
        return "#8c8c8c";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
      case "SHIPPED":
        return <SyncOutlined />;
      case "DELIVERED":
        return <CheckCircleOutlined />;
      case "CANCELLED":
        return <CloseCircleOutlined />;
      case "RETURNED":
        return <UndoOutlined />;
      default:
        return null;
    }
  };

  const renderOrderCard = (order: any) => (
    <Card
      style={{
        marginBottom: 16,
        borderRadius: 12,
      }}
      bodyStyle={{ padding: "16px" }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Text strong>سفارش #{order.id}</Text>
          <Space>
            {getStatusIcon(order.status)}
            <Text style={{ color: getStatusColor(order.status) }}>
              {order.status === "PENDING"
                ? "در انتظار پرداخت"
                : order.status === "SHIPPED"
                ? "در حال ارسال"
                : order.status === "DELIVERED"
                ? "تحویل شده"
                : order.status === "CANCELLED"
                ? "لغو شده"
                : order.status === "RETURNED"
                ? "مرجوع شده"
                : order.status}
            </Text>
          </Space>
        </div>

        <Text type="secondary">
          {new Date(order.createdAt).toLocaleDateString("fa-IR")}
        </Text>

        <Text strong style={{ fontSize: 16 }}>
          {order.total.toLocaleString()} تومان
        </Text>

        {/* محصولات سفارش (اولین محصول رو نشون می‌دیم) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 8,
          }}
        >
          <img
            src={
              order.items[0]?.product.image || "https://via.placeholder.com/60"
            }
            alt={order.items[0]?.product.name}
            style={{
              width: 60,
              height: 60,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
          <div>
            <Text>{order.items[0]?.product.name}</Text>
            <br />
            <Text type="secondary">
              {order.items.length > 1
                ? `و ${order.items.length - 1} کالا دیگر`
                : ""}
            </Text>
          </div>
        </div>

        <Button
          type="primary"
          block
          style={{ marginTop: 12, borderRadius: 8 }}
          onClick={() => message.info(`جزئیات سفارش #${order.id}`)}
        >
          مشاهده جزئیات
        </Button>
      </Space>
    </Card>
  );

  const renderEmpty = () => (
    <Empty description="سفارشی ثبت نشده است" style={{ marginTop: 60 }}>
      <Button type="primary" onClick={() => navigate("/")}>
        ادامه خرید
      </Button>
    </Empty>
  );

  return (
    <div style={{ padding: "0 1px", paddingBottom: 80, direction: "rtl" }}>
      {/* هدر آبی */}
      <div
        style={{
          background: "linear-gradient(135deg, #522bff, #1100ff)",
          display: "flex",
          color: "white",
          textAlign: "center",
          borderRadius: "10px",
          justifyContent: "space-between",
          height: "80px",
          marginBottom: "20px",
          padding: "20px 16px",
          alignItems: "center",
        }}
      >
        <Avatar
          size={40}
          icon={<ShoppingCartOutlined />}
          style={{
            backgroundColor: "#fff",
            color: "#0145ff",
          }}
        />

        <Title level={5} style={{ color: "white", marginTop: "7px" }}>
          سفارش‌های من
        </Title>
        <RightOutlined
          style={{ fontSize: 20, cursor: "pointer" }}
          className="rotate-180"
          onClick={() => navigate(-1)}
        />
      </div>

      {/* تب‌ها */}
      <Tabs defaultActiveKey="current"  style={{ marginBottom: 24 }}>
        <TabPane
          tab={
            <Badge count={currentOrders.length} offset={[10, 0]}>
              جاری ({currentOrders.length})
            </Badge>
          }
          key="current"
        >
          {currentOrders.length === 0
            ? renderEmpty()
            : currentOrders.map(renderOrderCard)}
        </TabPane>

        <TabPane tab={`لغوشده (${cancelledOrders.length})`} key="cancelled">
          {cancelledOrders.length === 0
            ? renderEmpty()
            : cancelledOrders.map(renderOrderCard)}
        </TabPane>

        <TabPane tab={`تحویل‌شده (${deliveredOrders.length})`} key="delivered">
          {deliveredOrders.length === 0
            ? renderEmpty()
            : deliveredOrders.map(renderOrderCard)}
        </TabPane>

        <TabPane tab={`مرجوعی (${returnedOrders.length})`} key="returned">
          {returnedOrders.length === 0
            ? renderEmpty()
            : returnedOrders.map(renderOrderCard)}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Orders;
