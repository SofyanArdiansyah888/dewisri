import { formatRupiah } from "../../utils/formatter";

function TaxInfo({ taxes, selectedMenus, selectedDiscount }) {
  let totalPayment = 0;
  let subtotal = 0
  if (selectedMenus.length > 0 && taxes?.length === 2) {
    selectedMenus.map((selectedMenu) => {
      let total = (selectedMenu.quantity - (selectedMenu.void_quantity ? selectedMenu.void_quantity : 0)) * selectedMenu.item_price;
      subtotal += total
    })

    const taxPPN = subtotal * (taxes[0].amount / 100);
    const taxService = subtotal * (taxes[1].amount / 100);
    
    const discount = subtotal * (selectedDiscount / 100);
    
    totalPayment = subtotal + (taxPPN + taxService) -discount ;
  }
  return (
    <>
      <div className="box p-5 mt-5">
        <div className="flex">
          <div className="mr-auto mb-4">Total</div>
          <div className="font-medium">{formatRupiah (subtotal,"Rp.")}</div>
        </div>
        {taxes?.map((tax,index) => (
          <div className="flex" key={index}>
            <div className="mr-auto mb-4">{tax.name}</div>
            <div className="font-medium">{tax.amount} %</div>
          </div>
        ))}

        <div className="flex mt-4 pt-4 border-t border-slate-200/60 dark:border-darkmode-400">
          <div className="mr-auto font-medium text-base">Total Charge</div>
          <div className="font-medium text-base">
            {formatRupiah(totalPayment, "Rp.")}
          </div>
        </div>
      </div>
    </>
  );
}

export default TaxInfo;
