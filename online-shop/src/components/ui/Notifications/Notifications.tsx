import { Drawer, Button } from "antd";
import { useEffect, useState } from "react";

export default function Notifications() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Drawer
      placement=""
      height={220}
      open={open}
      onClose={() => setOpen(false)}
      styles={{
        body: { padding: "8px 2px" },
      }}
      style={{ borderRadius: "0 0 16px 16px" }}
    >
      {/* Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        {/* Vector Illustration */}
        <img
          src="https://4photoshop.ir/wp-content/uploads/4photoshop-icon-website-%D8%A2%DB%8C%DA%A9%D9%88%D9%86-%D9%88%D8%A8-%D8%B3%D8%A7%DB%8C%D8%AA.jpg"
          alt="Install App"
          style={{ width: 90, height: 90, marginBottom: 12 }}
        />

        {/* Title */}
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
          اپلیکیشن ما را نصب کن
        </h3>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 14,
            color: "#666",
            marginBottom: 20,
            width: "85%",
          }}
        >
          برای دسترسی سریع‌تر، تجربه بهتر و استفاده آفلاین، نصب اپلیکیشن توصیه
          می‌شود.
        </p>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12 }}>
          <Button
            type="primary"
            size="large"
            style={{ paddingInline: 26 }}
            onClick={() => setOpen(false)}
          >
            نصب اپلیکیشن
          </Button>

          <Button size="large" onClick={() => setOpen(false)}>
            بعداً
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
