import { useEffect, useState } from "react";
import { GoMoon, GoSun } from "react-icons/go";
import {
  RxBarChart,
  RxCross1,
  RxDashboard,
  RxGear,
  RxHamburgerMenu,
  RxLightningBolt,
} from "react-icons/rx";
import Counter from "./Counter";

const sidebarLinks = [
  { Label: "Dashboard", path: "/", icon: <RxDashboard /> },
  { Label: "Voltage Monitor", path: "/", icon: <RxLightningBolt /> },
  { Label: "Current Analysis", path: "/", icon: <RxBarChart /> },
  { Label: "Settings", path: "/", icon: <RxGear /> },
];

const Switch = () => {
  const [switchState, setSwitchState] = useState("off");
  const [count, setCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (count > 0) {
      setSwitchState("on");
    } else if (count === 0) {
      setSwitchState("off");
    }

    if (count === 10) {
      setIsToastOpen(true);
      setToastMessage("Caution: High voltage detected!");
    } else if (count === 20) {
      setIsToastOpen(true);
      setToastMessage("Warning: Critical voltage level reached!");
    }
  }, [count]);

  useEffect(() => {
    let timer;
    if (isToastOpen) {
      timer = setTimeout(() => {
        setIsToastOpen(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isToastOpen]);

  const closeToast = () => setIsToastOpen(false);
  const sidebarToggle = () => setIsSidebarOpen((prev) => !prev);
  const toggleSwitch = () => {
    setSwitchState((prev) => (prev === "off" ? "on" : "off"));
    setCount((prev) => (switchState === "off" ? 1 : 0));
  };
  const increaseCount = () => setCount((prev) => prev + 1);
  const decreaseCount = () => setCount((prev) => (prev <= 0 ? 0 : prev - 1));

  return (
    <div
      className={`min-h-screen ${
        switchState === "on"
          ? "bg-gradient-to-r from-blue-400 to-purple-500"
          : "bg-gradient-to-r from-gray-800 to-gray-900"
      } transition-all duration-500`}
    >
      <nav className="bg-indigo-700 py-3 sm:py-4 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          <button onClick={sidebarToggle} className="md:hidden">
            <RxHamburgerMenu size={24} />
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center flex items-center">
            <RxLightningBolt className="mr-2" /> Voltage Monitor Pro
          </h1>
          <ul className="hidden md:flex space-x-4 lg:space-x-8">
            {sidebarLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.path}
                  className="text-sm lg:text-base flex items-center py-1 px-2 lg:py-2 lg:px-4 text-gray-300 hover:text-white rounded-lg transition-colors duration-200"
                >
                  {link.Label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-4 sm:gap-8 px-4 py-4 sm:py-8">
        <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-8 md:mb-0 w-full md:w-1/2 transform transition-all duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-indigo-600 flex items-center justify-center">
            <RxLightningBolt className="mr-2 text-yellow-500" /> Power Control
            Center
          </h2>
          <div className="flex flex-col items-center">
            <button
              onClick={toggleSwitch}
              className={`mb-4 sm:mb-6 px-6 sm:px-10 py-3 sm:py-5 flex items-center gap-2 sm:gap-3 justify-center text-lg sm:text-xl md:text-2xl font-bold rounded-full transition-all duration-300 ${
                switchState === "on"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-red-500 text-white hover:bg-red-600"
              } shadow-lg`}
            >
              {switchState === "on" ? "POWER ON" : "POWER OFF"}
              <span className="ml-1 sm:ml-2 text-2xl sm:text-3xl">
                {switchState === "on" ? <GoSun /> : <GoMoon />}
              </span>
            </button>
            <p className="text-lg sm:text-xl text-gray-700 mb-2 sm:mb-4">
              System Status:{" "}
              <span
                className={`font-bold ${
                  switchState === "on" ? "text-green-500" : "text-red-500"
                }`}
              >
                {switchState.toUpperCase()}
              </span>
            </p>
            <p className="text-sm sm:text-base text-gray-600 text-center max-w-md">
              Toggle the power switch to activate or deactivate the voltage
              monitoring system. When powered on, you can adjust and monitor
              voltage levels.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6 md:p-8 w-full md:w-1/2">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-indigo-600 flex items-center justify-center">
            <RxLightningBolt className="mr-2 text-yellow-500" /> Voltage Control
            Panel
          </h3>
          <Counter
            count={count}
            increaseCount={increaseCount}
            decreaseCount={decreaseCount}
          />
        </div>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white h-full w-64 p-6 shadow-2xl transform transition-transform duration-300 ease-in-out translate-x-0">
            <button onClick={sidebarToggle} className="mb-6">
              <RxCross1 size={24} />
            </button>
            <ul className="space-y-4">
              {sidebarLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="flex items-center py-2 px-4 text-gray-700 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
                  >
                    <span className="mr-3 text-indigo-600">{link.icon}</span>
                    {link.Label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isToastOpen && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white py-4 px-6 rounded-lg shadow-xl transition-all duration-300 transform translate-y-0 opacity-100">
          <p className="font-medium ">{toastMessage}</p>
          <button
            onClick={closeToast}
            className="absolute top-1 right-1 text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
          >
            <RxCross1 />
          </button>
        </div>
      )}

      
    </div>
  );
};

export default Switch;
