import {
  ManOutlined,
  WomanOutlined,
  CrownOutlined,
  FireOutlined,
  SkinOutlined,
  ShopOutlined,
} from "@ant-design/icons";

export const perfumeCategories = [
  {
    title: "عطر مردانه",
    icon: <ManOutlined />,
    gradient: "linear-gradient(135deg,#111827,#374151)",
    sub: ["تلخ", "خنک", "گرم", "اسپرت", "روزانه"],
  },
  {
    title: "عطر زنانه",
    icon: <WomanOutlined />,
    gradient: "linear-gradient(135deg,#831843,#db2777)",
    sub: ["شیرین", "گرم", "ملایم", "لاکچری", "روزانه"],
  },
  {
    title: "یونیسکس",
    icon: <CrownOutlined />,
    gradient: "linear-gradient(135deg,#1e293b,#0f172a)",
    sub: ["تلخ", "خنک", "چهارفصل"],
  },
  {
    title: "پرفیوم‌ها",
    icon: <FireOutlined />,
    gradient: "linear-gradient(135deg,#92400e,#f59e0b)",
    sub: ["Parfum", "EDP", "EDT", "Cologne"],
  },
  {
    title: "بادی اسپلش",
    icon: <SkinOutlined />,
    gradient: "linear-gradient(135deg,#0f766e,#2dd4bf)",
    sub: ["زنانه", "مردانه", "اسپرت"],
  },
  {
    title: "برندها",
    icon: <ShopOutlined />,
    gradient: "linear-gradient(135deg,#020617,#334155)",
    sub: ["Dior", "Chanel", "YSL", "Versace", "Armani"],
  },
];
