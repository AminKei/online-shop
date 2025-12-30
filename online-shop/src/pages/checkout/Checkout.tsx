import {
  Card,
  Button,
  Typography,
  Space,
  Input,
  Radio,
  Divider,
  message,
  Select,
} from "antd";
import { HomeOutlined, TruckOutlined, WalletOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../config/axios/axiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../queries/cart/useCart";

const { Title, Text } = Typography;
const { Option } = Select;

const Checkout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [address, setAddress] = useState({
    province: "",
    city: "",
    street: "",
    plaque: "",
    postalCode: "",
  });

  const [shippingType, setShippingType] = useState("standard");

  const shippingCost = shippingType === "express" ? 80000 : 40000;

  const { data: cart } = useCart();

  const total =
    cart?.reduce(
      (sum: number, item: any) => sum + item.product.price * item.quantity,
      0
    ) || 0;

  const finalPrice = total + shippingCost;

  const orderMutation = useMutation({
    mutationFn: () =>
      api.post("/orders", {
        address,
        shippingType,
      }),
    onSuccess: () => {
      message.success("سفارش با موفقیت ثبت شد 🎉");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      navigate("/");
    },
    onError: () => {
      message.error("ثبت سفارش ناموفق بود");
    },
  });

  const isAddressValid = Object.values(address).every(Boolean);

  return (
    <div className=" min-h-screen " dir="rtl">
      <Title level={5} className="text-center mb-6">
        تکمیل سفارش
      </Title>

      {/* آدرس */}
      <Card className="rounded-2xl mb-4 ">
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
              setAddress({ ...address, postalCode: e.target.value })
            }
          />
        </div>
      </Card>

      {/* ارسال */}
      <Card className="rounded-2xl mb-4 mt-2" style={{ marginTop: "1vh" }}>
        <Space align="center" className="mb-3">
          <TruckOutlined />
          <Text strong>روش ارسال</Text>
        </Space>

        <Radio.Group
          value={shippingType}
          onChange={(e) => setShippingType(e.target.value)}
          className="w-full"
        >
          <Space direction="vertical" className="w-full">
            <Radio value="standard">🚚 ارسال عادی – ۴۰٬۰۰۰ تومان</Radio>
            <Radio value="express">⚡ ارسال فوری – ۸۰٬۰۰۰ تومان</Radio>
          </Space>
        </Radio.Group>
      </Card>

      {/* صورتحساب */}
      <Card className="rounded-2xl mb-6" style={{ marginTop: "1vh" }}>
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
        loading={orderMutation.isPending}
        onClick={() => orderMutation.mutate()}
        style={{ marginTop: "1vh" }}
      >
        ثبت نهایی سفارش
      </Button>
    </div>
  );
};

export default Checkout;
