import { Button, Typography } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex-col overflow-hidden p-4 sm:p-6 md:p-8">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-gray-100 to-gray-200"></div>
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-teal-300 rounded-full blur-2xl opacity-30"></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center mb-20">
        <Typography
          variant="h1"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6"
        >
          Transform Your Customer Experience
        </Typography>
        <Typography
          variant="lead"
          className="text-lg sm:text-xl md:text-2xl text-gray-700 opacity-90 mb-8"
        >
          Boost your business with intuitive tools, real-time analytics, and
          seamless integrations for managing customer relationships effectively.
        </Typography>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-teal-400 to-blue-400 text-white hover:scale-105 transition-transform w-full sm:w-auto"
            ripple={true}
          >
            Get Started Free
          </Button>
          <Button
            size="lg"
            variant="outlined"
            className="border-gray-700 text-gray-700 hover:border-teal-400 hover:text-teal-400 transition-colors w-full sm:w-auto"
          >
            Learn More
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <Typography
              variant="h6"
              className="text-lg font-bold text-gray-900 mb-2"
            >
              Centralized Database
            </Typography>
            <Typography className="text-sm text-gray-600">
              Access all customer data in one place for seamless management.
            </Typography>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <Typography
              variant="h6"
              className="text-lg font-bold text-gray-900 mb-2"
            >
              AI-Powered Insights
            </Typography>
            <Typography className="text-sm text-gray-600">
              Leverage advanced analytics to make informed decisions quickly.
            </Typography>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <Typography
              variant="h6"
              className="text-lg font-bold text-gray-900 mb-2"
            >
              Seamless Integration
            </Typography>
            <Typography className="text-sm text-gray-600">
              Connect effortlessly with tools you already use.
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
};
