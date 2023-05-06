import Link from 'next/link';
import { BsBox, BsCurrencyDollar } from 'react-icons/bs';


export default function Component({ Title, firstValue, secondValue }:any) {
  return (
    <div className="flex-center flex-justify-start px-3">
      <div className="box-shadow-2 pt-4 w-min-400px bord-r-8">
        <div className="tx-mdl tx-bold-5 mb-3 px-6">{Title}</div>
        <div className="flex-center flex-justify-start px-6">
          <div className="ims-bg-primary pa-2 bord-r-10 px-3 pt-3 opaci-75">
            <div className="tx-white tx-lg">
              <BsBox />
            </div>
          </div>
          <div className="pl-4 py-2">
            <div className="ims-tx-faded py-1">Available Units</div>
            <div className="tx-lx tx-bold-6">
              {firstValue || "-"}
            </div>
          </div>
        </div>
        <div className="flex-center flex-justify-start px-6">
          <div className="ims-bg-primary pa-2 bord-r-10 px-3 pt-3 opaci-75">
            <div className="tx-white tx-lg scale-150">
              <BsCurrencyDollar />
            </div>
          </div>
          <div className="pl-4 py-2">
            <div className="ims-tx-faded py-1">Inventory Value</div>
            <div className="tx-lx tx-bold-6">{!!secondValue ? "$"+secondValue : "-"}</div>
          </div>
        </div>
        <hr className="mt-3" />
        <Link href="/inventory" className="px-6 opaci-chov--50 block">
          <div className="ims-tx-primary tx-bold-5 py-4 tx-end">Manage</div>
        </Link>
      </div>
    </div>
  );
}