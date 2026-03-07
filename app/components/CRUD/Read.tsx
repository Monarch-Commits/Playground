import getProduct from "@/app/actions/Product/getProduct,action"
import Image from "next/image"


export default async function Read() {
    const data = await getProduct()
  return (
    <div>

    {
        data.map((e)=> <div key={e.id}><p> Title: {e.title}</p> <p>{e.description}</p><Image src={e.imageUrl || ""} width={200} height={200} alt={e.title}/>
        <p>{e.price}</p></div> 
    )
    }
    </div>
  )
}
