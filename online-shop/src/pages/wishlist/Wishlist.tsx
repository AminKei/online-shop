import {
  Typography,
  Button,
  Empty,
  Spin,
  Space,
  message,
  Image,
  Card,
  Divider,
  Tag,
} from "antd";
import {
  DeleteOutlined,
  HeartFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import Title from "antd/es/typography/Title";
import { useWishlist } from "../../queries/wishlist/useWishlist";
import { useToggleWishlist } from "../../queries/wishlist/useToggleWishlist";
import { useAddToCart } from "../../queries/cart/useAddToCart";

const { Text } = Typography;

const Wishlist = () => {
  const { data: wishlist = [], isLoading } = useWishlist();
  const toggleWishlist = useToggleWishlist();
  const addToCart = useAddToCart();

  const handleRemove = (productId: number) => {
    toggleWishlist.mutate(
      { productId, isCurrentlyInWishlist: true },
      {
        onSuccess: () => message.success("از علاقه‌مندی‌ها حذف شد"),
      }
    );
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: 60 }}>
        <Spin size="large" />
        <Text style={{ display: "block", marginTop: 16 }}>
          در حال بارگذاری علاقه‌مندی‌ها...
        </Text>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Empty description="علاقه‌مندی‌های شما خالی است">
          <Link to="/products">
            <Button type="primary">برو به فروشگاه</Button>
          </Link>
        </Empty>
      </div>
    );
  }

  return (
    <div style={{ padding: "8px", direction: "rtl", marginBottom: "10vh" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #646fff, #355aff)",
          color: "white",
          padding: "10px 16px",
          textAlign: "center",
          borderRadius: "10px",
          marginBottom: "2vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HeartFilled
          style={{ color: "#ff4d4f", marginLeft: 8, fontSize: 20 }}
        />
        <Title level={5} style={{ margin: 0, color: "white" }}>
          علاقه‌مندی‌های من ({wishlist.length})
        </Title>
      </div>

      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        {wishlist.map((product: any) => (
          <Card
            key={product.id}
            style={{ borderRadius: 10 }}
            bodyStyle={{ padding: 12, textAlign: "right" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Image
                alt={product.name}
                src={product.image}
                preview={false}
                width={100}
                style={{ borderRadius: 8, objectFit: "cover" }}
              />

              <div style={{ flex: 1 }}>
                <Text
                  strong
                  style={{ fontSize: 14 }}
                  ellipsis={{ tooltip: product.name }}
                >
                  {product.name}
                </Text>

                <Space direction="vertical" style={{ marginTop: 8 }}>
                  {product.discount > 0 && (
                    <Text delete type="secondary" >
                      {product.discount > 0 && (
                        <Tag color="red">-{product.discount}%</Tag>
                      )}
                      {product.price.toLocaleString()} تومان
                    </Text>
                  )}
                  <Text strong style={{ color: "#f5222d", fontSize: 16 }}>
                    {product.discount > 0
                      ? Math.round(
                          (product.price * (100 - product.discount)) / 100
                        ).toLocaleString()
                      : product.price.toLocaleString()}{" "}
                    تومان
                  </Text>
                </Space>
              </div>
            </div>

            <Divider style={{ margin: "12px 0" }} />

            <div
              style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemove(product.id)}
                loading={toggleWishlist.isPending}
              >
                حذف از لیست
              </Button>
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={() => addToCart.mutate(product.id)}
                loading={addToCart.isPending}
              >
                افزودن به سبد
              </Button>
            </div>
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default Wishlist;
