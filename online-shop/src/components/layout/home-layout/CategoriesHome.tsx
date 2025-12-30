import { Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { categories } from "../../../data-api/categoriesHome";

const { Text } = Typography;

const CategoriesHome = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        overflowX: "auto",
        padding: "8px 0",
      }}
    >
      {categories.map((cat, index) => (
        <Link to={"/products"} key={index} style={{ textDecoration: "none" }}>
          <Card
            bordered
            style={{
              width: 70,
              minWidth: 70,
              height: 96,
              borderRadius: 14,
              textAlign: "center",
            }}
            bodyStyle={{
              padding: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <img
              src={cat.image}
              alt={cat.title}
              style={{
                width: 36,
                height: 56,
                objectFit: "contain",
              }}
            />

            <Text
              style={{
                fontSize: 11,
                color: "#333",
                whiteSpace: "nowrap",
              }}
            >
              {cat.title}
            </Text>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesHome;
