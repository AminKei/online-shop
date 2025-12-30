import { Typography } from "antd";
import { useEffect, useState } from "react";

export default function MobileOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isMobile) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 24,
        }}
      >
        <Typography>
          {" "}
          این اپلیکیشن فقط در موبایل قابل مشاهده است📱 <br />
          لطفا در حالت موبایل مشاهده بفرمایید
        </Typography>
      </div>
    );
  }

  return <>{children}</>;
}
