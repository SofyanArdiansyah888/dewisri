import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useCreatePayment, useUnpaidPayments } from "../../hooks/usePayments";
import { formatRupiah } from "../../utils/formatter";
import { Lucide } from "@/base-components";

function Main() {
  const { tableId, orderId } = useParams();
  const navigate = useNavigate();
  const [totalPembayaran, setTotalPembayaran] = useState(0);

  const [method, setMethod] = useState("cash");
  const [sisa, setSisa] = useState(0);
  const [cash, setCash] = useState("Rp.0");
  const [bank, setBank] = useState("Rp.0");
  const [kembalian, setKembalian] = useState(0);
  const [discount, setDiscount] = useState(0);
  const location = useLocation();

  const [data, setData] = useState();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const temp = queryParams.get("discount");
    if (temp) setDiscount(temp);
    else setDiscount(0);
  }, [location]);

  const { mutate: createPayment, isLoading } = useCreatePayment((data) => {
    navigate("/meja");
  });

  useUnpaidPayments(
    (data) => {
      setData(data);
      let total = data?.total;

      if (!total) {
        total = 0;
      } else {
        total = total - (discount / 100) * data?.subtotal;
      }

      setTotalPembayaran(total);
    },
    {
      order_id: orderId,
      table_id: tableId,
    }
  );

  useEffect(() => {
    let temp = totalPembayaran - (sanitizeNumber(bank) + sanitizeNumber(cash));
    
    if (temp < 0) {
      setSisa(0);
      setKembalian(Math.abs(temp));
      return;
    }else{
      setKembalian(0)
    }
    setSisa(temp);
  }, [cash, bank, totalPembayaran]);




  const handleClick = (amount) => {
    if (method === "cash") {
      setCash(() => formatRupiah(sanitizeNumber(cash) + amount,'Rp.'));
    } else {
      setBank(() => formatRupiah(sanitizeNumber(bank) + amount,'Rp.'));
    }
  };

  const handleClear = () => {
    setCash(formatRupiah(0,'Rp.'));
    setBank(formatRupiah(0,'Rp.'));
    setKembalian(0);
    setSisa(0);
  };

  const handleBayar = () => {
    if (!(sisa > 0)) {
      const temp = {
        customer_id: data?.customer.id,
        order_id: orderId,
        table_id: tableId,
        subtotal: data?.subtotal,
        total: totalPembayaran,
        discount,
        tax_ppn: data?.tax_ppn,
        tax_service: data?.tax_service,
        cash:sanitizeNumber(cash),
        debit: sanitizeNumber(bank),
        change: kembalian,
        products: data?.order_product,
        split: data?.split,
      };
      
      createPayment(temp);
    }
  };

  const sanitizeNumber = (stringNumber) => {
    return Number(stringNumber.replace(/\D/g, ""))
  }
  
  return (
    <>
      <div className="intro-y  flex flex-col sm:flex-row justify-between mt-8 gap-2">
        <h2 className="text-lg font-medium mr-auto">Payment</h2>

        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Kembali
        </button>

        <button
          className="btn btn-primary"
          disabled={sisa > 0 || isLoading}
          onClick={handleBayar}
        >
          Bayar
        </button>
      </div>

      <div className="intro-y grid grid-cols-12 gap-5 mt-5 overflow-hidden max-h-[55vh]">
        <div className="intro-y col-span-4 flex flex-col gap-2 ">
          <div
            className={`w-full bg-slate-200 p-8 rounded-md ${
              method === "cash" ? "bg-yellow-100" : ""
            }`}
            onClick={() => setMethod("cash")}
          >
            <h1 className="mb-2 font-semibold">CASH</h1>
            {/* <h2> {formatRupiah(cash, "Rp.")}</h2> */}
            <input
              type="text"
              className=" bg-transparent rounded-none "
              value={cash}
              onChange={(e) => {
                setCash(() => formatRupiah(e.target.value,'Rp.'));
              }}
            />
          </div>
          <div
            className={`w-full bg-slate-200 p-8 rounded-md ${
              method === "bank" ? "bg-yellow-100" : ""
            }`}
            onClick={() => setMethod("bank")}
          >
            <h1 className="mb-2 font-semibold">DEBIT</h1>
            {/* <h2> {formatRupiah(bank, "Rp.")}</h2> */}
            <input
              type="text"
              className=" bg-transparent rounded-none "
              value={bank}
              onChange={(e) => {
                setBank(() => formatRupiah(e.target.value,'Rp.'));
              }}
            />
          </div>
        </div>
        <div className="intro-y col-span-8 flex flex-col gap-4 ">
          <div className="h-[150px] bg-slate-50 p-4">
            <h2 className="float-right text-xl">
              Kembalian{" "}
              <span className="text-green-400">
                {" "}
                {formatRupiah(kembalian, "Rp.")}
              </span>
            </h2>
            <h2 className="text-xl">
              Kurang{" "}
              <span className="text-red-400">
                {" "}
                {formatRupiah(sisa, "Rp.")}{" "}
              </span>
            </h2>

            <h2 className="text-xl">
              Total Pembayaran {formatRupiah(totalPembayaran, "Rp.")}
            </h2>
          </div>
          <div className="flex flex-row gap-3">
            {/* CALCULATOR */}
            <div className="grid grid-cols-3 flex-1 gap-1 text-center  ">
              <div
                className="bg-slate-200 rounded-md"
                onClick={() => {
                  if (method === "cash") {
                    let total = totalPembayaran - sanitizeNumber(bank);
                    if (total < 0) total = 0;
                    setCash(formatRupiah (total,'Rp.'));
                  }
                  if (method === "bank") {
                    let tempCash = sanitizeNumber(cash)
                    let total = totalPembayaran - tempCash;
                    if (total < 0) total = 0;
                    setBank(formatRupiah(totalPembayaran - tempCash));
                  }
                }}
              >
                <h3 className="mt-[12px] text-md cursor-pointer">Uang Pass</h3>
              </div>
              <div
                className="bg-slate-200 rounded-md cursor-pointer"
                onClick={() => handleClick(100)}
              >
                <h3 className="mt-[12px] text-md">Rp. 100</h3>
              </div>
              <div
                className="bg-slate-200 rounded-md cursor-pointer"
                onClick={() => handleClick(200)}
              >
                <h3 className="mt-[12px] text-md">Rp. 200</h3>
              </div>
              <div
                className="bg-slate-200 rounded-md cursor-pointer"
                onClick={() => handleClick(500)}
              >
                <h3 className="mt-[12px] text-md">Rp. 500</h3>
              </div>
              <div
                className="bg-slate-200 rounded-md cursor-pointer"
                onClick={() => handleClick(1000)}
              >
                <h3 className="mt-[12px] text-md cursor-pointer">Rp. 1.000</h3>
              </div>
              <div
                className="bg-slate-200 rounded-md cursor-pointer"
                onClick={() => handleClick(2000)}
              >
                <h3 className="mt-[12px] text-md cursor-pointer">Rp. 2.000</h3>
              </div>
              <div
                className="bg-slate-200 rounded-md cursor-pointer"
                onClick={() => handleClick(5000)}
              >
                <h3 className="mt-[12px] text-md">Rp. 5.000</h3>
              </div>
              <div
                className="bg-slate-200 rounded-md cursor-pointer"
                onClick={() => handleClick(10000)}
              >
                <h3 className="mt-[12px] text-md">Rp. 10.000</h3>
              </div>
              <div
                className="bg-slate-200 rounded-md cursor-pointer"
                onClick={() => handleClick(20000)}
              >
                <h3 className="mt-[12px] text-md">Rp. 20.000</h3>
              </div>
              <div
                className="bg-slate-200 rounded-md cursor-pointer"
                onClick={() => handleClick(50000)}
              >
                <h3 className="mt-[12px] text-md">Rp. 50.000</h3>
              </div>
              <div
                className="bg-slate-200 rounded-md cursor-pointer"
                onClick={() => handleClick(75000)}
              >
                <h3 className="mt-[12px] text-md cursor-pointer ">
                  Rp. 75.000
                </h3>
              </div>
              <div
                className="bg-slate-200 rounded-md cursor-pointer"
                onClick={() => handleClick(100000)}
              >
                <h3 className="mt-[12px] text-md">Rp. 100.000</h3>
              </div>

              {/* <div className="bg-slate-200 rounded-md cursor-pointer">
                <input
                  type="text"
                  className=" w-full bg-slate-200 "
                  value={manual}
                  onChange={(e) => {
                    setManual(formatRupiah(e.target.value, "Rp."));
                    let amount = e.target.value.replace(/\D/g, "");

                    if (method === "cash") {
                      setCash((cash) =>  Number(amount));
                    } else {
                      setBank((bank) =>  Number(amount));
                    }
                  }}
                />
              </div> */}
              <div
                className="bg-slate-200 rounded-md cursor-pointer"
                onClick={() => handleClear()}
              >
                <h3 className="mt-[12px] text-md">Clear</h3>
              </div>
            </div>

            {/* CUSTOMER */}
            <div className="w-[300px]">
              <h1 className="text-lg font-semibold mb-4">Customer</h1>
              <div className="box p-5">
                <div className="flex items-center border-b border-slate-200 dark:border-darkmode-400 py-5">
                  <div>
                    <div className="text-slate-500">Customer</div>
                    <div className="mt-1">{data?.customer?.name}</div>
                  </div>
                  <Lucide
                    icon="User"
                    className="w-4 h-4 text-slate-500 ml-auto"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <div>
                    <div className="text-slate-500">Meja</div>
                    <div className="mt-1">{data?.table?.name}</div>
                  </div>
                  <Lucide
                    icon="Mic"
                    className="w-4 h-4 text-slate-500 ml-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
