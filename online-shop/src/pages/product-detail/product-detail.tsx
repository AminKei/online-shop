import {
  Card,
  Button,
  Typography,
  Space,
  Rate,
  Divider,
  Badge,
  message,
  Image,
  Tag,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../config/axios/axiosConfig";
import RelatedProducts from "../../components/layout/related-products/RelatedProducts";
import { useState } from "react";

const { Title, Text } = Typography;

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.get(`/products/${id}`).then((res) => res.data),
  });

  const addToCart = useMutation({
    mutationFn: () => api.post("/cart", { productId: Number(id) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      message.success("به سبد خرید اضافه شد! 🛒");
    },
    onError: () => message.error("ابتدا وارد حساب کاربری خود شوید"),
  });

  
  // حالت علاقه‌مندی (فعلاً لوکال - بعداً می‌تونی با بک‌اند یا context هماهنگ کنی)
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      message.success("به لیست علاقه‌مندی‌ها اضافه شد ❤️");
    } else {
      message.info("از لیست علاقه‌مندی‌ها حذف شد");
    }
  };

  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: 60 }}>در حال بارگذاری...</div>
    );
  if (!product)
    return (
      <div style={{ textAlign: "center", color: "red" }}>محصول پیدا نشد</div>
    );

  // محاسبه قیمت اصلی
  const hasDiscount = product.discount && product.discount > 0;
  const originalPrice = hasDiscount
    ? Math.round(product.price / (1 - product.discount / 100))
    : null;

  // تبدیل جنسیت و نوع
  const genderLabel =
    product.gender === "men"
      ? "مردانه"
      : product.gender === "women"
      ? "زنانه"
      : "یونیسکس";

  const typeLabel = product.type === "perfume" ? "ادکلن / عطر" : "بادی اسپلش";

  const reviewsCount = Math.floor(Math.random() * 150) + 80;

  return (
    <div style={{ paddingBottom: 100, textAlign: "right" }}>
      {/* عکس اصلی + دکمه علاقه‌مندی */}
      <div
        style={{ padding: "4px", textAlign: "center", position: "relative" }}
      >
        <Image
          src={product.image || "https://via.placeholder.com/600x600"}
          alt={product.name}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 10,
          }}
        />

        <Button
          type="text"
          shape="circle"
          size="large"
          icon={
            isWishlisted ? (
              <HeartFilled style={{ fontSize: 24, color: "#ff4d4f" }} />
            ) : (
              <HeartOutlined style={{ fontSize: 24, color: "#d8d8d8" }} />
            )
          }
          onClick={toggleWishlist}
          style={{
            position: "absolute",
            top: 1,
            right: -10,
            backdropFilter: "blur(4px)",
            border: "none",
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </div>

      {/* اطلاعات محصول */}
      <div style={{ padding: "12px" }}>
        <Title level={4} style={{ margin: "0 0 0px" }}>
          {product.name}
        </Title>

        <Space style={{ marginBottom: 16 }}>
          <Rate
            disabled
            allowHalf
            defaultValue={product.rating}
            style={{ fontSize: 16 }}
          />
          <Text type="secondary">({reviewsCount} نظر)</Text>
        </Space>
        <br />
        <Space style={{ marginBottom: 16 }}>
          <Tag
            color={
              product.gender === "unisex"
                ? "gold"
                : product.gender === "men"
                ? "blue"
                : "magenta"
            }
          >
            مناسب برای: {genderLabel}
          </Tag>
          <Tag color={product.type === "perfume" ? "purple" : "pink"}>
            {typeLabel}
          </Tag>
        </Space>
        <br />

        <Divider style={{ margin: "16px 0" }} />

        {/* قیمت */}
        <Space direction="vertical" style={{ width: "100%", marginBottom: 24 }}>
          {hasDiscount ? (
            <Space align="center">
              <Text delete style={{ fontSize: 14, color: "#999" }}>
                {originalPrice?.toLocaleString()} تومان
              </Text>
              <Badge
                count={`-${product.discount}%`}
                style={{
                  backgroundColor: "#f5222d",
                  color: "white",
                  borderRadius: 8,
                  padding: "0 8px",
                }}
              />
            </Space>
          ) : null}
          <Title level={4} style={{ margin: 0, color: "#1890ff" }}>
            {product.price.toLocaleString()} تومان
          </Title>
        </Space>

        {/* مشخصات */}
        <Card title="مشخصات" style={{ borderRadius: 12, marginBottom: 10 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text strong>{product.name}</Text>
              <Text type="secondary">:برند</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text strong>{typeLabel}</Text>
              <Text type="secondary">:نوع محصول</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text strong>{genderLabel}</Text>
              <Text type="secondary">:مناسب برای</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text strong>{product.rating} از ۵</Text>
              <Text type="secondary">:امتیاز کاربران</Text>
            </div>
          </Space>
        </Card>

        {/* توضیحات کامل */}
        <Card style={{ borderRadius: 12, background: "#f9f9f9" }}>
          <Text style={{ lineHeight: 1.6 }}>{product.description}</Text>
        </Card>
      </div>

      <Button
        type="primary"
        size="middle"
        icon={<ShoppingCartOutlined />}
        loading={addToCart.isPending}
        style={{
          border: "none",
          height: 48,
          fontSize: 18,
          fontWeight: 600,
          bottom: "70px",
          left: 0,
          margin: "12px",
          width: "95%",
          marginTop: "10vh",
        }}
        block
        onClick={() => addToCart.mutate()}
      >
        افزودن به سبد خرید
      </Button>

      <RelatedProducts
        currentProductId={product.id}
        type={product.type}
        gender={product.gender}
      />
    </div>
  );
};

export default ProductDetail;
