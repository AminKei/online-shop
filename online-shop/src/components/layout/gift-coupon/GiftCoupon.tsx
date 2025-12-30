import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const GiftCoupon: React.FC = () => {
  return (
    <Card
      bordered={false}
      style={{
        width: "100%",
        height: 150,
        borderRadius: 12,
        padding: 0,
        background: "linear-gradient(135deg, #003cff, #b700ff)",
        color: "#fff",
        marginTop: 40,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              display: "block",
              marginBottom: 8,
              color: "#fff",
            }}
          >
            کد تخفیف برای اولین خرید در فروشگاه دیوایتون
          </Text>
          <Title
            level={4}
            style={{
              margin: 0,
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            WELCOME10
          </Title>
        </div>
      </div>

      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: "#fff",
          left: -10,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: "#fff",
          right: -10,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
    </Card>
  );
};

export default GiftCoupon;
