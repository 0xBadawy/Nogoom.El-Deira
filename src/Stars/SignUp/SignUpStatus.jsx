import React, { useEffect } from "react";

// Simple confetti effect
import Confetti from "react-confetti";

const SignUpStatus = () => {
  useEffect(() => {
    // redirect to profile after 3 sec
    // const timer = setTimeout(() => {
    //   window.location.href = "/login";
    // }, 3000);

  }, []);

  return (
    <div className="relative flex items-center justify-center p- h-screen bg-gradient-to-r from-blue-100 to-indigo-200">
      {/* Confetti effect */}
      <Confetti />

      <div className="bg-white p-3 rounded-lg shadow-xl max-w-lg w-full relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-600 mb-2">
            🎉 مرحباً بك في منصتنا! 🎉
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            تم تسجيلك بنجاح، شكراً لانضمامك إلينا.
          </p>
          <div className="text-md text-gray-600 mb-4">
            <p>لتسجيلك سيتم مراجعة بياناتك والرد عليك خلال ٤٨ ساعة.</p>
            <p>في حال الموافقة سيتم إشعارك عبر البريد الإلكتروني.</p>
          </div>
        </div>

        <div className="flex justify-center">
          <a
            href="/login"
            className="text-white bg-indigo-600 hover:bg-indigo-800 px-6 py-3 rounded-full text-lg transition duration-300"
          >
            الذهاب إلى تسجيل الدخول
          </a>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            إذا كنت بحاجة إلى مساعدة، لا تتردد في الاتصال بنا.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpStatus;
