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
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import { useWishlist } from "../../queries/wishlist/useWishlist";
import { useToggleWishlist } from "../../queries/wishlist/useToggleWishlist";
import { useAddToCart } from "../../queries/cart/useAddToCart";
import SubHeader from "../../components/ui/SubHeader/SubHeader";

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
    <div style={{ marginBottom: "10vh" }}>
      <SubHeader title="علاقه‌مندی‌های من" icon={<HeartOutlined />} />

      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        {wishlist.map((product: any) => (
          <Card
            key={product.id}
            style={{ borderRadius: 10 }}
            bodyStyle={{ padding: 12, textAlign: "right" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
                    <Text delete type="secondary">
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
              <Image
                alt={product.name}
                src={product.image}
                preview={false}
                width={100}
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
            </div>

            <Divider style={{ margin: "12px 0" }} />

            <div
              style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
            >
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={() => addToCart.mutate(product.id)}
                loading={addToCart.isPending}
              >
                افزودن به سبد
              </Button>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemove(product.id)}
                loading={toggleWishlist.isPending}
              >
                حذف از لیست
              </Button>
            </div>
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default Wishlist;
