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
} from "antd";
import {
  RightOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  TruckOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../queries/order/useOrder";
import { getOrderStatusConfig } from "../../utils/order.utils";
import { useState } from "react";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

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
      <Card key={order.id} style={{ marginBottom: 16, borderRadius: 12 }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <div className="flex justify-between">
            <Text strong>سفارش #{order.id}</Text>
            <Space>
              {status.icon}
              <Text style={{ color: status.color }}>{status.label}</Text>
            </Space>
          </div>

          <Text type="secondary">
            {new Date(order.createdAt).toLocaleDateString("fa-IR")}
          </Text>

          <Text strong style={{ fontSize: 16 }}>
            {order.total.toLocaleString()} تومان
          </Text>

          <div className="flex items-center gap-3 mt-2">
            <img
              src={
                order.items[0]?.product.image ||
                "https://via.placeholder.com/60"
              }
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
              {order.items.length > 1 && (
                <Text type="secondary">
                  و {order.items.length - 1} کالا دیگر
                </Text>
              )}
            </div>
          </div>

          <Button
            type="primary"
            block
            style={{ marginTop: 12 }}
            onClick={() => {
              setSelectedOrder(order);
              setOpen(true);
            }}
          >
            مشاهده جزئیات
          </Button>
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
    <div style={{ paddingBottom: 80 }} dir="rtl">
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #522bff, #1100ff)",
          display: "flex",
          color: "white",
          borderRadius: 10,
          justifyContent: "space-between",
          height: 80,
          marginBottom: 20,
          padding: "20px 16px",
          alignItems: "center",
        }}
      >
        <Avatar
          size={40}
          icon={<ShoppingCartOutlined />}
          style={{ backgroundColor: "#fff", color: "#0145ff" }}
        />

        <Title level={5} style={{ color: "white", margin: 0 }}>
          سفارش‌های من
        </Title>

        <RightOutlined
          className="rotate-180 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>

      <Tabs defaultActiveKey="current">
        <TabPane
          tab={<Badge count={currentOrders.length}>جاری</Badge>}
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

      {/* ===== Modal جزئیات سفارش ===== */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title="جزئیات سفارش"
        width={600}
        height={900}
        style={{ marginTop: "-12vh", direction: "rtl", overflow: "scroll" }}
      >
        {selectedOrder && (
          <Space direction="vertical" style={{ width: "100%" }}>
            <div className="flex justify-between">
              <Text strong>شماره سفارش</Text>
              <Text>#{selectedOrder.id}</Text>
            </div>

            <div className="flex justify-between">
              <Text strong>وضعیت</Text>
              <Text
                style={{
                  color: getOrderStatusConfig(selectedOrder.status).color,
                }}
              >
                {getOrderStatusConfig(selectedOrder.status).label}
              </Text>
            </div>

            <div className="flex justify-between">
              <Text strong>تاریخ ثبت</Text>
              <Text>
                {new Date(selectedOrder.createdAt).toLocaleDateString("fa-IR")}
              </Text>
            </div>

            <Divider />

            <Space>
              <HomeOutlined />
              <Text strong>آدرس تحویل</Text>
            </Space>

            <Text type="secondary">
              {selectedOrder.address?.province}، {selectedOrder.address?.city}،{" "}
              {selectedOrder.address?.street}، پلاک{" "}
              {selectedOrder.address?.plaque}
              <br />
              کد پستی: {selectedOrder.address?.postalCode}
            </Text>

            <Divider />

            <Space>
              <TruckOutlined />
              <Text strong>روش ارسال</Text>
            </Space>

            <Text type="secondary">
              {selectedOrder.shippingType === "express"
                ? "ارسال فوری"
                : "ارسال عادی"}
            </Text>

            <Divider />

            <Text strong>کالاهای سفارش</Text>

            <List
              dataSource={selectedOrder.items}
              renderItem={(item: any) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <img
                        src={item.product.image}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                    }
                    title={item.product.name}
                    description={
                      <>
                        <Text type="secondary">تعداد: {item.quantity}</Text>
                        {item.product.gender && (
                          <>
                            <br />
                            <Text type="secondary">
                              مناسب:{" "}
                              {item.product.gender === "MEN"
                                ? "مردانه"
                                : "زنانه"}
                            </Text>
                          </>
                        )}
                        {item.product.category && (
                          <>
                            <br />
                            <Text type="secondary">
                              دسته‌بندی: {item.product.category}
                            </Text>
                          </>
                        )}
                      </>
                    }
                  />
                  <Text>
                    {(item.product.price * item.quantity).toLocaleString()}{" "}
                    تومان
                  </Text>
                </List.Item>
              )}
            />

            <Divider />

            <Space>
              <WalletOutlined />
              <Text strong>مبلغ نهایی</Text>
            </Space>

            <div className="flex justify-between text-lg">
              <Text strong>جمع کل</Text>
              <Text strong className="text-red-500">
                {selectedOrder.total.toLocaleString()} تومان
              </Text>
            </div>
            <Button block type="primary">
              اشتراک گذاری{" "}
            </Button>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
