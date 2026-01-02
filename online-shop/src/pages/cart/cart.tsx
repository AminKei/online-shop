import {
  Card,
  Button,
  Typography,
  Space,
  Input,
  Empty,
  Divider,
  Badge,
  message,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../queries/cart/useCart";
import { useRemoveCartItem } from "../../queries/cart/useRemoveCart";

const { Title, Text } = Typography;

const Cart = () => {
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState("");

  const { data: cart = [], isLoading } = useCart();
  const removeItem = useRemoveCartItem();

  const applyDiscount = () => {
    if (discountCode.trim()) {
      message.success("کد تخفیف اعمال شد!");
      setDiscountCode("");
    } else {
      message.warning("لطفاً کد را وارد کنید");
    }
  };

  const total =
    cart?.reduce(
      (sum: number, item: any) => sum + (item.product.price * (100 - item.product.discount) / 100) * item.quantity,
      0
    ) || 0;

  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: 60 }}>در حال بارگذاری...</div>
    );

  if (!cart.length) {
    return (
      <Empty description="سبد خرید شما خالی است" style={{ marginTop: 100 }}>
        <Button type="primary" size="large" onClick={() => navigate("/")}>
          ادامه خرید
        </Button>
      </Empty>
    );
  }

  return (
    <div style={{ paddingBottom: 200 }}>
      {/* هدر */}
      <div
        style={{
          background: "linear-gradient(135deg, #646fff, #355aff)",
          color: "white",
          padding: "10px 16px",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        <Title level={5} style={{ margin: 0, color: "white" }}>
          سبد خرید شما
        </Title>
      </div>

      {/* کارت محصولات */}
      {cart.map((item: any) => (
        <Card
          key={item.product.id}
          style={{ marginTop: 10, borderRadius: 10 }}
          bodyStyle={{ padding: 16, textAlign: "right" }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <Text strong style={{ fontSize: 16, display: "block" }}>
                  {item.product.name}
                </Text>

                <div style={{ display: "grid", gap: 4 }}>
                  <Text delete style={{ color: "#8c8c8c" }}>
                    {item.product.price.toLocaleString()}
                  </Text>
                  <Text strong style={{ color: "#f5222d", fontSize: 14 }}>
                    تومان {(item.product.price * (100 - item.product.discount) / 100).toLocaleString()}
                  </Text>
                </div>

                <Badge count="۲۵٪" style={{ backgroundColor: "#f5222d" }} />
              </div>

              <img
                src={item.product.image || "https://via.placeholder.com/120"}
                alt={item.product.name}
                style={{
                  width: 120,
                  height: 100,
                  borderRadius: 12,
                }}
              />
            </div>

            <Divider style={{ margin: "12px 0" }} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text strong>{item.quantity} :تعداد</Text>

              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeItem.mutate(item.product.id)}
              >
                حذف
              </Button>
            </div>
          </Space>
        </Card>
      ))}

      {/* کد تخفیف */}
      <Card style={{ borderRadius: 16, marginTop: 10 }} dir="rtl">
        <Text strong style={{ marginBottom: 1, textAlign: "right" }}>
          کد تخفیف دارید؟
        </Text>

        <Space>
          <Button
            type="primary"
            style={{ borderRadius: "0 10px 10px 0" }}
            onClick={applyDiscount}
          >
            ثبت کد
          </Button>
          <Input
            placeholder="کد تخفیف را وارد کنید"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            style={{ borderRadius: "10px 0 0 10px", marginRight: "-1vh" }}
          />
        </Space>
      </Card>

      {/* فوتر پرداخت */}
      <div
        style={{
          position: "fixed",
          bottom: 30,
          left: 0,
          right: 0,
          background: "white",
          padding: 12,
          borderTop: "1px solid #f0f0f0",
          boxShadow: "0 -4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <Button
            type="primary"
            size="middle"
            style={{
              height: 50,
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
              width: "50%",
            }}
            onClick={() => navigate("/checkout")}
          >
            پرداخت نهایی
          </Button>

          <div style={{ display: "grid", textAlign: "right" }}>
            <Text strong>:جمع سبد خرید</Text>
            <Text strong style={{ fontSize: 18, color: "#1890ff" }}>
              {total.toLocaleString()} تومان
            </Text>
          </div>
        </div>

        <Button type="link" block onClick={() => navigate("/")}>
          انتقال به خرید بعدی
        </Button>
      </div>
    </div>
  );
};

export default Cart;
