import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Members from "./members/ViewMembers";
import AllProducts from "./store/AllProducts";
import AllEquipment from "./equipment/AllEquipment";
import AllInstructors from "./Instructor/AllInstuctors";
import AllMembers from "./members/ViewMembers";
import AllSessions from "./session/AllSession";
import AllSalary from "./salary/ViewSalary";
import AllTeam from "./repairTeam/ViewTeam";
import MealPlan from "./mealPlan/mealPlan";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("home");
  let navigate = useNavigate();
  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-40" : "w-60 "
        } flex flex-col h-screen p-3 bg-gray-800 shadow duration-300`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
            <button onClick={() => setOpen(!open)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <button
                  onClick={() => setSelectedField("home")}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-slate-500 w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span className="text-gray-100">Home</span>
                </button>
              </li>
              <li className="rounded-sm">
                <button
                  onClick={() => setSelectedField("instructors")}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-slate-500 w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <span className="text-gray-100">Trainer</span>
                </button>
              </li>
              <li className="rounded-sm">
                <button
                  onClick={() => setSelectedField("members")}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-slate-500 w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <span className="text-gray-100">Members</span>
                </button>
              </li>
              <li className="rounded-sm">
                <button
                  onClick={() => setSelectedField("store")}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-slate-500 w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <span className="text-gray-100">Store</span>
                </button>
              </li>
              <li className="rounded-sm">
                <button
                  onClick={() => setSelectedField("equipment")}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-slate-500 w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <span className="text-gray-100">Equipment</span>
                </button>
              </li>
              <li className="rounded-sm">
                <button
                  onClick={() => setSelectedField("sessions")}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-slate-500 w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <span className="text-gray-100">Sessions</span>
                </button>
              </li>{" "}
              <li className="rounded-sm">
                <button
                  onClick={() => setSelectedField("salary")}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-slate-500 w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <span className="text-gray-100">Payment</span>
                </button>
              </li>
              <li className="rounded-sm">
                <button
                  onClick={() => setSelectedField("repair")}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-slate-500 w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <span className="text-gray-100">Repair Team</span>
                </button>
              </li>
              <li className="rounded-sm">
                <button
                  onClick={() => setSelectedField("meal")}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-slate-500 w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <span className="text-gray-100">Meal Plan</span>
                </button>
              </li>
              <li className="rounded-sm">
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-slate-500 w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="text-gray-100">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        {selectedField === "home" ? (
          <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
            <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
              <div className="text-sm font-medium text-gray-500 truncate">
                Total users
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                12,00
              </div>
            </div>
            <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
              <div className="text-sm font-medium text-gray-500 truncate">
                Total Profit
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                $ 450k
              </div>
            </div>
            <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
              <div className="text-sm font-medium text-gray-500 truncate">
                Total Orders
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                20k
              </div>
            </div>
          </div>
        ) : null}
        {selectedField === "instructors" ? <AllInstructors /> : null}
        {selectedField === "members" ? <AllMembers /> : null}
        {selectedField === "store" ? <AllProducts /> : null}
        {selectedField === "equipment" ? <AllEquipment /> : null}
        {selectedField === "sessions" ? <AllSessions /> : null}
        {selectedField === "salary" ? <AllSalary /> : null}
        {selectedField === "repair" ? <AllTeam /> : null}
        {selectedField === "meal" ? <MealPlan /> : null}
      </div>
    </div>
  );
}
