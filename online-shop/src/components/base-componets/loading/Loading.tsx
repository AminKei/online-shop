import { Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Loading = () => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 48, color: "#1890ff" }} spin />
  );

  return (
    <div
      style={{
        height: "100vh", // کل ارتفاع صفحه
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        background: "#f0f2f5",
      }}
    >
      <Spin indicator={antIcon} />
      <Text style={{ fontSize: 18, color: "#1890ff" }}>در حال بارگذاری...</Text>
    </div>
  );
};

export default Loading;
