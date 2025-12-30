import { message } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
  CloseOutlined,
} from "@ant-design/icons";
import React from "react";

type MessageType = "success" | "error" | "info" | "warning";

const icons: Record<MessageType, React.ReactNode> = {
  success: <CheckCircleFilled style={{ color: "#52c41a", fontSize: 20 }} />,
  error: <CloseCircleFilled style={{ color: "#f5222d", fontSize: 20 }} />,
  info: <InfoCircleFilled style={{ color: "#1890ff", fontSize: 20 }} />,
  warning: <InfoCircleFilled style={{ color: "#faad14", fontSize: 20 }} />,
};

export const showMessage = (type: MessageType, text: string, duration = 3) => {
  message.open({
    type,
    duration,
    icon: icons[type],
    style: {
      width: "100%",
      maxWidth: "100%",
      marginTop: 60,
      borderRadius: 12,
      direction: "rtl",
      padding: "14px 16px",
    },
    content: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 14 }}>{text}</span>

        <CloseOutlined
          onClick={() => message.destroy()}
          style={{ cursor: "pointer", fontSize: 14 }}
        />
      </div>
    ),
  });
};
