import {
  Modal,
  Space,
  Typography,
  Divider,
  List,
  Avatar,
  Button,
} from "antd";
import {
  HomeOutlined,
  TruckOutlined,
  WalletOutlined,
  ShareAltOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { getOrderStatusConfig } from "../../../utils/OrderUtils";

const { Text } = Typography;

interface OrderDetailModalProps {
  open: boolean;
  onClose: () => void;
  order: any; // می‌تونی اینجا یک interface دقیق‌تر برای order تعریف کنی
}

const OrderDetailModal = ({ open, onClose, order }: OrderDetailModalProps) => {
  if (!order) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      maskClosable
      title={null}
      width={380}
      bodyStyle={{ padding: 0, borderRadius: 15, overflow: "hidden" }}
      style={{ marginTop: 16, direction: "rtl", borderRadius: 14 }}
    >
      <div
        style={{
          maxHeight: 500,
          overflowY: "auto",
          borderRadius: 14,
          padding: "18px 12px 12px 12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingBottom: 8,
            borderBottom: "1px solid #eeeeff",
            marginBottom: 12,
            justifyContent: "space-between",
            background: "white",
            borderRadius: 10,
            padding: "8px 10px",
          }}
        >
          <Text strong style={{ fontSize: 15 }}>
            جزئیات سفارش
          </Text>
          <Button
            icon={<RightOutlined className="rotate-180" />}
            shape="circle"
            type="text"
            onClick={onClose}
            style={{
              background: "#ffffff",
              color: "#001eff",
              border: "solid 1px #eeee",
            }}
          />
        </div>

        <Space direction="vertical" style={{ width: "100%" }} size={14}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text strong>شماره سفارش:</Text>
            <Text>#{order.id}</Text>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text strong>وضعیت:</Text>
            <Text
              style={{
                color: getOrderStatusConfig(order.status).color,
                fontWeight: 500,
              }}
            >
              {getOrderStatusConfig(order.status).label}
            </Text>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text strong>تاریخ ثبت:</Text>
            <Text>{new Date(order.createdAt).toLocaleDateString("fa-IR")}</Text>
          </div>

          <Divider style={{ margin: "6px 0" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <HomeOutlined style={{ color: "#6f44ff" }} />
            <Text strong>آدرس تحویل</Text>
          </div>
          <Text type="secondary" style={{ fontSize: 13, lineHeight: 2 }}>
            {order.address?.province}، {order.address?.city}،{" "}
            {order.address?.street}، پلاک {order.address?.plaque}
            <br />
            کد پستی: {order.address?.postalCode}
          </Text>

          <Divider style={{ margin: "6px 0" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <TruckOutlined style={{ color: "#6f44ff" }} />
            <Text strong>روش ارسال</Text>
          </div>
          <Text type="secondary" style={{ fontSize: 13 }}>
            {order.shippingType === "express" ? "ارسال فوری" : "ارسال عادی"}
          </Text>

          <Divider style={{ margin: "6px 0" }} />

          <Text strong style={{ fontSize: 14 }}>
            کالاهای سفارش
          </Text>

          <List
            dataSource={order.items}
            style={{
              background: "#fcfcfc",
              borderRadius: 10,
              padding: "6px 0",
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
                      border: "1px solid #f1f3fc",
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
                      {item.product.gender && (
                        <span style={{ marginRight: 10, fontSize: 12 }}>
                          {" | "}
                          <span style={{ color: "#666" }}>
                            مناسب:{" "}
                            {item.product.gender === "MEN" ? "مردانه" : "زنانه"}
                          </span>
                        </span>
                      )}
                      {item.product.category && (
                        <span style={{ marginRight: 10, fontSize: 12 }}>
                          | دسته: {item.product.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  style={{ color: "#0044ff", fontWeight: 700, fontSize: 12 }}
                >
                  {(item.product.price * item.quantity).toLocaleString()}{" "}
                  <span style={{ fontWeight: 400 }}>تومان</span>
                </div>
              </List.Item>
            )}
          />

          <Divider style={{ margin: "6px 0" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <WalletOutlined style={{ color: "#6f44ff" }} />
            <Text strong>مبلغ نهایی</Text>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 15,
            }}
          >
            <Text strong>جمع کل</Text>
            <Text strong style={{ color: "#000000" }}>
              {order.total.toLocaleString()}{" "}
              <span style={{ fontWeight: 400 }}>تومان</span>
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
    </Modal>
  );
};

export default OrderDetailModal;
