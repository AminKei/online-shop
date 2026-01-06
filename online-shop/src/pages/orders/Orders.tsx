import {
  Card,
  Tabs,
  Typography,
  Badge,
  Button,
  Empty,
  Space,
  Avatar,
  Tooltip,
  Image,
} from "antd";
import { RightOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../queries/order/useOrder";
import { getOrderStatusConfig } from "../../utils/OrderUtils";
import { useState } from "react";
import OrderDetailModal from "../../components/layout/order-detail-modal/OrderDetailModal";
import { badgeColors } from "../../utils/‌‌BadgeColors";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Orders = () => {
  const navigate = useNavigate();
  const { data: orders = [], isLoading } = useOrders();

  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // فیلتر سفارش‌ها بر اساس وضعیت
  const currentOrders = orders.filter(
    (o: any) => o.status === "PENDING" || o.status === "SHIPPED"
  );
  const cancelledOrders = orders.filter((o: any) => o.status === "CANCELLED");
  const deliveredOrders = orders.filter((o: any) => o.status === "DELIVERED");
  const returnedOrders = orders.filter((o: any) => o.status === "RETURNED");

  const renderOrderCard = (order: any) => {
    const status = getOrderStatusConfig(order.status);

    return (
      <Card
        key={order.id}
        style={{ marginBottom: 16, borderRadius: 14 }}
        bodyStyle={{ padding: 16 }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text strong style={{ fontSize: 15 }}>
              سفارش #{order.id}
            </Text>
            <Badge
              count={status.label}
              style={{ fontWeight: "500", fontSize: 13 }}
              offset={[-12, 0]}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              margin: "6px 0 0 0",
            }}
          >
            <Image
              width={60}
              src={
                order.items[0]?.product.image ||
                "https://via.placeholder.com/60"
              }
            />
            <div>
              <Text strong style={{ fontSize: 14 }}>
                {order.items[0]?.product.name}
              </Text>
              <br />
              {order.items.length > 1 && (
                <Text type="secondary" style={{ fontSize: 12 }}>
                  و {order.items.length - 1} کالا دیگر
                </Text>
              )}
            </div>
            <div style={{ flexGrow: 1 }} />
            <div
              style={{
                minWidth: 90,
                textAlign: "end",
                color: "#5280ff",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {order.total.toLocaleString()}{" "}
              <span style={{ fontSize: 13 }}>تومان</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 8,
              opacity: 0.85,
            }}
          >
            <Text type="secondary" style={{ fontSize: 13 }}>
              {new Date(order.createdAt).toLocaleDateString("fa-IR")}
            </Text>
            <Button
              type="primary"
              size="middle"
              style={{
                borderRadius: 7,
                fontWeight: 600,
              }}
              onClick={() => {
                setSelectedOrder(order);
                setOpen(true);
              }}
            >
              مشاهده جزئیات
            </Button>
          </div>
        </Space>
      </Card>
    );
  };

  const renderEmpty = () => (
    <Empty description="سفارشی ثبت نشده است" style={{ marginTop: 60 }}>
      <Button type="primary" onClick={() => navigate("/")}>
        ادامه خرید
      </Button>
    </Empty>
  );

  if (isLoading) {
    return <div className="text-center p-10">در حال بارگذاری...</div>;
  }

  return (
    <div style={{ paddingBottom: 80, minHeight: "100vh" }} dir="rtl">
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #522bff, #1100ff)",
          display: "flex",
          color: "white",
          borderRadius: 12,
          justifyContent: "space-between",
          height: 72,
          marginBottom: 18,
          padding: "16px 18px",
          alignItems: "center",
        }}
      >
        <Avatar
          size={38}
          icon={<ShoppingCartOutlined />}
          style={{
            backgroundColor: "#fff",
            color: "#0145ff",
            border: "1.5px solid #ffffff88",
          }}
        />
        <Title
          level={5}
          style={{ color: "white", margin: 0, letterSpacing: 0 }}
        >
          سفارش‌های من
        </Title>
        <Tooltip title="بازگشت">
          <RightOutlined
            className="rotate-180 cursor-pointer"
            style={{ fontSize: 22 }}
            onClick={() => navigate(-1)}
          />
        </Tooltip>
      </div>

      {/* Tabs */}
      <div
        style={{
          background: "white",
          borderRadius: 10,
          margin: "0 0 18px 0",
          padding: "0.5em 0.5em",
        }}
      >
        <Tabs defaultActiveKey="current" centered tabBarGutter={24}>
          <TabPane
            tab={
              <Badge
                count={currentOrders.length}
                style={{
                  background: badgeColors.PENDING,
                  color: "#ffffff",
                  fontWeight: 500,
                }}
              >
                جاری
              </Badge>
            }
            key="current"
          >
            {currentOrders.length === 0
              ? renderEmpty()
              : currentOrders.map(renderOrderCard)}
          </TabPane>

          <TabPane
            tab={
              <Badge
                count={cancelledOrders.length}
                style={{
                  background: badgeColors.CANCELLED,
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                لغوشده
              </Badge>
            }
            key="cancelled"
          >
            {cancelledOrders.length === 0
              ? renderEmpty()
              : cancelledOrders.map(renderOrderCard)}
          </TabPane>

          <TabPane
            tab={
              <Badge
                count={deliveredOrders.length}
                style={{
                  background: badgeColors.DELIVERED,
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                تحویل‌شده
              </Badge>
            }
            key="delivered"
          >
            {deliveredOrders.length === 0
              ? renderEmpty()
              : deliveredOrders.map(renderOrderCard)}
          </TabPane>

          <TabPane
            tab={
              <Badge
                count={returnedOrders.length}
                style={{
                  background: badgeColors.RETURNED,
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                مرجوعی
              </Badge>
            }
            key="returned"
          >
            {returnedOrders.length === 0
              ? renderEmpty()
              : returnedOrders.map(renderOrderCard)}
          </TabPane>
        </Tabs>
      </div>

      <OrderDetailModal
        open={open}
        onClose={() => setOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default Orders;
