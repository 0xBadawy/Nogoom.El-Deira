import { Link } from "react-router-dom";

export default function AdCard({ ad, isHovered, onHoverStart, onHoverEnd }) {
  return (
    <div
      className="ad-card rounded-2xl"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        boxShadow: isHovered
          ? "0 10px 30px rgba(0, 0, 0, 0.1)"
          : "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Link to={`/ad/${ad.id}`}>
        <div className="card bg-white rounded-2xl border-2 border-purple-500 hover:border-blue-400 transition-all duration-300">
          <div className="card-content p-0">
            <div className="relative">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 rounded-t-2xl" />
              <div className="absolute bottom-0 right-0 p-4">
                <h2 className="text-xl font-bold text-white mb-1">
                  {ad.title}
                </h2>
                <span className="badge bg-purple-600 text-white px-2 py-1 rounded-md text-sm">
                  {ad.category}
                </span>
              </div>
              {isHovered && (
                <div className="overlay absolute inset-0 rounded-t-2xl flex items-center justify-center bg-black bg-opacity-40">
                  <button className="button bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-200">
                    <span className="icon mr-2 text-lg">🚀</span> اكتشف
                  </button>
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="text-blue-800 mb-2 text-lg font-medium">
                {ad.description.slice(0, 35)}...
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="icon inline-block ml-1 h-3 w-3"> 📍 </span>
                {ad.regions[0]}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                <span className="calendar-icon inline-block ml-1 h-3 w-3">
                  📅
                </span>
                التاريخ: {new Date(ad.startDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
