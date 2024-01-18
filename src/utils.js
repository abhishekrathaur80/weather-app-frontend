import { FaSun, FaCloudSun, FaCloud, FaCloudRain, FaCloudShowersHeavy, FaSnowflake } from 'react-icons/fa';

const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case '01d':
        return <FaSun />;
      case '02d':
        return <FaCloudSun />;
      case '03d':
      case '04d':
        return <FaCloud />;
      case '09d':
        return <FaCloudRain />;
      case '10d':
        return <FaCloudShowersHeavy />;
      case '13d':
        return <FaSnowflake />;
      default:
        return <FaSun />;
    }
  };

  export default getWeatherIcon;
  