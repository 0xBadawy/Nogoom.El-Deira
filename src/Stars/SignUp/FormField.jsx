const FormField = ({ id, label, type = "text", register }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      id={id}
      type={type}
      
      
      className="w-full px-3 py-2 border rounded-lg focus:outline-none"
      {...register(id)}
    />
  </div>
  
);

export default FormField;
