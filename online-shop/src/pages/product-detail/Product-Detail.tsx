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
    message,
  } from "antd";
  import {
    ShoppingCartOutlined,
    HeartOutlined,
    HeartFilled,
  } from "@ant-design/icons";
  import { useParams } from "react-router-dom";

  import RelatedProducts from "../../components/layout/related-products/RelatedProducts";
  import { useAddToCart } from "../../queries/cart/useAddToCart";
  import { useProductById } from "../../queries/product-detail/useProductById";
import { useIsInWishlist } from "../../queries/wishlist/useIsInWishlist";
import { useToggleWishlist } from "../../queries/wishlist/useToggleWishlist";

  const { Title, Text } = Typography;

  const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const productId = parseInt(id || "");

    const { data: product, isLoading: productLoading } = useProductById(id);
    const { data: isWishlisted = false, isLoading: wishlistLoading } = useIsInWishlist(productId);
    const toggleWishlist = useToggleWishlist();
    const addToCart = useAddToCart();

    const handleWishlistClick = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        message.warning("برای اضافه کردن به علاقه‌مندی‌ها باید وارد شوید");
        return;
      }

      toggleWishlist.mutate(
        { productId, isCurrentlyInWishlist: isWishlisted },
        {
          onSuccess: () => {
            message.success(
              isWishlisted
                ? "محصول از علاقه‌مندی‌ها حذف شد"
                : "محصول به علاقه‌مندی‌ها اضافه شد"
            );
          },
        }
      );
    };

    if (!id) return null;

    if (productLoading)
      return (
        <div style={{ textAlign: "center", padding: 60 }}>
          در حال بارگذاری...
        </div>
      );

    if (!product)
      return (
        <div style={{ textAlign: "center", color: "red", padding: 60 }}>
          محصول پیدا نشد
        </div>
      );

    const hasDiscount = product.discount > 0;
    const discountedPrice = Math.round(product.price * (100 - product.discount) / 100);

    const genderLabel =
      product.gender === "men" ? "مردانه" : product.gender === "women" ? "زنانه" : "یونیسکس";

    const typeLabel = product.type === "perfume" ? "ادکلن / عطر" : "بادی اسپلش";

    const genderColor =
      product.gender === "men" ? "blue" : product.gender === "women" ? "magenta" : "gold";

    return (
      <div style={{ padding: "2px", maxWidth: 1200, margin: "0 auto", textAlign: "right" }}>
        {/* تصویر + دکمه علاقه‌مندی */}
        <div style={{ position: "relative", textAlign: "center", marginBottom: 24 }}>
          <Image
            src={product.image}
            alt={product.name}
            style={{ borderRadius: 12, maxHeight: 500, width: "100%", objectFit: "cover" }}
          />

          <Button
            type="text"
            shape="circle"
            size="large"
            loading={wishlistLoading || toggleWishlist.isPending}
            icon={
              isWishlisted ? (
                <HeartFilled style={{ fontSize: 20, color: "#ff4d4f" }} />
              ) : (
                <HeartOutlined style={{ fontSize: 20, color: "#cecece" }} />
              )
            }
            onClick={handleWishlistClick}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              backdropFilter: "blur(8px)",
            }}
          />
        </div>

        <Title level={4}>{product.name}</Title>

        <Space>
          <Rate disabled allowHalf defaultValue={product.rating} />
          <Text type="secondary">({product.rating} از ۵)</Text>
        </Space>

        <Space style={{ marginTop: 12 }}>
          <Tag color={genderColor}>مناسب برای: {genderLabel}</Tag>
          <Tag color={product.type === "perfume" ? "purple" : "pink"}>{typeLabel}</Tag>
        </Space>

        <Divider />

        {/* قیمت */}
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          {hasDiscount && (
            <Space align="center">
              <Text delete type="secondary" style={{ fontSize: 14}}>
                {product.price.toLocaleString()} تومان
              </Text>
              <Badge count={`-${product.discount}%`} style={{ backgroundColor: "#f5222d" }} />
            </Space>
          )}

          <Title level={4} style={{ color: "#1890ff", margin: 0 }}>
            {discountedPrice ? discountedPrice.toLocaleString() : product.price.toLocaleString()} تومان
          </Title>
        </Space>

        {/* مشخصات */}
        <Card title="مشخصات محصول" style={{ borderRadius: 12, marginTop: 24 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text strong>{product.name}</Text>
              <Text type="secondary">:نام محصول</Text>
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

        {/* توضیحات */}
        {product.description && (
          <Card style={{ marginTop: 16, borderRadius: 12, background: "#fafafa" }}>
            <Title level={5}>توضیحات</Title>
            <Text style={{ lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
              {product.description}
            </Text>
          </Card>
        )}

        {/* دکمه افزودن به سبد */}
        <Button
          type="primary"
          block
          size="large"
          icon={<ShoppingCartOutlined />}
          loading={addToCart.isPending}
          style={{ marginTop: 32, height: 56, fontSize: 18 }}
          onClick={() => addToCart.mutate(product.id)}
        >
          افزودن به سبد خرید
        </Button>

        {/* محصولات مرتبط */}
        <div style={{ marginTop: 48 }}>
          <RelatedProducts
            currentProductId={product.id}
            type={product.type}
            gender={product.gender}
          />
        </div>
      </div>
    );
  };

  export default ProductDetail;