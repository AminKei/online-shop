import { Button, Typography } from "antd";

const { Text, Title } = Typography;

export const BannerItem = ({
  image,
  badge,
  title,
  subtitle,
}: {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
}) => {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        height: 150,
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.05))",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          color: "#fff",
        }}
      >
        <Text style={{ fontSize: 11, opacity: 0.9, color: "white" }}>
          {badge}
        </Text>
        <Title level={5} style={{ color: "#fff", margin: "4px 0" }}>
          {title}
        </Title>
        <Text style={{ fontSize: 12, color: "white" }}>{subtitle}</Text>
      </div>

      {/* دکمه */}
      <Button
        size="small"
        type="primary"
        style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          borderRadius: 20,
        }}
      >
        خرید
      </Button>
    </div>
  );
};
