export function formatRupiah(angka, prefix = "Rp.") {
  if(angka){
    const  tempAngka = angka.toString()
    var number_string = tempAngka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  
    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
  
    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return `${prefix} ${rupiah}`
  }else{
    return `${prefix} 0`
  }
  

  // return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
}

export function secondToHourMinute(seconds){
    const date = new Date(seconds * 1000).toISOString()
    return `${date.substring(11,13)} Jam ${date.substring(14,16)} Menit`
    
}
