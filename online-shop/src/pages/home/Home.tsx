import { Row, Typography } from "antd";
import SliderHome from "../../components/layout/home-layout/SliderHome";
import CategoriesHome from "../../components/layout/home-layout/CategoriesHome";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
import FirstBaners from "../../components/layout/home-layout/baners/FirstBaners";
import { Link } from "react-router-dom";
import SecondBanners from "../../components/layout/home-layout/baners/SecendBaners";
import SliderTopBrandes from "../../components/layout/home-layout/SliderTopBrandes";
import EndBaners from "../../components/layout/home-layout/baners/EndBaners";
import Footer from "../../components/layout/home-layout/footer/Footer";
import GiftCoupon from "../../components/layout/gift-coupon/GiftCoupon";
import { useProducts } from "../../queries/products/useProducts";

const { Title } = Typography;

const Home = () => {
  const { data: products = [] } = useProducts();

  return (
    <div style={{ paddingBottom: 80, direction: "rtl" }}>
      <SliderHome />
      <CategoriesHome />
      <div style={{ padding: "0 12px" }}>
        <div className="flex justify-between items-center mb-3">
          <Title
            level={5}
            style={{
              marginBottom: 12,
              fontSize: "12px",
              textAlign: "right",
              marginTop: "3vh",
            }}
          >
            تخفیف‌های ویژه امروز
          </Title>
          <Link
            to={"/products"}
            style={{ fontSize: "12px", marginTop: "10px" }}
          >
            مشاهده همه
          </Link>
        </div>
        <Row
          gutter={[16, 16]}
          style={{ overflowX: "auto", flexWrap: "nowrap" }}
        >
          {products.slice(0, 7).map((product: any) => (
            <div key={product.id} style={{ padding: "0 5px" }}>
              <ProductCard
                id={product.id}
                name={product.name}
                image={product.image}
                originalPrice={product.price}
                discount={product.discount}
                price={product.price * (100 - product.discount)  / 100}
              />
            </div>
          ))}
        </Row>
      </div>

      <FirstBaners />
      <div style={{ padding: "0 10px", marginTop: "30px" }}>
        <div className="flex justify-between items-center mb-3">
          <Title
            level={5}
            style={{
              marginBottom: 12,
              fontSize: "12px",
              textAlign: "right",
              marginTop: "3vh",
            }}
          >
            بیشترین خریدها
          </Title>
          <Link
            to={"/products"}
            style={{ fontSize: "12px", marginTop: "10px" }}
          >
            مشاهده همه
          </Link>
        </div>
        <Row
          gutter={[16, 16]}
          style={{ overflowX: "auto", flexWrap: "nowrap" }}
        >
          {products.slice(8, 15).map((product: any) => (
            <div key={product.id} style={{ padding: "0 5px" }}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            </div>
          ))}
        </Row>
      </div>
      <SecondBanners />
      <GiftCoupon />
      <SliderTopBrandes />
      <EndBaners />
      <Footer />
    </div>
  );
};

export default Home;
