import { getCart } from '../actions/Cart/cart.action';
import CartPage from './CartPage';

export type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
};
export default async function Page() {
  const res = await getCart();

  const items: CartItem[] =
    res?.data?.map((item: CartItem) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })) || [];

  return <CartPage items={items} />;
}
