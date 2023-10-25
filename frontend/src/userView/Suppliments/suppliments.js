import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Suppliments() {
  const [store, setStore] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8020/item/")
      .then((response) => {
        setStore(response.data);
        if (store != undefined) {
          console.log(store);
        }
      })
      .catch((error) => console.error(error));
  }, [store]);

  return (
    <div>
      <Header />
      <section className="w-full m-10">
        <div>
          <center><h2 className="font-semibold text-3xl">Store</h2></center>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:w-full h-full overflow-auto">
          {store.map((item) => (
            <div className=" mb-4 " key={item._id}>
              <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-center">
                  <a href="#">
                    <img class="rounded-t-lg h-52" src={item.image} alt="" />
                  </a>
                </div>

                <div class="p-5">
                  <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.item_name}
                    </h5>
                  </a>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {item.description}
                  </p>
                  <p class="mb-3 font-normal text-gray-100 dark:text-gray-400 text-lg" >
                    Rs.{item.price}
                  </p>
                  <a
                    href="#"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Shop
                    <svg
                      aria-hidden="true"
                      class="w-4 h-4 ml-2 -mr-1"
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
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="row"></div>
      <Footer />
    </div>
  );
}

export default Suppliments;
