import { formatRupiah } from "../../utils/formatter";

function TaxInfo({ taxes, order }) {
  let totalPayment = 0;

  if (order && taxes.length === 2) {
    const taxPPN = order?.total_payment * (taxes[0].amount / 100);
    const taxService = order?.total_payment * (taxes[1].amount / 100);
    totalPayment = order?.total_payment + (taxPPN + taxService);
  }
  return (
    <>
      <div className="box p-5 mt-5">
        <div className="flex">
          <div className="mr-auto mb-4">Total</div>
          <div className="font-medium">{formatRupiah (order?.total_payment,"Rp.")}</div>
        </div>
        {taxes?.map((tax) => (
          <div className="flex">
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
