import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  UndoOutlined,
} from "@ant-design/icons";

export const getOrderStatusConfig = (status: string) => {
  switch (status) {
    case "PENDING":
      return {
        label: "در انتظار پرداخت",
        color: "#1890ff",
        icon: <SyncOutlined />,
      };
    case "SHIPPED":
      return {
        label: "در حال ارسال",
        color: "#1890ff",
        icon: <SyncOutlined />,
      };
    case "DELIVERED":
      return {
        label: "تحویل شده",
        color: "#52c41a",
        icon: <CheckCircleOutlined />,
      };
    case "CANCELLED":
      return {
        label: "لغو شده",
        color: "#f5222d",
        icon: <CloseCircleOutlined />,
      };
    case "RETURNED":
      return {
        label: "مرجوع شده",
        color: "#faad14",
        icon: <UndoOutlined />,
      };
    default:
      return {
        label: status,
        color: "#8c8c8c",
        icon: null,
      };
  }
};
