import {
  Card,
  Tabs,
  Typography,
  Badge,
  Button,
  Empty,
  Space,
  Avatar,
  Modal,
  Divider,
  List,
  Tooltip,
} from "antd";
import {
  RightOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  TruckOutlined,
  WalletOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../queries/order/useOrder";
import { getOrderStatusConfig } from "../../utils/order.utils";
import { useState } from "react";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const badgeColors: Record<string, string> = {
  PENDING: "#0a22ff",
  SHIPPED: "#ffb300",
  DELIVERED: "#1fc480",
  CANCELLED: "#d32f2f",
  RETURNED: "#8247e5",
};

const Orders = () => {
  const navigate = useNavigate();
  const { data: orders = [], isLoading } = useOrders();

  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

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
        style={{
          marginBottom: 16,
          borderRadius: 14,
        }}
        bodyStyle={{ padding: 16 }}
        hoverable
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Text strong style={{ fontSize: 15 }}>سفارش #{order.id}</Text>
            <Badge
              count={status.label}
              style={{
                fontWeight: "500",
                fontSize: 13,
              }}
              offset={[-12, 0]}
              icon={status.icon}
              showZero={false}
            />
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            margin: "6px 0 0 0"
          }}>
            <Avatar
              size={48}
              src={
                order.items[0]?.product.image ||
                "https://via.placeholder.com/60"
              }
              style={{
                border: "2px solid #f0f0fa",
                boxShadow: "0 2px 8px #f0f1ff4c",
                background: "#fcfcfc"
              }}
            />
            <div>
              <Text style={{ fontSize: 14 }} strong>{order.items[0]?.product.name}</Text>
              <br />
              {order.items.length > 1 && (
                <Text type="secondary" style={{ fontSize: 12 }}>
                  و {order.items.length - 1} کالا دیگر
                </Text>
              )}
            </div>
            <div style={{ flexGrow: 1 }} />
            <div style={{
              minWidth: 90,
              textAlign: "end",
              color: "#0145ff",
              fontWeight: 700,
              fontSize: 15,
            }}>
              {order.total.toLocaleString()} <span style={{ fontSize: 13 }}>تومان</span>
            </div>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 8,
            opacity: 0.85
          }}>
            <Text type="secondary" style={{ fontSize: 13 }}>
              {new Date(order.createdAt).toLocaleDateString("fa-IR")}
            </Text>
            <Button
              type="primary"
              size="middle"
              style={{
                marginTop: 0,
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

  if (isLoading)
    return <div className="text-center p-10">در حال بارگذاری...</div>;

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
          style={{ backgroundColor: "#fff", color: "#0145ff", border: "1.5px solid #ffffff88" }}
        />

        <Title level={5} style={{ color: "white", margin: 0, letterSpacing: 0 }}>
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

      <div style={{
        background: "white",
        borderRadius: 10,
        margin: "0 0 18px 0",
        padding: "0.5em 0.5em"
      }}>
        <Tabs defaultActiveKey="current" centered tabBarGutter={24}>
          <TabPane
            tab={<Badge count={currentOrders.length} style={{
              background: badgeColors.PENDING,
              color: "#ffffff", fontWeight: 500
            }}>جاری</Badge>}
            key="current"
          >
            {currentOrders.length === 0
              ? renderEmpty()
              : currentOrders.map(renderOrderCard)}
          </TabPane>

          <TabPane tab={<Badge count={cancelledOrders.length} style={{
            background: badgeColors.CANCELLED,
            color: "#fff",
            fontWeight: 500,
          }}>لغوشده</Badge>} key="cancelled">
            {cancelledOrders.length === 0
              ? renderEmpty()
              : cancelledOrders.map(renderOrderCard)}
          </TabPane>

          <TabPane tab={<Badge count={deliveredOrders.length} style={{
            background: badgeColors.DELIVERED,
            color: "#fff", fontWeight: 500
          }}>تحویل‌شده</Badge>} key="delivered">
            {deliveredOrders.length === 0
              ? renderEmpty()
              : deliveredOrders.map(renderOrderCard)}
          </TabPane>

          <TabPane tab={<Badge count={returnedOrders.length} style={{
            background: badgeColors.RETURNED,
            color: "#fff", fontWeight: 500
          }}>مرجوعی</Badge>} key="returned">
            {returnedOrders.length === 0
              ? renderEmpty()
              : returnedOrders.map(renderOrderCard)}
          </TabPane>
        </Tabs>
      </div>
      {/* ===== Modal جزئیات سفارش ===== */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        closable={false}
        centered
        maskClosable
        title={null}
        width={380}
        bodyStyle={{
          padding: 0,
          borderRadius: 15,
          overflow: "hidden",
        }}
        style={{
          marginTop: 16,
          direction: "rtl",
          borderRadius: 14,
        }}
      >
        {selectedOrder && (
          <div
            style={{
              maxHeight: 500,
              overflowY: "auto",
              borderRadius: 14,
              padding: "18px 12px 12px 12px",
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: 8,
              borderBottom: "1px solid #eeeeff",
              marginBottom: 12,
              justifyContent: "space-between",
              background: "white",
              borderRadius: 10,
              padding: "8px 10px"
            }}>
              <Text strong style={{ fontSize: 15 }}>جزئیات سفارش</Text>
              <Button
                icon={<RightOutlined className="rotate-180" />}
                shape="circle"
                type="text"
                onClick={() => setOpen(false)}
                style={{ background: "#ffffff", color: "#001eff", border:"solid 1px #eeee" }}
              />
            </div>
            <Space direction="vertical" style={{ width: "100%" }} size={14}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text strong>شماره سفارش:</Text>
                <Text>#{selectedOrder.id}</Text>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text strong>وضعیت:</Text>
                <Text
                  style={{
                    color: getOrderStatusConfig(selectedOrder.status).color,
                    fontWeight: 500
                  }}
                >
                  {getOrderStatusConfig(selectedOrder.status).label}
                </Text>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text strong>تاریخ ثبت:</Text>
                <Text>
                  {new Date(selectedOrder.createdAt).toLocaleDateString("fa-IR")}
                </Text>
              </div>

              <Divider style={{ margin: "6px 0" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <HomeOutlined style={{ color: "#6f44ff" }} />
                <Text strong>آدرس تحویل</Text>
              </div>
              <Text type="secondary" style={{ fontSize: 13, lineHeight: 2 }}>
                {selectedOrder.address?.province}، {selectedOrder.address?.city}،{" "}
                {selectedOrder.address?.street}، پلاک {selectedOrder.address?.plaque}
                <br />
                کد پستی: {selectedOrder.address?.postalCode}
              </Text>

              <Divider style={{ margin: "6px 0" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <TruckOutlined style={{ color: "#6f44ff" }} />
                <Text strong>روش ارسال</Text>
              </div>
              <Text type="secondary" style={{ fontSize: 13 }}>
                {selectedOrder.shippingType === "express" ? "ارسال فوری" : "ارسال عادی"}
              </Text>
              <Divider style={{ margin: "6px 0" }} />

              <Text strong style={{ fontSize: 14 }}>کالاهای سفارش</Text>

              <List
                dataSource={selectedOrder.items}
                style={{
                  background: "#fcfcfc",
                  borderRadius: 10,
                  padding: "6px 0"
                }}
                split={false}
                renderItem={(item: any) => (
                  <List.Item
                    style={{ padding: "8px 0", border: 0, alignItems: "center" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <Avatar
                        shape="square"
                        size={44}
                        src={item.product.image}
                        style={{
                          background: "#fafaff",
                          borderRadius: 8,
                          border: "1px solid #f1f3fc"
                        }}
                      />
                      <div style={{ marginRight: 4, minWidth: 0 }}>
                        <Text
                          strong
                          style={{ fontSize: 13 }}
                          ellipsis={{ tooltip: item.product.name }}
                        >
                          {item.product.name}
                        </Text>
                        <div>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            تعداد: {item.quantity}
                          </Text>
                          {item.product.gender &&
                            <span style={{ marginRight: 10, fontSize: 12 }}>
                              {" "}|{" "}
                              <span style={{ color: "#666" }}>
                                مناسب: {item.product.gender === "MEN" ? "مردانه" : "زنانه"}
                              </span>
                            </span>
                          }
                          {item.product.category &&
                            <span style={{ marginRight: 10, fontSize: 12 }}>
                              | دسته: {item.product.category}
                            </span>
                          }
                        </div>
                      </div>
                    </div>
                    <div style={{ color: "#4979ff", fontWeight: 700, fontSize: 12,  }}>
                      {(item.product.price * item.quantity).toLocaleString()} <span style={{ fontWeight: 400 }}>تومان</span>
                    </div>
                  </List.Item>
                )}
              />
              <Divider style={{ margin: "6px 0" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <WalletOutlined style={{ color: "#6f44ff" }} />
                <Text strong>مبلغ نهایی</Text>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
                <Text strong>جمع کل</Text>
                <Text strong style={{ color: "#000000" }}>
                  {selectedOrder.total.toLocaleString()} <span style={{ fontWeight: 400 }}>تومان</span>
                </Text>
              </div>
              <Button
                block
                icon={<ShareAltOutlined />}
                style={{
                  marginTop: 10,
                  borderRadius: 8,
                  fontWeight: 500,
                  height: 38,
                  fontSize: 15,
                }}
              >
                اشتراک‌گذاری سفارش
              </Button>
            </Space>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
