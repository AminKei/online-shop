import { Card, Row, Col, Typography, Drawer, Space, Tag } from "antd";

import { useState } from "react";
import { perfumeCategories } from "../../data-api/perfumeCategories";
import SubHeader from "../../components/ui/SubHeader/SubHeader";
import { AppstoreOutlined } from "@ant-design/icons";
const { Text } = Typography;

const Categories = () => {
  const [open, setOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<any>(null);

  return (
    <div>
      <SubHeader icon={<AppstoreOutlined />} title="دسته‌بندی محصولات" />
      <Row gutter={[16, 16]}>
        {perfumeCategories.map((cat, index) => (
          <Col xs={12} sm={8} key={index}>
            <Card
              hoverable
              onClick={() => {
                setActiveCat(cat);
                setOpen(true);
              }}
              style={{
                borderRadius: 20,
                height: 140,
                color: "#fff",
                background: cat.gradient,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              bodyStyle={{ padding: 0 }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{cat.icon}</div>
                <Text style={{ color: "#fff", fontWeight: 600 }}>
                  {cat.title}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Drawer زیرمنو */}
      <Drawer
        placement="bottom"
        height={260}
        open={open}
        onClose={() => setOpen(false)}
        title={activeCat?.title}
      >
        <Space wrap size={10}>
          {activeCat?.sub?.map((item: string) => (
            <Tag
              key={item}
              style={{
                padding: "6px 14px",
                fontSize: 13,
                borderRadius: 20,
                cursor: "pointer",
              }}
              color="processing"
            >
              {item}
            </Tag>
          ))}
        </Space>
      </Drawer>
    </div>
  );
};

export default Categories;
