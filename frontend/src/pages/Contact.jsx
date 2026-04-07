import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl text-gray-500 my-4">
        CONTACT <span className="text-gray-700 font-semibold"> US</span>
      </div>
      <div className="flex flex-col md:flex-row mb-10 justify-center max-md:items-center gap-10">
        <img
          src={assets.contact_image}
          alt="contact_image"
          className="max-w-[360px]"
        />
        <div className="flex flex-col gap-4 text-gray-600 justify-center items-start">
          <p className="text-lg font-medium text-gray-700">OUR OFFICE</p>
          <p>54709 Willms Station Suite 350,<br /> Washington, USA</p>
          <p>Tel: (415) 555‑0132</p>
          <p>Email: abc@gmail.com</p>
          <p className="text-lg font-medium">CAREERS AT AIDCONNECT</p>
          <p>Learn more about our teams and job openings.</p>
          <button className="p-2 w-30 border-2 hover:bg-black hover:text-white rounded-sm cursor-pointer font-medium transition-all durtion-500 text-black">Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
