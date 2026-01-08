import {
  Card,
  Button,
  Typography,
  Space,
  Input,
  Radio,
  Divider,
  Select,
} from "antd";
import {
  CheckCircleOutlined,
  HomeOutlined,
  TruckOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useState } from "react";

import { useCart } from "../../queries/cart/useCart";
import { useCreateOrder } from "../../queries/order/useCreateOrder";
import SubHeader from "../../components/ui/SubHeader/SubHeader";

const { Text } = Typography;
const { Option } = Select;

const Checkout = () => {
  const { data: cart } = useCart();
  const createOrder = useCreateOrder();

  const [address, setAddress] = useState({
    province: "",
    city: "",
    street: "",
    plaque: "",
    postalCode: "",
  });

  const [shippingType, setShippingType] = useState<"standard" | "express">(
    "standard"
  );

  const shippingCost = shippingType === "express" ? 80000 : 40000;

const total =
  cart?.reduce((sum, item) => {
    const price = item.product.price;
    const discount = Number(item.product.discount ?? 0); // اگر null یا undefined بود، 0
    const discountedPrice = price * ((100 - discount) / 100);
    return sum + discountedPrice * item.quantity;
  }, 0) || 0;

  const finalPrice = total + shippingCost;

  const isAddressValid = Object.values(address).every(Boolean);

  const submitOrder = () => {
    createOrder.mutate({
      address,
      shippingType,
    });
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <SubHeader title="تکمیل سفارش" icon={<CheckCircleOutlined />} />

      {/* آدرس */}
      <Card className="rounded-2xl mb-4">
        <Space align="center" className="mb-3">
          <HomeOutlined />
          <Text strong>آدرس تحویل گیرنده</Text>
        </Space>

        <div className="grid grid-cols-2 gap-3">
          <Select
            placeholder="استان"
            onChange={(v) => setAddress({ ...address, province: v })}
          >
            <Option value="تهران">تهران</Option>
            <Option value="اصفهان">اصفهان</Option>
            <Option value="مشهد">مشهد</Option>
          </Select>

          <Input
            placeholder="شهرستان"
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />

          <Input
            className="col-span-2"
            placeholder="خیابان / کوچه"
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
          />

          <Input
            placeholder="پلاک"
            onChange={(e) => setAddress({ ...address, plaque: e.target.value })}
          />

          <Input
            placeholder="کد پستی"
            maxLength={10}
            onChange={(e) =>
              setAddress({
                ...address,
                postalCode: e.target.value,
              })
            }
          />
        </div>
      </Card>

      {/* ارسال */}
      <Card style={{ marginTop: "1vh", marginBottom: "1vh" }}>
        <Space className="mb-3" style={{ display: "block" }}>
          <TruckOutlined />
          <Text strong>روش ارسال</Text>
        </Space>

        <Radio.Group
          value={shippingType}
          onChange={(e) => setShippingType(e.target.value)}
        >
          <Space direction="vertical">
            <Radio value="standard">🚚 ارسال عادی – ۴۰٬۰۰۰ تومان</Radio>
            <Radio value="express">⚡ ارسال فوری – ۸۰٬۰۰۰ تومان</Radio>
          </Space>
        </Radio.Group>
      </Card>

      {/* صورتحساب */}
      <Card className="rounded-2xl mb-6">
        <Space align="center" className="mb-3">
          <WalletOutlined />
          <Text strong>صورتحساب</Text>
        </Space>

        <Divider />

        <div className="space-y-2">
          <div className="flex justify-between">
            <Text>جمع کالاها</Text>
            <Text>{total.toLocaleString()} تومان</Text>
          </div>

          <div className="flex justify-between">
            <Text>هزینه ارسال</Text>
            <Text>{shippingCost.toLocaleString()} تومان</Text>
          </div>

          <Divider />

          <div className="flex justify-between text-lg">
            <Text strong>مبلغ نهایی</Text>
            <Text strong className="text-red-500">
              {finalPrice.toLocaleString()} تومان
            </Text>
          </div>
        </div>
      </Card>

      {/* ثبت سفارش */}
      <Button
        type="primary"
        block
        size="large"
        disabled={!isAddressValid}
        loading={createOrder.isPending}
        onClick={submitOrder}
        style={{ marginTop: "1vh" }}
      >
        ثبت نهایی سفارش
      </Button>
    </div>
  );
};

export default Checkout;
