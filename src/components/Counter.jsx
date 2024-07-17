import { RxExclamationTriangle, RxLightningBolt, RxMinus, RxPlus } from "react-icons/rx";

export default function Counter({ count, increaseCount, decreaseCount }) {
  const getVoltageColor = () => {
    if (count < 3) return "text-blue-400";
    if (count < 7) return "text-green-400";
    if (count < 15) return "text-yellow-400";
    return "text-red-500";
  };

  const getVoltageStatus = () => {
    if (count < 3) return "Low";
    if (count < 7) return "Normal";
    if (count < 15) return "High";
    return "Critical";
  };

  return (
    <div className="bg-gray-100 rounded-lg p-3 sm:p-4 md:p-6 shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-800 flex items-center">
        <RxLightningBolt className="mr-2 text-yellow-500" /> Voltage Monitor
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
        Adjust the voltage levels using the controls below. Keep an eye on the
        voltage status to ensure optimal performance and safety.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6">
        <div
          className={`text-4xl sm:text-5xl font-bold ${getVoltageColor()} mb-3 sm:mb-0`}
        >
          {count}
          <span className="text-2xl sm:text-3xl ml-1">V</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={decreaseCount}
            className="bg-blue-500 text-white p-2 rounded-l-lg hover:bg-blue-600 transition-colors"
          >
            <RxMinus size={20} />
          </button>
          <button
            onClick={increaseCount}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-colors"
          >
            <RxPlus size={20} />
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg p-3 sm:p-4 shadow-inner">
        <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-gray-700">
          Voltage Status
        </h3>
        <div
          className={`text-xl sm:text-2xl font-bold ${getVoltageColor()} flex items-center`}
        >
          {getVoltageStatus()}
          {count >= 15 && (
            <RxExclamationTriangle className="ml-2 text-red-500" />
          )}
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
          {count < 3 &&
            "Voltage is low. Consider increasing for optimal performance."}
          {count >= 3 &&
            count < 7 &&
            "Voltage is within normal operating range."}
          {count >= 7 &&
            count < 15 &&
            "Voltage is high. Monitor closely to prevent overload."}
          {count >= 15 &&
            "Warning: Voltage is at a critical level. Immediate action required!"}
        </p>
      </div>
    </div>
  );
}
