
function DiscountInfo({ discounts, setSelectedDiscount }) {
  return (
    <>
      <div className="box p-5 mt-5">
        <div className="col-span-12">
          <label htmlFor="amount" className="form-label">
            Diskon
          </label>
          <select
            name="amount"
            id="amount"
            className="form-control"
            onChange={(e) => setSelectedDiscount(e.target.value)}
          >
            <option value={0}>Pilih Diskon</option>
            {discounts?.map((discount,index) => (
              <option key={index} value={discount.amount}>{discount.name}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default DiscountInfo;
