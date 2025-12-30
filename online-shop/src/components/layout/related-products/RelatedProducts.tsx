import { Typography, Spin, Row } from "antd";
import { useProducts } from "../../../queries/products/useProducts";
import ProductCard from "../../ui/ProductCard/ProductCard";

const { Title } = Typography;

type Props = {
  currentProductId: number;
  type?: string;
  gender?: string;
};

const RelatedProducts = ({ currentProductId, type, gender }: Props) => {
  const { data: products = [], isLoading } = useProducts();

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Spin />
      </div>
    );
  }

  const relatedProducts = products.filter((p: any) => {
    if (p.id === currentProductId) return false;
    if (type && p.type !== type) return false;
    if (gender && p.gender !== gender) return false;
    return true;
  });

  if (relatedProducts.length === 0) return null;

  return (
    <div style={{ marginTop: 40, direction: "rtl" }}>
      <Title level={5} style={{ marginBottom: 16 }}>
        محصولات مرتبط
      </Title>

      <Row
        gutter={[16, 16]}
        style={{ overflowX: "auto", flexWrap: "nowrap", gap: "10px" }}
      >
        {relatedProducts.slice(0, 10).map((product: any) => (
          <ProductCard
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            discount={product.discount}
          />
        ))}
      </Row>
    </div>
  );
};

export default RelatedProducts;
