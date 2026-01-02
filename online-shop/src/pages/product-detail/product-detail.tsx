import {
  Card,
  Button,
  Typography,
  Space,
  Rate,
  Divider,
  Badge,
  Image,
  Tag,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useState } from "react";

import RelatedProducts from "../../components/layout/related-products/RelatedProducts";
import { useAddToCart } from "../../queries/cart/useAddToCart";
import { useProductById } from "../../queries/product-detail/useProductById";

const { Title, Text } = Typography;

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading } = useProductById(id);
  const addToCart = useAddToCart();

  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!id) return null;

  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: 60 }}>در حال بارگذاری...</div>
    );

  if (!product)
    return (
      <div style={{ textAlign: "center", color: "red" }}>محصول پیدا نشد</div>
    );

  // 🎯 تبدیل مقادیر
  const hasDiscount = product.discount > 0;

  const genderLabel =
    product.gender === "men"
      ? "مردانه"
      : product.gender === "women"
      ? "زنانه"
      : "یونیسکس";

  const typeLabel = product.type === "perfume" ? "ادکلن / عطر" : "بادی اسپلش";

  const genderColor =
    product.gender === "men"
      ? "blue"
      : product.gender === "women"
      ? "magenta"
      : "gold";

  return (
    <div style={{ paddingBottom: 100, textAlign: "right" }}>
      {/* تصویر + علاقه‌مندی */}
      <div style={{ position: "relative", textAlign: "center" }}>
        <Image
          src={product.image}
          alt={product.name}
          style={{ borderRadius: 12 }}
        />

        <Button
          type="text"
          shape="circle"
          icon={
            isWishlisted ? (
              <HeartFilled style={{ fontSize: 22, color: "#ff4d4f" }} />
            ) : (
              <HeartOutlined style={{ fontSize: 22, color: "#d8d8d8" }} />
            )
          }
          onClick={() => setIsWishlisted((p) => !p)}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            backdropFilter: "blur(4px)",
          }}
        />
      </div>

      {/* عنوان */}
      <Title level={4} style={{ marginTop: 12 }}>
        {product.name}
      </Title>

      {/* امتیاز */}
      <Space>
        <Rate disabled allowHalf defaultValue={product.rating} />
        <Text type="secondary">({product.rating} از ۵)</Text>
      </Space>

      {/* تگ‌ها */}
      <Space style={{ marginTop: 12 }}>
        <Tag color={genderColor}>مناسب برای: {genderLabel}</Tag>
        <Tag color={product.type === "perfume" ? "purple" : "pink"}>
          {typeLabel}
        </Tag>
      </Space>

      <Divider />

      {/* قیمت */}
      <Space direction="vertical" style={{ width: "100%" }}>
        {hasDiscount && (
          <Space>
            <Text delete type="secondary">
              {product.price?.toLocaleString()} تومان
            </Text>
            <Badge
              count={`-${product.discount}%`}
              style={{ backgroundColor: "#f5222d" }}
            />
          </Space>
        )}

        <Title level={4} style={{ color: "#1890ff", margin: 0 }}>
          تومان {(product.price * (100 - product.discount)  / 100).toLocaleString()}
        </Title>
      </Space>

      {/* مشخصات */}
      <Card title="مشخصات محصول" style={{ borderRadius: 12, marginTop: 16 }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <div className="flex justify-between">
            <Text strong>{product.name}</Text>
            <Text type="secondary">:نام محصول</Text>
          </div>

          <div className="flex justify-between">
            <Text strong>{typeLabel}</Text>
            <Text type="secondary">:نوع محصول</Text>
          </div>

          <div className="flex justify-between">
            <Text strong>{genderLabel}</Text>
            <Text type="secondary">:مناسب برای</Text>
          </div>

          <div className="flex justify-between">
            <Text strong>{product.rating} از ۵</Text>
            <Text type="secondary">:امتیاز کاربران</Text>
          </div>
        </Space>
      </Card>

      {/* توضیحات */}
      {product.description && (
        <Card
          style={{
            marginTop: 12,
            borderRadius: 12,
            background: "#f9f9f9",
          }}
        >
          <Text style={{ lineHeight: 1.8 }}>{product.description}</Text>
        </Card>
      )}

      {/* افزودن به سبد */}
      <Button
        type="primary"
        block
        icon={<ShoppingCartOutlined />}
        loading={addToCart.isPending}
        style={{ marginTop: 24, height: 48 }}
        onClick={() => addToCart.mutate(product.id)}
      >
        افزودن به سبد خرید
      </Button>

      {/* محصولات مرتبط */}
      <RelatedProducts
        currentProductId={product.id}
        type={product.type}
        gender={product.gender}
      />
    </div>
  );
};

export default ProductDetail;
