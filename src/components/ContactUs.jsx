import React, { useState } from 'react';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import facebook from "../assets/icons/facebook.png";
import instagram from "../assets/icons/instagram.png";
import twitter from "../assets/icons/twitter.png";
import linkedin from "../assets/icons/linkedin.png";
import youtube from "../assets/icons/youtube.png";

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
    setEmail('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://sharengob.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message submitted successfully!');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
        setIsModalOpen(false);
      } else {
        alert('Failed to submit message.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the message.');
    }
  };

  return (
    <div className="bg-yellow-400 text-black">
      {/* Contact Section */}
      <section className="py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4" id="cantactus">
          Contact Us
        </h1>
        <p className="text-lg mb-12" id="foot-of-contactus">
          Feel free to reach out to us for any inquiries or feedback.
        </p>
        <button
          className="mb-6 px-6 py-2 bg-black text-yellow-400 font-semibold rounded hover:bg-gray-900 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Contact Now
        </button>

        {/* Our Services Heading */}
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="space-y-3">
            <MdEmail className="w-12 h-12 mx-auto text-black" />
            <h3 className="text-xl font-semibold">Email</h3>
            <p>You can also visit our office during working hours.</p>
            <p className="font-medium">transportation@iiitl.edu</p>
          </div>
          <div className="space-y-3">
            <MdPhone className="w-12 h-12 mx-auto text-black" />
            <h3 className="text-xl font-semibold">Phone</h3>
            <p>Contact us for any updates and announcements.</p>
            <p className="font-medium">+(91) 8459332761</p>
          </div>
          <div className="space-y-3">
            <MdLocationOn className="w-12 h-12 mx-auto text-black" />
            <h3 className="text-xl font-semibold">Office</h3>
            <p>We look forward to hearing from you!</p>
            <p className="font-medium">OnTrack Transport Services, Lucknow</p>
          </div>
        </div>
      </section>

      {/* Modal Contact Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black w-full max-w-2xl p-8 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-2xl font-bold hover:text-red-600"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold mb-1">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-1/2 px-4 py-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-1/2 px-4 py-2 border rounded"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  E-mail <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@example.com"
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-yellow-400 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <img src="logo.png" alt="Logo" className="mx-auto mb-4 w-24" />
            <p className="mb-4">
              Subscribe to our newsletter for the latest updates on new features and product releases.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <input
                type="email"
                className="px-4 py-2 border border-yellow-400 rounded w-full sm:w-auto bg-black text-yellow-400 placeholder-yellow-300"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-sm">© 2023 Your Website. All Rights Reserved.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left mb-10">
            <div>
              <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "About Us", "Contact Us", "FAQs", "Terms of Service"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                {["Privacy Policy", "Cookies Policy", "Disclaimer", "Copyright Policy", "Sitemap"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Connect</h4>
              <div className="flex flex-col gap-3 items-start">
                <a href="#" className="flex items-center gap-2 hover:underline">
                  <img src={facebook} className="w-6 h-6" alt="Facebook" />
                  <span>Facebook</span>
                </a>
                <a href="#" className="flex items-center gap-2 hover:underline">
                  <img src={instagram} className="w-6 h-6" alt="Instagram" />
                  <span>Instagram</span>
                </a>
                <a href="#" className="flex items-center gap-2 hover:underline">
                  <img src={twitter} className="w-6 h-6" alt="Twitter" />
                  <span>Twitter</span>
                </a>
                <a href="#" className="flex items-center gap-2 hover:underline">
                  <img src={linkedin} className="w-6 h-6" alt="LinkedIn" />
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="flex items-center gap-2 hover:underline">
                  <img src={youtube} className="w-6 h-6" alt="YouTube" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>

          <div className="text-center border-t border-yellow-500 pt-6 text-sm">
            <p>
              Designed with <i className="fas fa-heart text-yellow-400"></i> by Your Company
            </p>
            <ul className="flex flex-wrap justify-center mt-2 gap-4">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Cookies Settings</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
