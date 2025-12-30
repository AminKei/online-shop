import { Row, Col, Typography, Divider, Space, Collapse } from "antd";
import {
  InstagramOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
  PhoneOutlined,
  MailOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const Footer = () => {
  return (
    <footer
      style={{
        background: "#fafafa",
        padding: "40px 16px",
        marginTop: 60,
        direction: "rtl",
        borderTop: "2px solid #eaeaea",
        borderRadius: "10px",
      }}
    >
      <Row gutter={[32, 32]}>
        <Col xs={24} md={8}>
          <Title level={4}>سوالات متداول</Title>

          <Collapse
            accordion
            bordered={false}
            expandIcon={({ isActive }) => (
              <PlusOutlined
                rotate={isActive ? 45 : 0}
                style={{ fontSize: 12 }}
              />
            )}
            style={{
              background: "transparent",
            }}
          >
            <Panel header="آیا محصولات اصل هستند؟" key="1">
              <Text type="secondary">
                بله، تمامی محصولات فروشگاه دیوایتون ۱۰۰٪ اصل بوده و با ضمانت
                اصالت کالا ارائه می‌شوند.
              </Text>
            </Panel>

            <Panel header="ارسال سفارش چقدر زمان می‌برد؟" key="2">
              <Text type="secondary">
                سفارش‌ها معمولاً بین ۱ تا ۳ روز کاری درب منزل تحویل داده
                می‌شوند.
              </Text>
            </Panel>

            <Panel header="امکان پرداخت در محل وجود دارد؟" key="3">
              <Text type="secondary">
                بله، در اکثر شهرها امکان پرداخت در محل فراهم است.
              </Text>
            </Panel>

            <Panel header="شرایط مرجوعی کالا چگونه است؟" key="4">
              <Text type="secondary">
                تا ۷ روز پس از دریافت، در صورت استفاده نشدن از کالا، امکان
                مرجوعی وجود دارد.
              </Text>
            </Panel>
          </Collapse>
        </Col>

        {/* درباره ما */}
        <Col xs={24} md={8}>
          <Title level={4}>درباره دیوایتون</Title>
          <Text type="secondary" style={{ lineHeight: 2 }}>
            دیوایتون یک فروشگاه آنلاین تخصصی در حوزه عطر و ادکلن است که با تمرکز
            بر اصالت کالا، قیمت منصفانه و تجربه خرید لذت‌بخش فعالیت می‌کند. هدف
            ما ارائه بهترین برندهای دنیا با ارسال سریع و پشتیبانی واقعی است.
          </Text>
        </Col>

        {/* لینک‌های مفید */}
        <Col xs={24} md={8}>
          <Title level={4}>لینک‌های مفید</Title>
          <Space direction="vertical" size={10}>
            <Link to="/products">همه محصولات</Link>
            <Link to="/categories/men">ادکلن مردانه</Link>
            <Link to="/categories/women">ادکلن زنانه</Link>
            <Link to="/categories/body-splash">بادی اسپلش</Link>
            <Link to="/about">درباره ما</Link>
          </Space>
        </Col>
      </Row>

      <Divider style={{ margin: "32px 0" }} />

      {/* پایین فوتر */}
      <Row justify="space-between" align="middle" gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Text type="secondary" style={{ fontSize: 13 }}>
            © {new Date().getFullYear()} دیوایتون — تمامی حقوق محفوظ است
          </Text>
        </Col>

        <Col xs={24} md={12} style={{ textAlign: "center" }}>
          <Space size={18}>
            <InstagramOutlined style={{ fontSize: 20 }} />
            <TwitterOutlined style={{ fontSize: 20 }} />
            <WhatsAppOutlined style={{ fontSize: 20 }} />
            <PhoneOutlined style={{ fontSize: 18 }} />
            <MailOutlined style={{ fontSize: 18 }} />
          </Space>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
