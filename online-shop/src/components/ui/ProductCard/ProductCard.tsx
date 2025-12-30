import { Card, Typography, Space, Button, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Text } = Typography;

export type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image?: string;
  discount?: number;
  originalPrice?: number;
  onAddToCart?: (id: number) => void;
  loading?: boolean;
};

const CARD_HEIGHT = 300;

const ProductCard = ({
  id,
  name,
  price,
  image,
  discount,
  originalPrice,
  onAddToCart,
  loading,
}: ProductCardProps) => {
  return (
    <Link to={`/products/${id}`}>
      <Card
        style={{
          borderRadius: 14,
          height: CARD_HEIGHT,
          display: "flex",
          width: "160px",
          direction: "rtl",
          flexDirection: "column",
        }}
        bodyStyle={{
          padding: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        cover={
          <div style={{ position: "relative", padding: 10 }}>
            {discount && (
              <Badge
                count={`${discount}٪`}
                style={{
                  backgroundColor: "#f5222d",
                  fontWeight: "bold",
                }}
              />
            )}
            <img
              src={
                image ||
                `https://via.placeholder.com/300x300?text=${encodeURIComponent(
                  name
                )}`
              }
              alt={name}
              style={{
                width: "100%",
                height: 140,
                objectFit: "cover",
                borderRadius: 10,
              }}
            />
          </div>
        }
      >
        <Space orientation="vertical" size={4}>
          <Text
            strong
            style={{
              fontSize: 13,
              // height: 26,
              overflow: "hidden",
            }}
          >
            {name}
          </Text>

          {originalPrice && (
            <Text delete type="secondary" style={{ fontSize: 12 }}>
              {originalPrice.toLocaleString()} تومان
            </Text>
          )}

          <Text strong style={{ color: "#1890ff", fontSize: 14 }}>
            {price.toLocaleString()} تومان
          </Text>
        </Space>

        {onAddToCart && (
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            size="small"
            block
            loading={loading}
            style={{ marginTop: 8, height: "30px" }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(id);
            }}
          >
            افزودن
          </Button>
        )}
      </Card>
    </Link>
  );
};

export default ProductCard;
