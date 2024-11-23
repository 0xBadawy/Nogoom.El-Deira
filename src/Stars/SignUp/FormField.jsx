const FormField = ({ id, label, type = "text", register, errors }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      id={id}
      type={type}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
        errors[id] ? "border-red-500" : ""
      }`}
      {...register(id)}
    />
    {errors[id] && <p className="text-red-500 text-xs">{errors[id].message}</p>}
  </div>
);

export default FormField;
