import { BannerItem } from "../../../ui/BannerItem/BannerItem";

const SecondBanners = () => {
  return (
    <div style={{ marginTop: "3vh", direction: "rtl" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}
      >
        <BannerItem
          image="https://atremarkazi.ir/wp-content/uploads/2024/11/Men_s-perfume-shakhes.jpg"
          badge="فروش ویژه"
          title="ادکلن مردانه"
          subtitle="تلخ • خنک"
        />

        <BannerItem
          image="https://cdn.riiha.ir/storage/upload/images/2024/03/18/65f8555e71841.jpg"
          badge="پیشنهاد ویژه"
          title="ادکلن زنانه"
          subtitle="شیرین • گرم"
        />

        <BannerItem
          image="https://luxinlux.com/blog/wp-content/uploads/2023/03/wewge-1024x512.jpg"
          badge="محبوب‌ترین‌ها"
          title="پرفیوم لاکچری"
          subtitle="ماندگاری بالا"
        />

        <BannerItem
          image="https://mandegaratr.ir/wp-content/uploads/2022/02/%D8%B9%D8%B7%D8%B1-%D8%A7%D8%AF%DA%A9%D9%84%D9%86-%DA%98%DA%A9-%D8%B3%D8%A7%D9%81-%D8%AF%D8%A7%D8%B1%DA%A9-%D9%85%D8%A7%D8%B3%DA%A9-jacsaf-dark-muskimg_61fecfdf9fbe3.jpg"
          badge="٪ تخفیف"
          title="بادی اسپلش"
          subtitle="سبک و روزانه"
        />
      </div>
    </div>
  );
};

export default SecondBanners;
