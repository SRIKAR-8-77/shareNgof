import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ServicesSection from "./components/ServicesSection.jsx";
import CustomerReviews from "./components/CustomerReviews.jsx";
import Footer from "./components/Footer";
import Profile from './pages/Profile.jsx';
import AboutUs from "./components/AboutUs.jsx";
import BookCab from "./Pages/BookCab.jsx";
import RentCarPage from "./Pages/RentCar.jsx";
import ShareNowPage from "./Pages/ShareNow.jsx";
import TravelPollsPage from "./Pages/TravelPoll.jsx";
import Login from './components/Login';
import Signup from './components/Signup';
import FeedbackForm from './components/FeedbackForm.jsx';
import ContactUs from './components/ContactUs.jsx';


const HomePage = () => (
  <>
    <section className="bg-yellow-400">
      <Hero />
    </section>
    <section className="bg-gray-100">
      <ServicesSection />
    </section>
    <section className="bg-white">
      <CustomerReviews />
    </section>
    <Footer />
  </>
);

const ContactPage = () => (
  <>
    <div className="min-h-screen py-12 text-center text-lg bg-white">
      <h2 className="text-3xl font-semibold mb-4 text-yellow-600">Contact Us</h2>
      <p className="text-gray-700">Reach us at: contact@example.com</p>
    </div>
    <Footer />
  </>
);

const ServicesPage = () => (
  <>
    <section className="bg-white">
      <ServicesSection />
    </section>
    <Footer />
  </>
);

const RootLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/book-cab", element: <BookCab /> },
      { path: "/rent-car", element: <RentCarPage /> },
      { path: "/share-now", element: <ShareNowPage /> },
      { path: "/travel-polls", element: <TravelPollsPage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/feedback", element: <FeedbackForm /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

function App() {
  return (
    <div className="font-sans min-h-screen w-full bg-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;