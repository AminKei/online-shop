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
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { HeartFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useToggleWishlist, useWishlist } from "../../queries/wishlist/useWishlist";
import { useAddToCart } from "../../queries/cart/useAddToCart";
import Title from "antd/es/typography/Title";

const { Text } = Typography;

const Wishlist = () => {
  const { data: wishlist = [], isLoading, isError } = useWishlist();
  const addToCart = useAddToCart();
  const toggleWishlist = useToggleWishlist();

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

  if (isError) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Text type="danger">
          خطا در دریافت علاقه‌مندی‌ها. لطفاً دوباره تلاش کنید.
        </Text>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 10 }}>
        <Empty
          description={
            <Text style={{ fontSize: 12, color: "#999" }}>
              علاقه‌مندی‌های شما خالی است
            </Text>
          }
        >
          <Link to="/products">
            <Button type="primary" size="middle">
              برو به فروشگاه
            </Button>
          </Link>
        </Empty>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "8px",
        // maxWidth: 900,
        // margin: "0 auto",
        direction: "rtl",
      }}
    >
 
      <div
        style={{
            background: "linear-gradient(135deg, #646fff, #355aff)",
          color: "white",
          padding: "10px 16px",
          textAlign: "center",
          borderRadius: "10px",
          marginBottom:"2vh",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        <HeartFilled style={{ color: "#ff4d4f", marginLeft: 8, fontSize: 20 }} />
        <Title level={5} style={{ margin: 0, color: "white" }}>
        علاقه‌مندی‌های من ({wishlist.length})
        </Title>
      
      </div>


      <div
        style={{
          gap: 16,
          direction: "rtl",
          marginBottom:"10vh"
        }}
      >
        {wishlist.map((product: any) => {
          const hasDiscount = product.discount > 0;
          const discountedPrice = Math.round(
            product.price * (100 - product.discount) / 100
          );
          return (
            <Card
            key={product.id}
            style={{ marginTop: 10, borderRadius: 10 }}
            bodyStyle={{ padding: 12, textAlign: "right" }}
            >
             
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  height: 125,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <Image
                  alt={product.name}
                  src={product.image}
                  preview={false}
                  style={{
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: 8,
                    background: "#fafafa",
                  }}
                />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "right",
                  flexGrow: 1,
                  marginRight: 8,
                //   marginLeft: 8,
                }}
              >
                <Text strong style={{ fontSize: 12 }} ellipsis={{ tooltip: product.name }}>
                  {product.name}
                </Text>
                <Space direction="vertical"  >
                <Text delete style={{ color: "#8c8c8c", fontSize:14 }}>
                    {product.price.toLocaleString()} تومان  
                  </Text>
                  <Text strong style={{ color: "#1890ff", fontSize: 15 }}>
                    {discountedPrice.toLocaleString()} تومان
                  </Text>
                  {hasDiscount && (
                <div
                  style={{
                    background: "#f5222d",
                    color: "#fff",
                    padding: "5px 5px",
                    borderRadius: 6,
                    fontWeight: "bold",
                    fontSize: 11,
                    zIndex: 2,
                    width:"40px"
                  }}
                >
                 % {product.discount} 
                </div>
              )}
                </Space>
              </div>
              </div>
              <Divider/>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  marginLeft: 0,
                }}
              >
                <Button
                  size="middle"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleRemove(product.id)}
                  loading={toggleWishlist.isPending}
                  style={{  fontSize: 15}}
                >
                  حذف از لیست
                </Button>
                <Button
                  type="primary"
                  size="middle"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => addToCart.mutate(product.id)}
                  loading={addToCart.isPending}
                  style={{ fontSize: 15 }}
                >
                  افزودن به سبد
                </Button>
              </div>
            </Card>
          );
        })}
        
      </div>
    </div>
  );
};

export default Wishlist;











// <Card
//           key={item.product.id}
//           style={{ marginTop: 10, borderRadius: 10 }}
//           bodyStyle={{ padding: 16, textAlign: "right" }}
//         >
//           <Space direction="vertical" style={{ width: "100%" }}>
//             <div style={{ display: "flex", gap: 10 }}>
//               <div style={{ flex: 1 }}>
//                 <Text strong style={{ fontSize: 16, display: "block" }}>
//                   {item.product.name}
//                 </Text>

//                 <div style={{ display: "grid", gap: 4 }}>
//                   <Text delete style={{ color: "#8c8c8c" }}>
//                     {item.product.price.toLocaleString()}
//                   </Text>
//                   <Text strong style={{ color: "#f5222d", fontSize: 14 }}>
//                     تومان {(item.product.price * (100 - item.product.discount) / 100).toLocaleString()}
//                   </Text>
//                 </div>

//                 <Badge count="۲۵٪" style={{ backgroundColor: "#f5222d" }} />
//               </div>

//               <img
//                 src={item.product.image || "https://via.placeholder.com/120"}
//                 alt={item.product.name}
//                 style={{
//                   width: 120,
//                   height: 100,
//                   borderRadius: 12,
//                 }}
//               />
//             </div>

//             <Divider style={{ margin: "12px 0" }} />

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <Text strong>{item.quantity} :تعداد</Text>

//               <Button
//                 type="text"
//                 danger
//                 icon={<DeleteOutlined />}
//                 onClick={() => removeItem.mutate(item.product.id)}
//               >
//                 حذف
//               </Button>
//             </div>
//           </Space>
//         </Card>







