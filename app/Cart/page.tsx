import { getCart } from '../actions/Cart/cart.action';
import CartPage from './CartPage';
export const dynamic = 'force-dynamic';

export default async function Page() {
  const cart = await getCart();

  return <CartPage initialItems={cart.items ?? []} />;
}
