import { Typography } from "antd";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

const FirstBaners = () => {
  return (
    <div style={{ margin: "24px 0" }}>
      <Link to="/categories/perfume">
        <div
          style={{
            background: "linear-gradient(135deg, #6098ff, #a855f7)",
            borderRadius: 16,
            padding: "32px 16px",
            textAlign: "center",
            color: "white",
          }}
        >
          <Title level={3} style={{ color: "white", marginBottom: 8 }}>
            بهترین ادکلن‌های ۱۴۰۴
          </Title>
          <Text style={{ color: "white", fontSize: 16 }}>
            رایحه‌های لوکس با تخفیف ویژه تا ۴۰٪
          </Text>
        </div>
      </Link>
    </div>
  );
};

export default FirstBaners;
