import { ClassicEditor, Lucide } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import api from "../../../../services/api";
import { uoms } from "../../../../utils/constant";
import Material from "./Material";
import Variant from "./Variant";
import { helper } from "../../../../utils/helper";
import { useNavigate } from "react-router-dom";
const schema = yup.object({
  name: yup.string().required(),
  category_id: yup.string().required(),
  description: yup.string().required("Description is required"),
  // photo: yup.string().required(),
  // isFavourite: yup.boolean().required(),
  // price: yup.number().required(),
  // uom: yup.string().required(),
});

function Main() {
  const [editorData, setEditorData] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) => {
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          setValue("photo", reader.result);
        };
        return file;
      })
    );
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
  });
  useEffect(() => {
    setLoading(true);
    getCategories();
    setLoading(false);
  }, []);
  async function getCategories() {
    let response = await api.get("categories");
    setCategories(response.data);
  }

  const form = useForm({
    defaultValues: {
      variant: [],
      material: [],
    },
    resolver: yupResolver(schema),
  });
  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    setValue,
  } = form;

  const variantForm = useFieldArray({
    control,
    name: "variant",
  });

  const materialForm = useFieldArray({
    control,
    name: "material",
  });

  const handleCreate = async (data) => {
    data.variant.map((variant) => {
      variant.variant_code = `PRO/${helper.sanitizeString(
        data.name
      )}/${helper.sanitizeString(variant.name)}/${Math.floor(
        Date.now() / 1000
      )}`;
    });
    try {
      const result = await api.post("products", { ...data });
      navigate("/produk/produk");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Tambah Produk</h2>
      </div>
      <div className="grid grid-cols-11 gap-x-6 mt-5 pb-20">
        <div className="intro-y col-span-11 2xl:col-span-9">
          <Link to="/produk/produk">
            <button className="btn btn-primary shadow-md mr-2 mb-3">
              Kembali
            </button>
          </Link>
          <FormProvider {...form}>
            <form
              className="validate-form"
              onSubmit={handleSubmit(handleCreate)}
            >
              {/* BEGIN: Uplaod Product */}
              <div className="intro-y box p-5">
                <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                  <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                    <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" />{" "}
                    Upload Product
                  </div>
                  <div className="mt-5">
                    <div className="form-inline items-start flex-col xl:flex-row mt-10">
                      <div className="form-label w-full xl:w-64 xl:!mr-10">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Foto Produk</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                            </div>
                          </div>
                          <div className="leading-relaxed text-slate-500 text-xs mt-3">
                            <div>
                              Format gambar .jpg .jpeg .png dan size minimal 300
                              x 300 pixels .
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-3 xl:mt-0 flex-1 border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4">
                        <div className="grid grid-cols-10 gap-5 pl-4 pr-5">
                          {files.map((file, key) => (
                            <div
                              key={key}
                              className="col-span-5 md:col-span-2 h-28 relative image-fit cursor-pointer zoom-in"
                            >
                              <img
                                className="rounded-md"
                                alt="Picture of product"
                                src={file.preview}
                                onLoad={() => {
                                  URL.revokeObjectURL(file.preview);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        <div
                          className="px-4 pb-4 mt-5 flex items-center justify-center cursor-pointer relative"
                          {...getRootProps()}
                        >
                          <Lucide icon="Image" className="w-4 h-4 mr-2" />
                          {isDragActive ? (
                            <p className="text-primary mr-1">
                              Drop the files here ...
                            </p>
                          ) : (
                            <p className="text-primary mr-1">
                              Drag 'n' drop some files here, or click to select
                              files
                            </p>
                          )}
                          <input
                            id="horizontal-form-1"
                            type="file"
                            className="w-full h-full top-0 left-0 absolute opacity-0"
                            {...register("photo")}
                            {...getInputProps()}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BEGIN: Product Information */}
              <div className="intro-y box p-5 mt-5">
                <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                  <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                    <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" />{" "}
                    Product Information
                  </div>
                  <div className="mt-5">
                    {/* NAME */}
                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Nama Produk</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-3 xl:mt-0 flex-1">
                        <input
                          {...register("name")}
                          className={classnames({
                            "form-control": true,
                            "border-danger": errors.name,
                          })}
                          onChange={(data) => {
                            setValue(
                              "code",
                              `PRO/${helper.sanitizeString(
                                data.target.value
                              )}/${Math.floor(Date.now() / 1000)}`
                            );
                          }}
                          type="text"
                          placeholder="Nama Produk"
                        />
                        {errors.name && (
                          <div className="text-danger mt-2">
                            {errors.name.message}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* CODE */}
                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">SKU</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-3 xl:mt-0 flex-1">
                        <input
                          {...register("code")}
                          className={classnames({
                            "form-control": true,
                            "border-danger": errors.name,
                          })}
                          type="text"
                          readOnly
                        />
                        {errors.name && (
                          <div className="text-danger mt-2">
                            {errors.name.message}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* CATEGORY */}
                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Kategori</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-3 xl:mt-0 flex-1">
                        <select
                          id="category"
                          {...register("category_id")}
                          className={classnames({
                            "form-select": true,
                            "border-danger": errors.category,
                          })}
                        >
                          {categories.map((category, index) => (
                            <option key={index} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <div className="text-danger mt-2">
                            {errors.category.message}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* DESCRIPTION  */}
                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Deskripsi</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-3 xl:mt-0 flex-1">
                        <input type="hidden" {...register("description")} />
                        <ClassicEditor
                          value={editorData}
                          onChange={(data) => {
                            setEditorData(data);
                            setValue("description", data);
                          }}
                        />
                        <div className="form-help text-right">
                          Maximum character 0/2000
                        </div>
                        {errors.description && (
                          <div className="text-danger mt-2">
                            {errors.description.message}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* FAVOURITE  */}
                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Produk Favorit</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-3 xl:mt-0 flex-1">
                        <div className="form-check form-switch">
                          <input
                            id="product-status-active"
                            className="form-check-input"
                            type="checkbox"
                            {...register("isFavourite")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="product-status-active"
                          >
                            Produk Favorit
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* HARGA */}
                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Harga</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-3 xl:mt-0 flex-1">
                        <input
                          id="product-stock"
                          type="number"
                          className="form-control"
                          placeholder="Input Product Price"
                          {...register("price")}
                        />
                      </div>
                    </div>
                    {/* UOM */}
                    <div className="form-inline items-start flegx-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Satuan</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-3 xl:mt-0 flex-1">
                        <select
                          id="satuan"
                          className="form-select"
                          {...register("uom")}
                        >
                          {uoms.map((uom, index) => (
                            <option key={index} value={uom}>
                              {uom}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Variant {...variantForm} />

              <Material {...materialForm} />

              <div className="flex justify-end flex-col md:flex-row gap-2 mt-5">
                <button
                  type="button"
                  className="btn py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 w-full md:w-52"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn py-3 btn-primary w-full md:w-52"
                >
                  Save
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}

export default Main;
