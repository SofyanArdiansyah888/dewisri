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
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";
import { useOrderTable } from "../../hooks/useOrderTable";
import { useProducts } from "../../hooks/useProduct";
import { useTaxes } from "../../hooks/useTaxes";
import api from "../../services/api";
import { baseUrlImage } from "../../utils/constant";
import { formatRupiah } from "../../utils/formatter";
import CustomerInfo from "./CustomerInfo";
import TaxInfo from "./TaxInfo";
import VariantModal from "./VariantModal";

function Main() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [variantModal, setVariantModal] = useState(false);
  const [selectedMenus, setSelectedMenus] = useState();
  const [selectedProduct, setSelectedProduct] = useState();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: products } = useProducts();
  const { data: categories } = useCategory();
  const { data: taxes } = useTaxes();

  const handleGetData = (data) => {
    let temp = [];

    data?.products?.map((item) => {
      temp.push({
        product_id: item.id,
        product_name: item.pivot.product_name,
        variant_id: item.pivot.variant_id,
        variant_name: item.pivot.variant_name,
        quantity: item.pivot.quantity,
        item_price: item.pivot.item_price,
        description: item.pivot.description,
        created_at: item.pivot.created_at,
      });
      return item;
    });

    setSelectedMenus([...temp]);
  };

  const { data: tableOrder } = useOrderTable(id, handleGetData);

  const [search, setSearch] = useState("");

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
      <div className="intro-y  flex flex-col sm:flex-row justify-between mt-8">
        <h2 className="text-lg font-medium mr-auto">Point of Sale</h2>
        <Link to="/meja">
          <button className="btn btn-primary">Kembali</button>
        </Link>
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
                      <div
                        key="Allxxx"
                        className={`box px-4 py-3 cursor-pointer ${
                          selectedCategory === "All"
                            ? "bg-secondary"
                            : "bg-base"
                        }`}
                        onClick={() => setSelectedCategory("All")}
                      >
                        All
                      </div>
                      {categories
                        ? categories.map((category) => (
                            <div
                              key={category.id}
                              className={`box px-4 py-3 cursor-pointer ${
                                selectedCategory === category.name
                                  ? "bg-secondary"
                                  : "bg-base"
                              }`}
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
                      <div
                        onClick={() => {
                          if (product.available) {
                            setSelectedProduct(product);
                            setVariantModal(true);
                          }
                        }}
                        className={`flex flex-row justify-between gap-4 max-h-[90px]  m-2 ${
                          product.available ? "bg-gray-50" : "bg-red-200"
                        }  hover:bg-secondary rounded-md p-2`}
                      >
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
            {selectedMenus?.map((selectedMenu) => (
              <a
                key={selectedMenu.id}
                onClick={() => {
                  // if (product.available){
                  setSelectedProduct({ ...selectedMenu });
                  setVariantModal(true);
                  // }
                }}
                className="flex items-center p-3 cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md"
              >
                <div className="max-w-[50%] truncate mr-1">
                  {selectedMenu.product_name}
                </div>
                <div className="text-slate-500">x {selectedMenu.quantity}</div>
                <Lucide icon="Edit" className="w-4 h-4 text-slate-500 ml-2" />
                <div className="ml-auto font-medium">
                  {formatRupiah(selectedMenu.item_price)}
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
            <Link to={`/meja/${id}/transfer-order`}>
              <button className="btn w-32 border-slate-300 dark:border-darkmode-400 text-slate-500">
                Transfer Order
              </button>
            </Link>
            <button
              className="btn btn-primary w-32 shadow-md ml-auto"
              onClick={handleCharge}
            >
              Charge
            </button>
          </div>
        </div>
      </div>
      <VariantModal
        setVariantModal={setVariantModal}
        variantModal={variantModal}
        setSelectedMenus={setSelectedMenus}
        selectedMenus={selectedMenus}
        selectedProduct={selectedProduct}
      />
    </>
  );
}

export default Main;
