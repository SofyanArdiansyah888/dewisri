import { Lucide, Tippy } from "@/base-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../../hooks/useProduct";
import { baseUrlImage } from "../../../utils/constant";
import DeleteModal from "./DeleteModal";
function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedProduct, setselectedProduct] = useState();
  const { isLoading, data } = useProducts();
  const [search, setSearch] = useState("");

  const filterData = () => {
    return data?.filter((item) =>
      item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  const handleEdit = (product) => {
    setselectedProduct(product);
    setmodalEdit(true);
  };

  const handleDelete = (product) => {
    setselectedProduct(product);
    setModalDelete(true);
  };
  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Product List</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-between mt-2">
          <Link to="/produk/produk/create">
            <button className="btn btn-primary shadow-md mr-2">
              Tambah Produk Baru
            </button>
          </Link>

          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List -*/}
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
          <table className="table table-report -mt-2">
            <thead>
              <tr>
                <th className="whitespace-nowrap">FOTO</th>
                <th className="whitespace-nowrap">NAMA PRODUK</th>
                <th className="text-center whitespace-nowrap">HARGA</th>
                <th className="text-center whitespace-nowrap">KATEGORI</th>
                <th className="text-center whitespace-nowrap">Varian</th>
                <th className="text-center whitespace-nowrap">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {filterData()?.map((product, index) => (
                <tr key={index} className="intro-x">
                  <td className="w-40">
                    <div className="flex">
                      <div className="w-24 h-24 image-fit zoom-in">
                        <Tippy
                          tag="img"
                          alt={`Foto ${product.name}`}
                          className="rounded-full"
                          src={`${baseUrlImage}/products/${product.photo}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href="" className="font-medium whitespace-nowrap">
                      {product.name}
                    </a>
                  </td>
                  <td className="text-center">{product.price}</td>
                  <td className="text-center">{product?.category?.name}</td>
                  <td className="text-center font-semibold">
                    {product?.variant_names}
                  </td>
                  {/* <td className="w-40">
                    {product.isFavourite && <div
                      className={classnames({
                        "flex items-center justify-center": true,
                        "text-success": product.isFavourite,
                        "text-danger": !product.isFavourite,
                      })}
                    >
                      <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                      {product.isFavourite ? "Favorit" : "-"}
                    </div>}
                  </td> */}
                  <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                    
                      <Link to={`/produk/produk/${product.id}/update`}>
                        <a className="flex items-center mr-3">
                          <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "}
                          Edit
                        </a>
                      </Link>

                      <a
                        className="flex items-center text-danger"
                        onClick={() => handleDelete(product)}
                      >
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DeleteModal
          modal={modalDelete}
          setModal={setModalDelete}
          product={selectedProduct}
        />
        {/* END: Data List -*/}
        {/* BEGIN: Pagination -*/}
        {/* <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
          <nav className="w-full sm:w-auto sm:mr-auto">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronRight" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsRight" className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </nav>
          <select className="w-20 form-select box mt-3 sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </select>
        </div> */}
        {/* END: Pagination -*/}
      </div>
      {/* <DeleteModal
        modal={modalDelete}
        setModal={setModalDelete}
        product={selectedProduct}
      /> */}
    </>
  );
}

export default Main;
