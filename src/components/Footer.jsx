import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble, FaSlack } from 'react-icons/fa';
import { SiVisa, SiMastercard, SiPaypal, SiApplepay } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 px-6 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-sm">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="text-red-600 text-3xl">📡</div>
            <div>
              <h2 className="text-white text-xl font-bold">Gadgets</h2>
              <span className="text-gray-500 text-sm">Template</span>
            </div>
          </div>
          <p className="mb-6">
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua bendum estilaculis volutpat lacus laoreet vitae ultricies leo integer.
          </p>
          <div className="flex space-x-4 text-lg">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaDribbble />
            <FaSlack />
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Useful Links</h3>
          <ul className="space-y-2">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Sign Up</a></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Account</h3>
          <ul className="space-y-2">
            <li><a href="#">My Account</a></li>
            <li><a href="#">Tracking List</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Orders</a></li>
            <li><a href="#">My Cart</a></li>
          </ul>
        </div>

        {/* More Info */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">More Info.</h3>
          <p className="mb-4">
            Aliquam faucibus, odio nec commodo aliquam, neque felis placerat dui, a porta ante lectus. Sed do eiusmod tempor incididunt ut labore.
          </p>
          <div className="flex space-x-3 text-2xl text-white">
            <SiVisa className="bg-white text-black p-1 rounded" />
            <SiMastercard className="bg-white text-black p-1 rounded" />
            <SiPaypal className="bg-white text-black p-1 rounded" />
            <SiApplepay className="bg-white text-black p-1 rounded" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;