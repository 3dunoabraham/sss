import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Component({}) {
    const router = useRouter();
    const handleClick = async (newUrl:any) => {
      // Wait for route change before do anything
      await router.push(newUrl);
      // Reload after routing
    //   router.reload();
    window.location.reload()
    } 
    
    return (<>
    <div className='flex px-4'>
        <Link href={"/"} className='tx-white tx-lgx nodeco py-4' >
            <div className='Q_xs_lg px-2'>IMS</div>
            <div className='Q_lg_x'>Inventory</div>
        </Link>
        {/* <button onClick={()=>{handleClick("/")}} className='tx-white tx-lgx nodeco py-4' >
            <div className='Q_xs_lg px-2'>IMS</div>
            <div className='Q_lg_x'>Inventory</div>
        </button> */}
    </div>
    </>)
}