import { Button, Link } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";

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

export default function AllEquipment() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const [dimension, setDimension] = useState("");
  const [lastServiceDate, setLastServiceDate] = useState("");
  const [nextServiceDate, setNextServiceDate] = useState("");
  const [photo, setPhoto] = useState("");
  const [type, setType] = useState("");
  const [UpdateModal, setUpdateModal] = useState(false);
  const [UpdateItem, setUpdateItem] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [addNewModal, setIsNewOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const maxDate = new Date();
  const [year, setYear] = useState(new Date());

  const handleYearChange = (date) => {
    setYear(date);
  };

  const initialValues = {
    code: "",
    name: "",
    description: "",
    quantity: 0,
  };

  const validationSchema = Yup.object().shape({
    // code: Yup.string().required("Required"),
    // name: Yup.string().required("Required"),
    // type: Yup.string().required("Required"),
    // yom: Yup.number().required("Required"),
    // dimension: Yup.string().required("Required"),
  });

  useEffect(() => {
    axios
      .get("http://localhost:8020/equipment")
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
      .delete(`http://localhost:8020/equipment/delete/${id} `)
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
      .post(`http://localhost:8020/equipment/add`, {
        Id: values.code,
        name: values.name,
        type: type,
        YOM: year,
        dimension: values.dimension,
        last_service_date: startDate,
        next_service_date: endDate,
      })
      .then(() => {
        toast.success("Added Successfully!!");
        setIsNewOpen(false);
      })
      .catch(() => {
        toast.error("error!!");
      });
  }

  function getOne(id) {
    const response = axios
      .get(`http://localhost:8020/equipment/get/${id}`)
      .then((response) => {
        console.log(response?.data?._id);
        setUpdateItem(response?.data?._id);
        const yearOfManufacture = new Date(response?.data?.YOM);
        const lastServiceDate = new Date(response?.data?.last_service_date);
        const nextServiceDate = new Date(response?.data?.next_service_date);
        if (
          yearOfManufacture != undefined ||
          lastServiceDate != undefined ||
          nextServiceDate != undefined
        ) {
          setIsOpen(true);
          setCode(response?.data?.Id);
          setName(response?.data?.name);
          setType(response?.data?.type);
          setYear(yearOfManufacture);
          setDimension(response?.data?.dimension);
          setLastServiceDate(lastServiceDate);
          setNextServiceDate(nextServiceDate);
        }

        console.log(response?.data);
      });
  }
  function updateItem(values) {
    const response = axios
      .put(`http://localhost:8020/equipment/updateOne/${UpdateItem}`, {
        Id: values.code,
        name: values.name,
        type: type,
        YOM: year,
        dimension: values.dimension,
        last_service_date: startDate,
        next_service_date: endDate,
      })
      .then((response) => {
        toast.success("update Successful");
        setIsOpen(false);
      })
  }

  return (
    <section className="table-auto overflow-y-scroll h-screen pb-10">
      <div className="w-full bg-gray-100 py-10 text-center">
        <h1 className="text-2xl">Equipment Details</h1>
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
                  Equipment Code
                </th>
                <th scope="col" class="px-6 py-3">
                  Equipment Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Type
                </th>
                <th scope="col" class="px-6 py-3">
                  Year Of Made
                </th>
                <th scope="col" class="px-6 py-3">
                  Dimension
                </th>
                <th scope="col" class="px-6 py-3">
                  Last Service Day
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Next Service Day
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
                    {item.Id}
                  </th>
                  <td class="px-6 py-4">{item.name}</td>
                  <td class="px-6 py-4">{item.type}</td>
                  <td class="px-6 py-4">{new Date(item.YOM).getFullYear()}</td>
                  <td class="px-6 py-4">{item.dimension}</td>
                  <td class="px-6 py-4">
                    {" "}
                    {new Date(item.last_service_date).toLocaleDateString(
                      "en-US",
                      { day: "numeric", month: "numeric", year: "numeric" }
                    )}{" "}
                  </td>
                  <td class="px-6 py-4">
                    {" "}
                    {new Date(item.next_service_date).toLocaleDateString(
                      "en-US",
                      { day: "numeric", month: "numeric", year: "numeric" }
                    )}{" "}
                  </td>
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
                            "Are you sure you want to delete this Equipment ?"
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
                    <p className="font-semibold">Equipment Code</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="code"
                      required={true}
                    />
                  </div>

                  {errors.code && touched.code ? (
                    <div className="text-red-500 text-xs">{errors.code}</div>
                  ) : null}
                </div>

                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Equipment Name </p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="name"
                      required={true}
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
                    <p className="font-semibold">Type</p>
                  </div>
                  <div className="ll">
                    <select
                      required={true}
                      className="w-full outline-2 border p-3"
                      value={type}
                      onChange={(event) => {
                        setType(event.target.value);
                      }}
                    >
                      <option className="p-3" value="Treadmills">
                        Treadmills
                      </option>
                      <option className="p-3" value="Rowing Machine">
                        Rowing Machine
                      </option>
                      <option className="p-3" value="Dumbbell Set">
                        Dumbbell Set
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Year Of Made</p>
                  </div>
                  <DatePicker
                    selected={year}
                    onChange={handleYearChange}
                    dateFormat="yyyy"
                    showYearPicker
                    isClearable
                    placeholderText="Select year"
                    maxDate={maxDate}
                    className="border p-3 my-2 rounded-md w-full"
                  />
                </div>
                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Dimension</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="dimension"
                      required={true}
                    />
                  </div>
                </div>

                <div className="flex-col w-full">
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">last Service Date</p>
                    </div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      maxDate={maxDate}
                      isClearable
                      className="border p-3 my-2 rounded-md w-full"
                    />

                    <ErrorMessage
                      component="div"
                      className="text-red-500 text-xs"
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
                    <p className="font-semibold">Next Service Date</p>
                  </div>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={maxDate}
                    isClearable
                    className="border p-3 my-2 rounded-md w-full"
                  />

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
                      setIsNewOpen(false);
                    }}
                  >
                    close
                  </button>
                  <button
                    className="bg-green-800 w-1/2 text-white py-3 hover:bg-green-500"
                    type="submit"
                  >
                    Create
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
              type: type,
              yom: year,
              dimension: dimension,
              lastServiceDate: lastServiceDate,
              nextServiceDate: nextServiceDate,
            }}
            validationSchema={validationSchema}
            onSubmit={updateItem}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="flex-col w-full overflow-auto">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Equipment Code</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="code"
                      required={true}
                    />
                  </div>

                  {errors.code && touched.code ? (
                    <div className="text-red-500 text-xs">{errors.code}</div>
                  ) : null}
                </div>

                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Equipment Name </p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="name"
                      required={true}
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
                    <p className="font-semibold">Type</p>
                  </div>
                  <div className="ll">
                    <select
                      required={true}
                      className="w-full outline-2 border p-3"
                      value={type}
                      onChange={(event) => {
                        setType(event.target.value);
                      }}
                    >
                      <option className="p-3" value="Treadmills">
                        Treadmills
                      </option>
                      <option className="p-3" value="Rowing Machine">
                        Rowing Machine
                      </option>
                      <option className="p-3" value="Dumbbell Set">
                        Dumbbell Set
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Year Of Made</p>
                  </div>
                  <DatePicker
                    selected={year}
                    onChange={handleYearChange}
                    dateFormat="yyyy"
                    showYearPicker
                    isClearable
                    placeholderText="Select year"
                    maxDate={maxDate}
                    className="border p-3 my-2"
                  />
                </div>
                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Dimension</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="dimension"
                      required={true}
                    />
                  </div>
                </div>

                <div className="flex-col w-full">
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">last Service Date</p>
                    </div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      maxDate={maxDate}
                      isClearable
                      className="border p-3 my-2"
                    />

                    <ErrorMessage
                      component="div"
                      className="text-red-500 text-xs"
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
                    <p className="font-semibold">Next Service Date</p>
                  </div>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={maxDate}
                    isClearable
                    className="border p-3 my-2"
                  />

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
