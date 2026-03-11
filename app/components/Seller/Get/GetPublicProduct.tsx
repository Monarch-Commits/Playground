
import { getPublicProduct } from '@/app/actions/Product/getProduct.action'
import GetChild from './GetChild';

export default async function GetPublicProduct() {
  const data = await getPublicProduct();
  return (
    <>
    <h1>Hello I am public in test</h1>
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 p-5 mt-10">
      {data.map((p) => (
        <GetChild key={p.id} p={p} />
      ))}
    </div></>
    
  );
}