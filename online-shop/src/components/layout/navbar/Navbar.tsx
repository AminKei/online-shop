import {
  HomeOutlined,
  AppstoreOutlined,
  HeartOutlined,
  ProductOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const items = [
    { path: "/compare", icon: <SendOutlined />, label: " پیگیری کالا" },
    { path: "/products", icon: <ProductOutlined />, label: " محصولات" },
    { path: "/", icon: <HomeOutlined />, label: "خانه" },
    { path: "/categories", icon: <AppstoreOutlined />, label: "دسته بندی" },
    { path: "/wishlist", icon: <HeartOutlined />, label: "علاقه‌مندی" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderTop: "1px solid #eee",
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0",
        zIndex: 10000000000,
      }}
    >
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            textAlign: "center",
            color: location.pathname === item.path ? "#1890ff" : "#888",
            fontSize: 12,
            transition: "color 0.3s",
            textDecoration: "none",
          }}
        >
          <div style={{ fontSize: 20, marginBottom: 2 }}>{item.icon}</div>
          <div>{item.label}</div>
        </Link>
      ))}
    </div>
  );
}
