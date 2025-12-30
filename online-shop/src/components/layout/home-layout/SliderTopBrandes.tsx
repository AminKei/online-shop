import { Card, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { topBrands } from "../../../data-api/topBrandsHome";

const { Text } = Typography;

const SliderTopBrands = () => {
  return (
    <div style={{ direction: "rtl", marginTop: 16 }}>
      <Text strong style={{ fontSize: 12, marginRight: 8 }}>
        محبوب‌ترین برندها
      </Text>
      <Row
        style={{
          marginTop: 12,
          overflowX: "auto",
          flexWrap: "nowrap",
          gap: 12,
          paddingBottom: 6,
        }}
      >
        {topBrands.map((brand) => (
          <Link key={brand.id} to="/products" style={{ textAlign: "center" }}>
            <Card
              bodyStyle={{ padding: 0 }}
              style={{
                width: 90,
                height: 90,
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover", // 👈 فول واقعی
                }}
              />
            </Card>
            <Text
              style={{
                fontSize: 12,
                marginTop: 4,
                display: "block",
                fontWeight: "bolder",
              }}
            >
              {brand.name}
            </Text>
          </Link>
        ))}
      </Row>
    </div>
  );
};

export default SliderTopBrands;
