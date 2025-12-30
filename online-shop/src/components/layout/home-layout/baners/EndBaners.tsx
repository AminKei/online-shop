import { Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const EndBaners = () => {
  return (
    <div style={{ margin: "24px 0" }}>
      <Link to="/categories/luxury">
        <div
          style={{
            position: "relative",
            height: 160,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* تصویر پس‌زمینه */}
          <img
            src="https://zhivano.com/wp-content/uploads/2023/08/2052_67131.jpg"
            alt="Luxury Perfume"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* لایه دارک */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
            }}
          />

          {/* محتوا */}
          <div
            style={{
              position: "absolute",
              inset: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 20px",
              color: "#fff",
              top: "50%",
            }}
          >
            <Title level={5} style={{ color: "#fff", marginBottom: 0 }}>
              کالکشن لاکچری مردانه
            </Title>

            <Text style={{ color: "#cfcfcf", fontSize: 14 }}>
              انتخاب خاص‌پسندها با رایحه‌های ماندگار
            </Text>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EndBaners;
