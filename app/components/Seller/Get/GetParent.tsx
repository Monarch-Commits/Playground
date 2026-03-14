import getProduct from '@/app/actions/Product/getProduct.action';
import GetChild from './GetChild';

export default async function GetParent() {
  const data = await getProduct();
  return (
    <div className="mt-10 columns-1 gap-4 p-5 sm:columns-2 lg:columns-3">
      {data.map((p) => (
        <GetChild key={p.id} p={p} />
      ))}
    </div>
  );
}
