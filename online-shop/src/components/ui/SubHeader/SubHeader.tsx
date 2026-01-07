import { Avatar, Typography } from "antd";
import type { FC } from "react";
import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type React from "react";
const { Title } = Typography;

interface SubHeaderProps {
  title: string;
  icon: React.ReactNode;
}

const SubHeader: FC<SubHeaderProps> = ({ title, icon }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #646fff, #355aff)",
        color: "white",
        padding: "10px 16px",
        textAlign: "center",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom:"2vh",
        direction:"rtl"
      }}
    >
      <Avatar
        size={40}
        icon={icon}
        style={{ backgroundColor: "#fff", color: "#0145ff" }}
      />
      <Title level={5} style={{ margin: 0, color: "white" }}>
        {title}
      </Title>
      <RightOutlined
        style={{ fontSize: 20, cursor: "pointer" }}
        className="rotate-180"
        onClick={() => navigate(-1)}
      />
    </div>
  );
};

export default SubHeader;
