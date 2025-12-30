export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  gender: "men" | "women" | "unisex";
  type: "perfume" | "body_splash";
  rating: number;
  discount?: number;
};
