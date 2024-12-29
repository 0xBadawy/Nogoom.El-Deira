import PropTypes from 'prop-types';

const HeroContent = ({ title, description, buttonText, image }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between h-full w-full px-4  lg:px-20">
      <div className="flex flex-col items-center lg:items-start text-center lg:text-right lg:w-1/2">
        <h1
          className="text-3xl md:text-4xl lg:text-5xl mt-28 font-extrabold text-white 
                     leading-tight animate-fade-in"
        >
          {title}
        </h1>
        <p
          className="text-lg md:text-xl lg:text-2xl font-bold mt-6 lg:mt-10 text-gray-100/90 
                    max-w-2xl animate-fade-in-delay"
        >
          {description}
        </p>
        <button
          className="bg-white text-purple-800 px-6 py-3 mt-8 rounded-full font-bold
                        transform hover:scale-105 transition-all duration-300 hover:shadow-lg
                        animate-fade-in-delay-2"
        >
          {buttonText}
        </button>
      </div>

      <div className="flex items-end justify-center lg:w-1/2 h-[40vh] lg:h-[50vh] mt-8 lg:mt-56  ">
        <img
          src={image}
          alt="Hero illustration"
          loading="lazy"
          className="h-full object-contain drop-shadow-2xl animate-float"
        />
      </div>
    </div>
  );
};

HeroContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default HeroContent;