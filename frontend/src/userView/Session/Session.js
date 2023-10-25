import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Session() {
  const [store, setStore] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8020/session/")
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
          <center><h2 className="font-semibold text-3xl">Sessions</h2></center>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:w-full h-full overflow-auto">
          {store.map((item) => (
            <div className=" mb-4 " key={item._id}>
              <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <center>instructor {item.instructor_name}</center>
                    </h5>

                <div class="p-5">
                  <a href="#">
                    <h6 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.location}
                    </h6>
                  </a>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {item.description}
                  </p>
                  
                  <p class="mb-3 font-normal text-gray-100 dark:text-gray-400 text-lg" >
                    Start Time : {item.start_time}
                  </p>
                  <p class="mb-3 font-normal text-gray-100 dark:text-gray-400 text-lg" >
                    End Time : {item.end_time}
                  </p>
                  
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

export default Session;
