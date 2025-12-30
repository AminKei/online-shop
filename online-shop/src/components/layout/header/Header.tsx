import {
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Badge, Button } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../search-bar/SearchBar";
import AppDrawer from "../navbar/AppDrawer";
import { useCart } from "../../../queries/cart/useCart";

export default function AppBar() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { data: cart } = useCart();

  return (
    <>
      <div
        dir="rtl"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "white",
          boxShadow: "0 1px 4px rgba(48, 48, 48, 0.08)",
          zIndex: 1000,
          padding: "12px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <MenuOutlined
            style={{ fontSize: 24, cursor: "pointer", color: "#333" }}
            onClick={() => setDrawerVisible(true)}
          />
          <Link
            to="/"
            style={{ fontSize: 15, fontWeight: 1000, color: "#000" }}
          >
            دیوایتون
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {token ? (
              <>
                <Badge count={cart?.length || 0}>
                  <Link to="/cart">
                    <ShoppingCartOutlined
                      style={{ fontSize: 22, color: "#333" }}
                    />
                  </Link>
                </Badge>
                <Badge dot>
                  <BellOutlined style={{ fontSize: 22, color: "#333" }} />
                </Badge>
                <Link to="/profile">
                  <UserOutlined style={{ fontSize: 22, color: "#333" }} />
                </Link>
              </>
            ) : (
              <div style={{ display: "flex", gap: 8 }}>
                <Button type="primary" onClick={() => navigate("/login")}>
                  ورود
                </Button>
                <Button onClick={() => navigate("/signup")}>ثبت‌نام</Button>
              </div>
            )}
          </div>
        </div>

        <SearchBar />
      </div>

      <AppDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        token={token}
      />

      <div style={{ height: 120 }} />
    </>
  );
}
