import { Link } from "react-router-dom";
import CustomerInfo from "./CustomerInfo";

function Main() {
  return (
    <>
      <div className="intro-y  flex flex-col sm:flex-row justify-between mt-8 gap-2">
        <h2 className="text-lg font-medium mr-auto">Payment Receipt</h2>
        <button className="btn btn-primary">Print Receipt</button>

        <Link to="/meja">
          <button className="btn btn-primary">Selesai</button>
        </Link>
      </div>

      <div className="intro-y gap-5 mt-5 overflow-hidden max-h-[72vh] w-full">
      
        <div className="intro-y col-span-4 flex flex-col gap-2 w-[350px] mx-auto  ">
          <div className="bg-white w-full h-screen rounded-md">
            {/* HEADER */}
            <div className="text-center flex flex-col gap-1 py-6">
              <p className="text-xl font-semibold">Dewi Sri</p>
              <p className="text-xs">Telp: 085211818886</p>
              <p className="text-xs">sofyanardianysah@gmail.com</p>
              <p className="font-semibold">Meja 1</p>
            </div>
            <div className="mt-6">
              {[1, 2, 3, 4, 5, 6].map(() => (
                <div className="flex flex-row w-full px-4">
                  <div className="min-w-[150px] text-[13px]">Pulpi Orange</div>
                  <div className="flex-1 text-[13px]">1</div>
                  <div className="flex-1 text-[13px]">3000</div>
                  <div className="flex-1 text-[13px]">3000</div>
                </div>
              ))}
              <div className="w-full text-center">
                --------------------------------------------------------------------------------------
              </div>

              <div className="flex flex-row w-full pr-7 justify-end mt-4">
                <div className="min-w-[150px]">Total</div>
                <div className="">1</div>
              </div>
              <div className="flex flex-row w-full pr-7 justify-end">
                <div className="min-w-[150px]">Tunai</div>
                <div className="">1</div>
              </div>
              <div className="flex flex-row w-full pr-7 justify-end">
                <div className="min-w-[150px]">Debit</div>
                <div className="">1</div>
              </div>
              <div className="flex flex-row w-full pr-7 justify-end">
                <div className="min-w-[150px]">Kembali</div>
                <div className="">1</div>
              </div>
              <div className="flex flex-row w-full pr-7 justify-end">
                <div className="min-w-[150px]">------------------------------------------------</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
