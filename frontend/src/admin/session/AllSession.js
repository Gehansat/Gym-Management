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

export default function AllSessions() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [UpdateModal, setUpdateModal] = useState(false);
  const [UpdateItem, setUpdateItem] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [addNewModal, setIsNewOpen] = useState(false);
  const [year, setYear] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const maxDate = new Date();
  const initialValues = {
    code: "",
    name: "",
    description: "",
    quantity: 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  useEffect(() => {
    axios
      .get("http://localhost:8020/session/")
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
      .delete(`http://localhost:8020/session/delete/${id} `)
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
      .post(`http://localhost:8020/session/add`, {
        instructor_name: values.name,
        description: values.description,
        location: values.location,
        date: startDate,
        start_time: startTime,
        end_time: endTime,
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
      .get(`http://localhost:8020/session/get/${id}`)
      .then((response) => {
        setIsOpen(true);
        setUpdateItem(response?.data?._id);
        const startingDate = new Date(response?.data?.date);
        const startingTime = new Date(response?.data?.start_time);
        const endingTime = new Date(response?.data?.end_time);
        if (
          startingDate != undefined ||
          startingTime != undefined ||
          endingTime != undefined
        ) {
          setIsOpen(true);

          setName(response?.data?.instructor_name);
          setDescription(response?.data?.description);
          setLocation(response?.data?.location);
          setStartDate(startingDate);
          setStartTime(startingTime);
          setEndTime(endingTime);
        }
      });
  }
  function updateItem(values) {
    const response = axios
      .put(`http://localhost:8020/session/update/${UpdateItem}`, {
        instructor_name: values.name,
        description: values.description,
        location: values.location,
        date: startDate,
        start_time: startTime,
        end_time: endTime,
      })
      .then((response) => {
        toast.success("update Successful");
        setIsOpen(false);
      });
  }

  return (
    <section className="table-auto overflow-y-scroll h-screen pb-10">
      <div className="w-full bg-gray-100 py-10 text-center">
        <h1 className="text-2xl">Session Details</h1>
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
                  Instructor Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Description
                </th>
                <th scope="col" class="px-6 py-3">
                  Location
                </th>
                <th scope="col" class="px-6 py-3">
                  Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Start Time
                </th>
                <th scope="col" class="px-6 py-3">
                  End Time
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
                    {item.instructor_name}
                  </th>
                  <td class="px-6 py-4">{item.description}</td>
                  <td class="px-6 py-4">{item.location}</td>
                  <td class="px-6 py-4">
                    {" "}
                    {new Date(item.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}{" "}
                  </td>
                  <td class="px-6 py-4">
                    {new Date(item.start_time).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </td>
                  <td class="px-6 py-4">
                    {new Date(item.end_time).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
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
                            "Are you sure you want to delete this Session ?"
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
                    <p className="font-semibold">Instructor Name</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="name"
                    />
                  </div>

                  {errors.code && touched.code ? (
                    <div className="text-red-500 text-xs">{errors.code}</div>
                  ) : null}
                </div>

                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Location</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="location"
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
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">Start date</p>
                    </div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      minDate={maxDate}
                      isClearable
                      className="border p-3 my-2 rounded-md w-full"
                    />
                  </div>
                </div>

                <div className="flex-col w-full">
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">Start Time</p>
                    </div>
                    <DatePicker
                      selected={startTime}
                      onChange={(date) => setStartTime(date)}
                      showTimeSelect
                      dateFormat="h:mm aa"
                      timeIntervals={15}
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
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">End Time</p>
                    </div>
                    <DatePicker
                      selected={endTime}
                      onChange={(date) => setEndTime(date)}
                      showTimeSelect
                      dateFormat="h:mm aa"
                      timeIntervals={15}
                      className="border p-3 my-2 rounded-md w-full"
                    />
                  </div>
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
              name: name,
              description: description,
              location: location,
              startDate: startDate,
              startTime: startTime,
              endTime: endTime,
            }}
            validationSchema={validationSchema}
            onSubmit={updateItem}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="flex-col w-full overflow-auto">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Instructor Name</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="name"
                    />
                  </div>

                  {errors.code && touched.code ? (
                    <div className="text-red-500 text-xs">{errors.code}</div>
                  ) : null}
                </div>

                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Location</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="location"
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
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">Start date</p>
                    </div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      maxDate={maxDate}
                      isClearable
                      className="border p-3 my-2"
                    />
                  </div>
                </div>

                <div className="flex-col w-full">
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">Start Time</p>
                    </div>
                    <DatePicker
                      selected={startTime}
                      onChange={(date) => setStartTime(date)}
                      showTimeSelect
                      dateFormat="h:mm aa"
                      timeIntervals={15}
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
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">End Time</p>
                    </div>
                    <DatePicker
                      selected={endTime}
                      onChange={(date) => setEndTime(date)}
                      showTimeSelect
                      dateFormat="h:mm aa"
                      timeIntervals={15}
                      className="border p-3 my-2"
                    />
                  </div>
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
