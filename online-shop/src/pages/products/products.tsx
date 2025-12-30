import {
  Row,
  Col,
  Typography,
  Select,
  Button,
  Slider,
  Tag,
  Pagination,
  Modal,
} from "antd";

import ProductCard from "../../components/ui/ProductCard/ProductCard";
import { useProducts } from "../../queries/products/useProducts";
import { useAddToCart } from "../../queries/cart/useAddToCart";
import { useProductFilter } from "../../hooks/products/useProductFilterSort";

const { Text } = Typography;
const { Option } = Select;

const Products = () => {
  const { data: products = [], isLoading } = useProducts();
  const addToCart = useAddToCart();
  const {
    paginatedProducts,
    total,
    sortBy,
    priceRange,
    gender,
    type,
    page,
    filterOpen,
    setSortBy,
    setPriceRange,
    setGender,
    setType,
    setPage,
    setFilterOpen,
    MAX_PRICE,
    PAGE_SIZE,
  } = useProductFilter(products);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: 60 }}>در حال بارگذاری...</div>
    );
  }

  return (
    <div>
      {/* نوار بالا */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 16,
          direction: "rtl",
        }}
      >
        <Button type="primary" onClick={() => setFilterOpen(true)}>
          فیلتر
        </Button>

        <Select
          value={sortBy}
          style={{ minWidth: 140 }}
          onChange={(v) => {
            setSortBy(v);
            setPage(1);
          }}
        >
          <Option value="relevant">مرتبط‌ترین</Option>
          <Option value="price-low">ارزان‌ترین</Option>
          <Option value="price-high">گران‌ترین</Option>
          <Option value="discount">بیشترین تخفیف</Option>
        </Select>
      </div>

      {/* Modal فیلتر */}
      <Modal
        title="فیلتر محصولات"
        open={filterOpen}
        onCancel={() => setFilterOpen(false)}
        style={{ direction: "rtl" }}
        footer={[
          <Button
            key="reset"
            onClick={() => {
              setGender(null);
              setType(null);
              setPriceRange([0, MAX_PRICE]);
            }}
          >
            پاک‌سازی
          </Button>,
          <Button
            key="apply"
            type="primary"
            onClick={() => {
              setPage(1);
              setFilterOpen(false);
            }}
          >
            اعمال فیلتر
          </Button>,
        ]}
      >
        {/* جنسیت */}
        <div style={{ marginBottom: 16 }}>
          <Text strong>جنسیت</Text>
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <Tag.CheckableTag
              checked={gender === "men"}
              onChange={(v) => setGender(v ? "men" : null)}
            >
              مردانه
            </Tag.CheckableTag>
            <Tag.CheckableTag
              checked={gender === "women"}
              onChange={(v) => setGender(v ? "women" : null)}
            >
              زنانه
            </Tag.CheckableTag>
          </div>
        </div>

        {/* نوع */}
        <div style={{ marginBottom: 16 }}>
          <Text strong>نوع محصول</Text>
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <Tag.CheckableTag
              checked={type === "perfume"}
              onChange={(v) => setType(v ? "perfume" : null)}
            >
              پرفیوم
            </Tag.CheckableTag>
            <Tag.CheckableTag
              checked={type === "body_splash"}
              onChange={(v) => setType(v ? "body_splash" : null)}
            >
              بادی اسپلش
            </Tag.CheckableTag>
          </div>
        </div>

        {/* قیمت */}
        <div>
          <Text strong>
            قیمت: {priceRange[0].toLocaleString()} —{" "}
            {priceRange[1].toLocaleString()} تومان
          </Text>
          <Slider
            range
            min={0}
            max={MAX_PRICE}
            step={1_000_000}
            value={priceRange}
            onChange={(v) => setPriceRange(v as [number, number])}
          />
        </div>
      </Modal>

      {/* محصولات */}
      <Row gutter={[16, 16]} style={{ direction: "rtl" }}>
        {paginatedProducts.map((product) => (
          <Col xs={12} sm={8} md={6} key={product.id}>
            <ProductCard
              {...product}
              onAddToCart={() => addToCart.mutate(product.id)}
              loading={addToCart.isPending}
            />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div style={{ marginTop: 32, textAlign: "center", marginBottom: "10vh" }}>
        <Pagination
          current={page}
          pageSize={PAGE_SIZE}
          total={total}
          onChange={setPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Products;
