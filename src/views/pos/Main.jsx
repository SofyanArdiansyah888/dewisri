import {
  Lucide,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@/base-components";
import { faker as $f } from "@/utils";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";
import { useOrderTable } from "../../hooks/useOrderTable";
import { useProducts } from "../../hooks/useProduct";
import { useTaxes } from "../../hooks/useTaxes";
import api from "../../services/api";
import { baseUrlImage } from "../../utils/constant";
import { formatRupiah } from "../../utils/formatter";
import CustomerInfo from "./CustomerInfo";
import TaxInfo from "./TaxInfo";

function Main() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [newOrderModal, setNewOrderModal] = useState(false);
  const [addItemModal, setAddItemModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: products } = useProducts();
  const { data: categories } = useCategory();
  const { data: taxes } = useTaxes();
  const { data: tableOrder } = useOrderTable(id);
  
  // const [tableOrder, setTableOrders] = useState([]);
  // const [order, setOrder] = useState();
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     if (tableOrder.length > 0) {
  //       const orderId = tableOrder[0]?.order_id;
  //       let result = await api.get(`orders/${orderId}`);
  //       setOrder(result.data);
  //     }
  //   })();
  // }, [tableOrder]);

  const filteredData = () => {
    let filterProducts = products?.filter(
      (item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) &&
        item.id !== 1
    );
    if (selectedCategory !== "All") {
      filterProducts = filterProducts?.filter((item) =>
        item.category.name
          .toLocaleLowerCase()
          .includes(selectedCategory.toLocaleLowerCase())
      );
    }
    return filterProducts;
  };

  const handleCharge = async () => {
    const data = {
      customer_id: order.customer.id,
      order_id: order.id,
      table_id: order.table.id,
      subtotal: 0,
      total: 0,
      tax_ppn: 0,
      tax_service: 0,
    };
    await api.post("payments", data);

    navigate("/meja");
  };
  return (
    <>
      <div className="intro-y  flex flex-col sm:flex-row items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Point of Sale</h2>
      </div>

      <div className="intro-y grid grid-cols-12 gap-5 mt-5 overflow-hidden max-h-[72vh]">
        {/* LEFT SIDE CONTENT */}
        <TabGroup className="intro-y col-span-8 ">
          <div className="intro-y pr-1">
            <div className=" p-2 bg-transparent">
              <TabList className="nav-pills mb-8 box bg-white">
                <Tab className="w-full py-2" tag="button">
                  Products
                </Tab>
                <Tab className="w-full py-2" tag="button">
                  Manual
                </Tab>
              </TabList>
              <TabPanels>
                {/* PRODUCT PANEL */}
                <TabPanel>
                  <div className="lg:flex intro-y mt-4">
                    {/* SEARCH */}
                    <div className="relative">
                      <input
                        type="text"
                        className="form-control py-3 px-4 w-full lg:w-48 box pr-10"
                        placeholder="Search item..."
                        onChange={(event) => setSearch(event.target.value)}
                      />
                    </div>
                    <div className="flex flex-row gap-3 ml-2 py-1 w-auto overflow-x-auto min-w-2xl">
                      {categories
                        ? categories.map((category) => (
                            <div
                              key={category.id}
                              className={`box px-4 py-3 cursor-pointer ${selectedCategory === category.name ? "bg-secondary" : "bg-base"}`}
                              onClick={() => setSelectedCategory(category.name)}
                            >
                              {category.name}
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                  {/* PRODUCTS  */}
                  <div className="grid grid-cols-2 gap-1 mt-5 pt-5 border-t overflow-y-auto max-h-[450px] pb-14">
                    {filteredData()?.map((product, index) => (
                      <div className=" flex flex-row justify-between gap-4 max-h-[90px]  m-2 bg-gray-50 hover:bg-secondary rounded-md p-2 ">
                        <div className="flex">
                          <img
                            className="h-[48px] w-[48px] rounded-md"
                            src={`${baseUrlImage}/products/${product.photo}`}
                            alt="Gambar Makanan"
                          />
                          <div className="text-left ml-4">
                            <h6 className="font-semibold text-md">
                              {product.name}
                            </h6>
                            <p className="text-xs  rounded-md  mt-1">
                              {product.variant_name}
                              {product.materials.length > 0 && (
                                <span className="text-right font-semibold">
                                  {" "}
                                  (stock {product?.materials[0]?.stock})
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <p className=" text-sm font-medium">
                          {formatRupiah(product.price, "Rp.")}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabPanel>

                {/* MANUAL PANEL  */}
                <TabPanel>
                  <div className="w-1/2 flex flex-col gap-4">
                    {/* NAMA PRODUK */}
                    <div className="col-span-12">
                      <label
                        htmlFor="name"
                        className="form-label font-semibold"
                      >
                        Nama Produk
                      </label>
                      <input
                        // {...register("name")}
                        className={classnames({
                          "form-control": true,
                          // "border-danger": errors.name,
                        })}
                        name="name"
                        id="name"
                        type="text"
                      />
                      {/* {errors.name && (
                <div className="text-danger mt-2">{errors.name.message}</div>
              )} */}
                    </div>

                    {/* HARGA */}
                    <div className="col-span-12">
                      <label
                        htmlFor="name"
                        className="form-label font-semibold"
                      >
                        Harga
                      </label>
                      <input
                        // {...register("name")}
                        className={classnames({
                          "form-control": true,
                          // "border-danger": errors.name,
                        })}
                        name="name"
                        id="name"
                        type="text"
                      />
                      {/* {errors.name && (
                <div className="text-danger mt-2">{errors.name.message}</div>
              )} */}
                    </div>

                    {/* JUMLAH */}
                    <div className="col-span-12">
                      <label
                        htmlFor="name"
                        className="form-label font-semibold"
                      >
                        Jumlah
                      </label>
                      <input
                        // {...register("name")}
                        className={classnames({
                          "form-control": true,
                          // "border-danger": errors.name,
                        })}
                        name="name"
                        id="name"
                        type="text"
                      />
                      {/* {errors.name && (
                <div className="text-danger mt-2">{errors.name.message}</div>
              )} */}
                    </div>

                    {/* DESKRIPSI */}
                    <div className="col-span-12">
                      <label
                        htmlFor="name"
                        className="form-label font-semibold"
                      >
                        Deskripsi
                      </label>
                      <textarea
                        // {...register("name")}
                        className={classnames({
                          "form-control": true,
                          // "border-danger": errors.name,
                        })}
                        name="name"
                        id="name"
                        type="text"
                      />
                      {/* {errors.name && (
                <div className="text-danger mt-2">{errors.name.message}</div>
              )} */}
                    </div>

                    <button className="btn btn-primary">Simpan</button>
                  </div>
                </TabPanel>
              </TabPanels>
            </div>
          </div>
        </TabGroup>

        <div className="flex flex-col col-span-4 overflow-scroll h-[550px] pb-12 ">
          {/* CUSTOMER */}
          <CustomerInfo order={tableOrder} />
 
          <div className="box p-2 mt-5   h-[300px]">
            {tableOrder && tableOrder?.products?.map((tableOrder) => (
              <a
                key={tableOrder.id}
                onClick={() => {
                  setAddItemModal(true);
                }}
                className="flex items-center p-3 cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md"
              >
                <div className="max-w-[50%] truncate mr-1">
                  {tableOrder.product_name}
                </div>
                <div className="text-slate-500">x {tableOrder.quantity}</div>
                <Lucide icon="Edit" className="w-4 h-4 text-slate-500 ml-2" />
                <div className="ml-auto font-medium">
                  {formatRupiah(tableOrder.item_price)}
                </div>
              </a>
            ))}
          </div>
          {/* <div className="box flex p-5 mt-5">
                <input
                  type="text"
                  className="form-control py-3 px-4 w-full bg-slate-100 border-slate-200/60 pr-10"
                  placeholder="Use coupon code..."
                />
                <button className="btn btn-primary ml-2">Apply</button>
              </div> */}
          <TaxInfo taxes={taxes} order={tableOrder} />

          <div className="flex mt-5">
            <button className="btn w-32 border-slate-300 dark:border-darkmode-400 text-slate-500">
              Clear Items
            </button>
            <button
              className="btn btn-primary w-32 shadow-md ml-auto"
              onClick={handleCharge}
            >
              Charge
            </button>
          </div>
        </div>
      </div>
      {/* BEGIN: New Order Modal */}
      <Modal
        show={newOrderModal}
        onHidden={() => {
          setNewOrderModal(false);
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">New Order</h2>
        </ModalHeader>
        <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
          <div className="col-span-12">
            <label htmlFor="pos-form-1" className="form-label">
              Name
            </label>
            <input
              id="pos-form-1"
              type="text"
              className="form-control flex-1"
              placeholder="Customer name"
            />
          </div>
          <div className="col-span-12">
            <label htmlFor="pos-form-2" className="form-label">
              Table
            </label>
            <input
              id="pos-form-2"
              type="text"
              className="form-control flex-1"
              placeholder="Customer table"
            />
          </div>
          <div className="col-span-12">
            <label htmlFor="pos-form-3" className="form-label">
              Number of People
            </label>
            <input
              id="pos-form-3"
              type="text"
              className="form-control flex-1"
              placeholder="People"
            />
          </div>
        </ModalBody>
        <ModalFooter className="text-right">
          <button
            type="button"
            onClick={() => {
              setNewOrderModal(false);
            }}
            className="btn btn-outline-secondary w-32 mr-1"
          >
            Cancel
          </button>
          <button type="button" className="btn btn-primary w-32">
            Create Ticket
          </button>
        </ModalFooter>
      </Modal>
      {/* END: New Order Modal */}
      {/* BEGIN: Add Item Modal */}
      <Modal
        show={addItemModal}
        onHidden={() => {
          setAddItemModal(false);
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">
            {$f()[0].foods[0].name}
          </h2>
        </ModalHeader>
        <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
          <div className="col-span-12">
            <label htmlFor="pos-form-4" className="form-label">
              Quantity
            </label>
            <div className="flex flex-1">
              <button
                type="button"
                className="btn w-12 border-slate-200 bg-slate-100 dark:bg-darkmode-700 dark:border-darkmode-500 text-slate-500 mr-1"
              >
                -
              </button>
              <input
                id="pos-form-4"
                type="text"
                className="form-control w-24 text-center"
                placeholder="Item quantity"
                value="2"
                onChange={() => {}}
              />
              <button
                type="button"
                className="btn w-12 border-slate-200 bg-slate-100 dark:bg-darkmode-700 dark:border-darkmode-500 text-slate-500 ml-1"
              >
                +
              </button>
            </div>
          </div>
          <div className="col-span-12">
            <label htmlFor="pos-form-5" className="form-label">
              Notes
            </label>
            <textarea
              id="pos-form-5"
              className="form-control"
              placeholder="Item notes"
            ></textarea>
          </div>
        </ModalBody>
        <ModalFooter className="text-right">
          <button
            type="button"
            onClick={() => {
              setAddItemModal(false);
            }}
            className="btn btn-outline-secondary w-24 mr-1"
          >
            Cancel
          </button>
          <button type="button" className="btn btn-primary w-24">
            Add Item
          </button>
        </ModalFooter>
      </Modal>
      {/* END: Add Item Modal */}
    </>
  );
}

export default Main;
