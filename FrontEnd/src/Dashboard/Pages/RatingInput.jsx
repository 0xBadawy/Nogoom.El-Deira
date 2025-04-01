import { useState } from "react";

const RatingInput = ({ register, errors, setValue }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
    setValue("rating", value, { shouldValidate: true }); // تحديث القيمة مباشرة
  };

  return (
    <div className="space-y-2 mx-auto">
      <label
        htmlFor="rating"
        className="block text-sm font-semibold text-gray-700"
      >
        التقييم
      </label>
      <div className="flex justify-center  space-x-1 text-yellow-500 text-3xl mx-auto">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => handleRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <input type="hidden" {...register("rating", { required: true })} />
      {errors.rating && (
        <span className="text-red-500 text-sm font-medium animate-pulse flex justify-end">
          هذا الحقل مطلوب
        </span>
      )}
    </div>
  );
};

export default RatingInput;
