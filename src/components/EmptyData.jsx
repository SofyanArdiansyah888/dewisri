import emptyDataUrl from "@/assets/images/empty_data.svg";
export default function EmptyData(){
    return (<>
        <div className="text-center mt-8">
            <img height={200} width={200} className="mx-auto" src={emptyDataUrl} />
            <h4 className="mx-auto  mt-4 font-semibold text-gray-500 text-xl">Data Tidak Ditemukan</h4>
        </div>
    </>)
}