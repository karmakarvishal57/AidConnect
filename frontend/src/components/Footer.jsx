import { assets } from "../assets/assets_frontend/assets";

export const Footer = () => {
  return (
    <div className="mt-30 mx-8">
      <div className="grid grid-cols-[1fr_1fr_1fr] justify-items-center ">
        <div className="flex flex-col gap-4">
          <img
            src={assets.aidconnect2}
            alt="logo_image"
            className="w-12 rounded-md"
          />

          <p className="text-sm font-medium text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <div>
          <p className="text-2xl font-semibold">Company</p>
          <ul className="flex flex-col gap-2 mt-8 text-sm font-medium text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-2xl font-semibold">Get In Touch</p>
          <ul className="flex flex-col gap-2 mt-8 text-sm font-medium text-gray-600">
            <li>+1-567-493-5667</li>
            <li>abc@gmail.com</li>
          </ul>
        </div>
      </div>

      {/*--------------Copyright Text----------------*/}

      <div className="leading-10 mt-6">
        <hr className="border-gray-400 border-1" />
        <p className="text-center text-sm font-medium text-gray-600 py-4">
          Copyright 2025@AidConnect - All Rights Reserved
        </p>
      </div>
    </div>
  );
};
