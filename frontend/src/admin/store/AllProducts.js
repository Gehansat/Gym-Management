import { Button, Link } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "20%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};


export default function AllProducts() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [UpdateModal, setUpdateModal] = useState(false);
  const [UpdateItem, setUpdateItem] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [addNewModal, setIsNewOpen] = useState(false);
  const initialValues = {
    code: "",
    name: "",
    description: "",
    quantity: 0,
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    price: Yup.number()
      .required("Required")
      .positive("Must be greater than zero")
      .integer("Must be an integer"),
    quantity: Yup.number()
      .required("Required")
      .positive("Must be greater than zero")
      .integer("Must be an integer"),
  });

  useEffect(() => {
    axios
      .get("http://localhost:8020/item/")
      .then((response) => {
        if (response) {
          setItems(response.data);
        } else {
          toast.error("Error While Fetching Data!!");
        }
      })
      .catch((error) => toast.error(error));
  }, [items]);

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:8020/item/delete/${id} `)
      .then(() => {
        toast.error("Deleted Successfully!!");
      })
      .catch((err) => {
        alert(err);
      });
  };

  function AddProduct(values) {
    console.log(values);

    const response = axios
      .post(`http://localhost:8020/item/add`, {
        item_code: values.code,
        item_name: values.name,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
        image: proImg,
      })
      .then(() => {
        toast.success("Added Successfully!!");
        setIsNewOpen(false);
      })
      .catch(() => {
        toast.error("error!!");
      });
  }

  const [proImg, setProImg] = useState("");
  // const [Category, setCategory] = useState("");
  // //Image to Base64
  const [File, setFile] = useState("");
  const [Base64Url, setBase64Url] = useState("");
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;

        console.log(baseURL);
        setProImg(baseURL);
        console.log("Base", proImg);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };
  const handleFileInputChange = (e) => {
    debugger;
    console.log(e.target.files[0]);
    let { file } = File;

    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;

        console.log("File Is", file);
        setBase64Url(result);
        setFile(file);
      })
      .catch((err) => {
        console.log(err);
      });
    setFile(e.target.file);
  };


  function getOne(id) {
    const response = axios
      .get(`http://localhost:8020/item/get/${id}`)
      .then((response) => {
        setIsOpen(true);
        setCode(response?.data?.item_code);
        setName(response?.data?.item_name);
        setDescription(response?.data?.description);
        setPrice(response?.data?.price);
        setPhoto(response?.data?.photo);
        setQuantity(response?.data?.quantity);
        setUpdateItem(response?.data?._id);
        console.log(response?.data?._id);
      });
  }
  function updateItem(values) {
    const response = axios
      .put(`http://localhost:8020/item/updateOne/${UpdateItem}`, {
        item_code: values.code,
        item_name: values.name,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
      })
      .then((response) => {
        toast.success("update Successful");
        setIsOpen(false);
      });
  }

  return (
    <section className="table-auto overflow-y-scroll h-screen pb-10">
      <div className="w-full bg-gray-100 py-10 text-center">
        <h1 className="text-2xl">Store Details</h1>
      </div>
      <div className="w-full flex flex-row-reverse px-10 mt-10">
        <button
          type="button"
          onClick={() => {
            setIsNewOpen(true);
          }}
          class="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {" "}
          Add New
          <svg
            aria-hidden="true"
            class="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div className=" px-10 mt-10 ">
        <div class=" shadow-md sm:rounded-lg ">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Item Code
                </th>
                <th scope="col" class="px-6 py-3">
                  Item Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Description
                </th>
                <th scope="col" class="px-6 py-3">
                  price
                </th>
                <th scope="col" class="px-6 py-3">
                  quantity
                </th>
                <th scope="col" class="px-6 py-3">
                  Image
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.item_code}
                  </th>
                  <td class="px-6 py-4">{item.item_name}</td>
                  <td class="px-6 py-4">{item.description}</td>
                  <td class="px-6 py-4">{item.price}</td>
                  <td class="px-6 py-4">{item.quantity}</td>
                  <td class="px-6 py-4"><img src={item.image} style={{width:"64px" , height:"64px"}}></img></td>
                  <td class="px-1 py-4 w-full justify-center flex gap-4">
                    <button
                      className="font-medium text-yellow-300 hover:text-yellow-100"
                      onClick={() => {
                        getOne(item._id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>

                    <a
                      href="#"
                      class="font-medium"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this Item ?"
                          )
                        ) {
                          deleteItem(item._id);
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-red-500 hover:text-red-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={addNewModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          {" "}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={AddProduct}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="flex-col w-full overflow-auto">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Item Code</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="code"
                    />
                  </div>

                  {errors.code && touched.code ? (
                    <div className="text-red-500 text-xs">{errors.code}</div>
                  ) : null}
                </div>

                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Item Name</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="name"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="name"
                  />
                </div>
                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Description</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm py-10 px-2 my-1  rounded-md w-full"
                      type="text"
                      name="description"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="description"
                  />
                </div>
                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Price</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="number"
                      name="price"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="price"
                  />
                </div>

                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Quantity</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="number"
                      name="quantity"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="quantity"
                  />
                </div>

                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">image</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      onChange={(e) => handleFileInputChange(e)}
                      name="image"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="image"
                  />
                </div>

                <div className="w-full flex gap-2">
                  <button
                    className="bg-red-800 w-1/2 text-white py-3 hover:bg-red-500"
                    onClick={() => {
                      setIsNewOpen(false);
                    }}
                  >
                    close
                  </button>
                  <button
                    className="bg-green-800 w-1/2 text-white py-3 hover:bg-green-500"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          {" "}
          <Formik
            initialValues={{
              code: code,
              name: name,
              description: description,
              price: price,
              quantity: quantity,
              image : proImg
            }}
            validationSchema={validationSchema}
            onSubmit={updateItem}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="flex-col w-full overflow-auto">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Item Code</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="code"
                      setFieldValue={code}
                    />
                  </div>

                  {errors.code && touched.code ? (
                    <div className="text-red-500 text-xs">{errors.code}</div>
                  ) : null}
                </div>

                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Item Name</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="name"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="name"
                  />
                </div>
                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Description</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm py-10 px-2 my-1  rounded-md w-full"
                      type="text"
                      name="description"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="description"
                  />
                </div>
                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Price</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="number"
                      name="price"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="price"
                  />
                </div>

                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Quantity</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="number"
                      name="quantity"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="quantity"
                  />
                </div>

                <div className="w-full flex gap-2">
                  <button
                    className="bg-red-800 w-1/2 text-white py-3 hover:bg-red-500"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    close
                  </button>
                  <button
                    className="bg-green-800 w-1/2 text-white py-3 hover:bg-green-500"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </section>
  );
}
