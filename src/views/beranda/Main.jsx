import {useEffect} from 'react'
import dashboardUrl from "@/assets/images/dashboard.svg";
function Main() {


  return (
    <>
      {/* BEGIN: Notification */}
      <div className="w-full text-center  h-[50vh] pt-24">
        <img src={dashboardUrl} className="h-[300px]  mx-auto place-content-center" />
        <h3 className="mt-12 text-3xl text-slate-700 font-light">Welcome To Point Of Sale App</h3>
      </div>
    </>
  );
}

export default Main;
