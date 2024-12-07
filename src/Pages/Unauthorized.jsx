const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - غير مسموح بالوصول</h1>
      <p className="text-lg text-gray-700 mb-6">
        ليس لديك الصلاحية لدخول هذه الصفحة.
      </p>
      <a
        href="/"
        className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded shadow-md transition duration-300"
      >
        العودة إلى الصفحة الرئيسية
      </a>
    </div>
  );
};

export default Unauthorized;
