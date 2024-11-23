/** @format */

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Hero Section */}
      <header className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>
            Welcome to <span className='text-yellow-300'>Sync</span>
          </h1>
          <p className='text-lg md:text-2xl mb-6'>
            Real-time messaging redefined with cutting-edge technologies.
          </p>
          <Link
            href='/login'
            className='bg-yellow-300 text-indigo-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition duration-300'
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className='py-12 bg-white'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-8 text-indigo-700'>
            Why Choose <span className='text-purple-600'>Sync?</span>
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                img: "/Online Messaging App.svg",
                title: "Real-time Messaging",
                desc: "Experience instant communication with friends and colleagues using Pusher.",
              },
              {
                img: "/Secure and fast.svg",
                title: "Secure & Fast",
                desc: "With Redis as our backend, enjoy lightning-fast and secure storage solutions.",
              },
              {
                img: "/Responsive Design.svg",
                title: "Responsive Design",
                desc: "Our platform is optimized for mobile, tablet, and desktop devices.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className='text-center bg-gray-50 p-6 rounded-lg shadow-lg flex flex-col'
              >
                <div className='h-48 relative mb-4'>
                  <Image
                    src={feature.img}
                    alt={feature.title}
                    fill
                    className='object-contain'
                  />
                </div>
                <h3 className='text-xl font-semibold text-purple-700 mb-2'>
                  {feature.title}
                </h3>
                <p className='text-gray-600'>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className='py-12 bg-gradient-to-b from-gray-50 to-gray-200'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-indigo-700 mb-8'>
            Built with Modern Tools
          </h2>
          <div className='flex flex-wrap justify-center gap-6'>
            {[
              "React",
              "TypeScript",
              "Next.js",
              "Redis",
              "Pusher",
              "TailwindCSS",
              "PostCSS",
              "Docker",
              "OAuth2.0",
            ].map((tool, index) => (
              <div
                key={index}
                className='bg-white px-4 py-2 rounded-lg shadow-md text-gray-700 font-semibold text-sm md:text-base'
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <footer className='bg-indigo-700 text-white py-12'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-4'>
            Join <span className='text-yellow-300'>Sync</span> Today!
          </h2>
          <p className='text-lg mb-6'>
            Experience the future of real-time messaging. Sign up and connect
            with friends now!
          </p>
          <Link
            href='/login'
            className='bg-yellow-300 text-indigo-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition duration-300'
          >
            Log In
          </Link>
        </div>
      </footer>
    </div>
  );
}
