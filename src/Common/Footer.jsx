import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer
            className="min-h-screen bg-gradient-to-b from-[rgb(0,0,31)] to-[rgb(10,10,50)] text-white flex flex-col justify-center items-center px-6 md:px-12 border-t-2 border-blue-500 py-20"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
                {/* Column 1: About Section */}
                <motion.div
                    className="flex flex-col items-start"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="text-2xl font-bold mb-4">About JobWithAK</h3>
                    <p className="text-sm leading-6">
                        Welcome to <span className="text-blue-400">JobWithAK</span>, founded by Abu Kalam. We specialize in connecting talented professionals with their dream jobs and creating responsive, user-friendly web solutions. Let us help you achieve your career goals.
                    </p>
                </motion.div>

                {/* Column 2: Quick Links */}
                <motion.div
                    className="flex flex-col items-start"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
                    <ul className="text-sm space-y-2">
                        <li>
                            <a href="#home" className="hover:text-blue-400 transition">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#about" className="hover:text-blue-400 transition">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#services" className="hover:text-blue-400 transition">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#portfolio" className="hover:text-blue-400 transition">
                                Portfolio
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:text-blue-400 transition">
                                Contact
                            </a>
                        </li>
                    </ul>
                </motion.div>

                {/* Column 3: Contact Information */}
                <motion.div
                    className="flex flex-col items-start"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
                    <p className="text-sm mb-2">
                        Have questions? Reach out to us anytime.
                    </p>
                    <div className="text-sm space-y-2">
                        <p>Email: <a href="mailto:akwebdev69@gmail.com" className="text-blue-400 hover:underline">akwebdev69@gmail.com</a></p>
                        <p>Phone: +880-1768037870</p>
                        <p>Location: Dhaka, Bangladesh</p>
                    </div>
                </motion.div>
            </div>

            {/* Newsletter Section */}
            <motion.div
                className="w-full max-w-4xl bg-blue-900 bg-opacity-50 rounded-lg p-6 mt-12 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <h3 className="text-2xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
                <p className="text-sm mb-6">
                    Stay updated with the latest news, job opportunities, and web development trends. Subscribe to our newsletter now!
                </p>
                <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full sm:w-auto px-4 py-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition"
                    >
                        Subscribe
                    </button>
                </form>
            </motion.div>

            {/* Social Media Section */}
            <motion.div
                className="flex flex-col items-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <h3 className="text-xl font-semibold mb-4">Follow Us on Social Media</h3>
                <div className="flex space-x-6 text-3xl">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition"
                    >
                        <FaFacebook />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-300 transition"
                    >
                        <FaTwitter />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-400 transition"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400 transition"
                    >
                        <FaGithub />
                    </a>
                </div>
            </motion.div>

            {/* Footer Bottom */}
            <div className="mt-12 text-center text-sm">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    &copy; {new Date().getFullYear()} JobWithAK. All rights reserved. Designed by Abu Kalam.
                </motion.p>
            </div>
        </footer>
    );
};

export default Footer;
