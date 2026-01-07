import { message as antdMessage } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

// اول تنظیمات جهانی
antdMessage.config({
  duration: 4,
  maxCount: 3,
  rtl: true,
  top: 100, // اختیاری: فاصله از بالا
});

// حالا توابع اصلی رو override می‌کنیم
const originalMessage = { ...antdMessage };

const customStyle = {
  fontSize: "14px",
  fontWeight: 500,
  borderRadius: "12px",
  padding: "12px 20px",
};

const customContent = (content: string) => (
  <span style={{ fontFamily: "Vazir, IranSans, sans-serif" }}>{content}</span>
);

// override success, error, info, warning, loading
(["success", "error", "info", "warning", "loading"] as const).forEach(
  (type) => {
    // @ts-ignore – چون type ممکنه loading باشه که icon نداره
    antdMessage[type] = (content: any, duration?: any, onClose?: any) => {
      const iconMap = {
        success: <CheckCircleOutlined />,
        error: <CloseCircleOutlined />,
        info: <InfoCircleOutlined />,
        warning: <WarningOutlined />,
        loading: undefined,
      };

      return originalMessage.open({
        type,
        content: customContent(content?.toString() || content),
        icon: iconMap[type],
        style: {
          ...customStyle,
        },
        className: `custom-global-message custom-global-message-${type}`,
        duration:
          type === "loading" ? 0 : typeof duration === "number" ? duration : 4,
        onClose,
      });
    };
  }
);

// destroy و open رو هم اگر لازم داری override کن (معمولاً کافیه همینا)

// مهم: این فایل رو حتماً زود import کن (مثلاً در main.tsx یا index.tsx)
