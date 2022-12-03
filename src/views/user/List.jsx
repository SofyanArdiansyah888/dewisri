import { LoadingIcon, Lucide } from "@/base-components";
import { useState } from "react";
import { useUsers } from "../../hooks/useUser";
import CreateModal from "../user/CreateModal";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

function UserList() {
  const [modal, setModal] = useState(false);
  const [modalEdit, setmodalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const { loading, data } = useUsers();
  const [search, setSearch] = useState("");

  const filterData = () => {
      return data?.filter((item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setmodalEdit(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setModalDelete(true);
  };

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">List User</h2>

      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-between mt-2">
          {/* <Link to="/user/create"> */}
          <button
            onClick={() => setModal(true)}
            className="btn btn-primary shadow-md mr-2"
          >
            Tambah User
          </button>
          {/* </Link> */}

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
        {loading ? (
          <div className="col-span-12 mt-12  flex flex-col justify-end items-center">
            <LoadingIcon icon="circles" className="w-16 h-16" />
          </div>
        ) : (
          ""
        )}

        {/* BEGIN: Users Layout */}
        {filterData()?.map((user, key) => (
          <div key={key} className="intro-y col-span-12 md:col-span-6">
            <div className="box">
              <div className="flex flex-col lg:flex-row items-center p-5">
                <div className="w-24 h-24 lg:w-12 lg:h-12 image-fit lg:mr-1">
                  <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 ">
                      {user.name
                        ? user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join(".")
                            .toUpperCase()
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="lg:ml-2 lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                  <a href="" className="font-medium capitalize">
                    {user.name}
                  </a>
                  <div className="text-slate-500 text-xs mt-0.5">
                    {user.role}
                  </div>
                </div>
                <div className="flex mt-4 lg:mt-0">
                  <button
                    className="btn btn-primary py-1 px-2 mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger py-1 px-2"
                    onClick={() => handleDelete(user)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* BEGIN: Users Layout */}
      </div>
      <CreateModal
        modal={modal}
        setModal={setModal}
      />
      <UpdateModal
        modal={modalEdit}
        setModal={setmodalEdit}
        user={selectedUser}
      />
      <DeleteModal
        modal={modalDelete}
        setModal={setModalDelete}
        user={selectedUser}
      />
    </>
  );
}

export default UserList;
