import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-gray-600 text-2xl my-10">
        ABOUT<span className="text-gray-800 font-medium"> US</span>
      </div>

      <div className="flex max-[1000px]:flex-col flex-row gap-12">
        <img
          src={assets?.about_image}
          alt="about_img"
          className=" rounded-sm max-[1000px]:w-[450px] min-[1000px]:max-w-[360px] mx-auto"
        />
        <div className="p-4 rounded-sm">
          <p>
            Welcome to AidConnect, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At AidConnect, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <br />
          <p>
            AidConnect is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, AidConnect is here to support you every step of the
            way.
          </p>
          <br />
          <b className="text-gray-600">Our Vision</b>
          <br />
          <p>
            Our vision at AidConnect is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>
      <div>
        <p className="text-xl my-12">
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>
      <div className="grid grid-cols-3 border-gray-500 border-2">
        <div className="flex flex-col border-gray-500 border-r-2 md:px-10 sm:px-4 py-16 text-[15px] gap-2 hover:text-white hover:bg-blue-400 duration-300 text-gray-700">
          <b>EFFICIENCY:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="flex flex-col border-gray-500 border-r-2 md:px-10 sm:px-4 py-16 text-[15px] gap-2 hover:text-white hover:bg-blue-400 duration-300 text-gray-700">
          <b> CONVENIENCE:</b>
          <p>
            Access to a network of trusted healthcare professionals in your area
          </p>
        </div>
        <div className="flex flex-col border-gray-500 sm:px-4 md:px-10 py-16 text-[15px] gap-2 hover:text-white hover:bg-blue-400 duration-300 text-gray-700">
          <b> PERSONALIZATION:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
