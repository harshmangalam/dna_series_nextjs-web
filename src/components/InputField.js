import classNames from "classnames";
export default function InputField({
  placeholder,
  value,
  handleChange,
  type = "text",
  name,
  error,
}) {
  return (
    <div className="my-3">
      <input
        className={classNames(
          "focus:outline-none w-full text-lg text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 px-5",
          {
            "border-red-500 focus:ring-offset-red-500": error,
            "focus:border-light-blue-500 focus:ring-2 ": !error,
          }
        )}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={name}
      />

      <div className="text-red-500 my-1">{error}</div>
    </div>
  );
}
