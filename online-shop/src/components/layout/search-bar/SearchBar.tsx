import { Input, List, Space, Typography, Card, Spin } from "antd";
import {
  CloseOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchProducts } from "../../../queries/products/useSearchProducts";

const { Text } = Typography;

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const { data: searchResults = [], isFetching } =
    useSearchProducts(searchQuery);

  const popularSearches = [
    "کرید اونتوس",
    "دیور ساواج",
    "تام فورد",
    "ادکلن مردانه",
    "بادی اسپلش",
    "ویکتوریا سکرت",
  ];

  useEffect(() => {
    const t = setTimeout(() => {
      setSearchQuery(inputValue.trim());
    }, 400);

    return () => clearTimeout(t);
  }, [inputValue]);

  const showPopular = !searchQuery && popularSearches.length > 0;
  const showResults = searchQuery && searchResults.length > 0;
  const showEmpty = searchQuery && !isFetching && searchResults.length === 0;

  return (
    <div style={{ position: "relative", marginTop: 12 }}>
      <SearchOutlined
        style={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 18,
          color: "#888",
          zIndex: 2,
        }}
      />

      <Input
        placeholder="جستجوی عطر، برند یا رایحه..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        style={{
          borderRadius: 10,
          background: "#f5f5f5",
          border: "none",
          padding: "10px 40px",
          textAlign: "right",
        }}
      />

      <FilterOutlined
        style={{
          position: "absolute",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 18,
          color: "#888",
        }}
      />

      {showDropdown && (
        <Card
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: 6,
            borderRadius: 12,
            zIndex: 1000,
          }}
          bodyStyle={{ padding: 0 }}
        >
          {/* هدر */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 12px",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <Text type="secondary">نتایج جستجو</Text>
            <CloseOutlined
              style={{ fontSize: 16, cursor: "pointer", color: "#888" }}
              onClick={() => setShowDropdown(false)}
            />
          </div>

          {isFetching && (
            <div style={{ padding: 20, textAlign: "center" }}>
              <Spin />
            </div>
          )}

          {showPopular && (
            <>
              <Text type="secondary" style={{ padding: 12, display: "block" }}>
                جستجوی پرتکرار
              </Text>
              <List
                dataSource={popularSearches}
                renderItem={(term) => (
                  <List.Item
                    style={{ cursor: "pointer", padding: "10px 16px" }}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setInputValue(term);
                      setSearchQuery(term);
                    }}
                  >
                    {term}
                  </List.Item>
                )}
              />
            </>
          )}

          {showResults && (
            <List
              dataSource={searchResults.slice(0, 6)}
              renderItem={(item: any) => (
                <List.Item
                  style={{ cursor: "pointer", padding: "12px 16px" }}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    navigate(`/products/${item.id}`);
                    setShowDropdown(false);
                  }}
                >
                  <Space>
                    <img
                      src={item.image}
                      width={40}
                      height={40}
                      style={{ borderRadius: 8 }}
                    />
                    <div>
                      <Text strong>{item.name}</Text>
                      <Text type="secondary" style={{ display: "block" }}>
                        {item.price?.toLocaleString()} تومان
                      </Text>
                    </div>
                  </Space>
                </List.Item>
              )}
            />
          )}

          {showEmpty && (
            <Text
              type="secondary"
              style={{
                padding: 16,
                display: "block",
                textAlign: "center",
              }}
            >
              نتیجه‌ای یافت نشد 😕
            </Text>
          )}
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
