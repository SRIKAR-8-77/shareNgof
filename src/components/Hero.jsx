import Slideshow from "./slideshow.jsx"
import cab from "../assets/images/taxi.webp";

const Hero = () => {
    return (
        <section className="bg-yellow-400 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-20">

                <div className="flex-1">
                    <h1 className="text-6xl md:text-7xl font-extrabold text-black mb-6">
                        Join the Ride-<br />Sharing Revolution
                    </h1>
                    <p className="text-gray-800 mb-8">
                        Discover an easier, faster, and more affordable way to get around the city. With our platform, you can share rides, save money, and help reduce traffic — all with just a few taps.
                    </p>

                    <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800">
                        Try Now →
                    </button>

                    <div className="mt-10 flex items-center gap-2">
                        <p className="font-semibold">Happy Riders</p>
                        <div className="flex -space-x-2">
                            <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/32.jpg" alt="user1" />
                            <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/44.jpg" alt="user2" />
                            <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/12.jpg" alt="user3" />
                        </div>
                    </div>

                </div>

                <div className="flex-1 relative mt-10 md:mt-0">
                    <img src={cab} alt="Car" className="w-full" />
                </div>

            </div>
            <div className="mt-6 md:mt-0">
                <Slideshow />
            </div>
        </section>
    );
};

export default Hero;
