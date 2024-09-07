import React from 'react';
import photo from '../assets/images/Betsy-Ross-legend-flag-united-states.webp';
import logo from '../assets/images/svgviewer-png-output (29).png';

const Footer = () => {
    const icons = [
        { href: '#', src: '/src/assets/footer/svgviewer-png-output (25).png', alt: 'Facebook' },
        { href: '#', src: '/src/assets/footer/svgviewer-png-output (26).png', alt: 'Instagram' },
        { href: '#', src: '/src/assets/footer/svgviewer-png-output (27).png', alt: 'X/Twitter' },
        { href: '#', src: '/src/assets/footer/svgviewer-png-output (28).png', alt: 'LinkedIn' },
    ];

    return (
        <footer className="bg-black text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-gray-800">
                    {/* Logo Section */}
                    <div className="col-span-1 lg:col-span-2 mb-6 md:mb-0">
                        <img className="w-40" src={logo} alt="Logo" />
                    </div>

                    {/* Links Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 col-span-1 lg:col-span-3">
                        {/* About Us Section */}
                        <div>
                            <h3 className="mb-4 font-semibold">About US</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400">Master Plan</a></li>
                                <li><a href="#" className="text-gray-400">Jobs</a></li>
                                <li><a href="#" className="text-gray-400">Invest</a></li>
                                <li><a href="#" className="text-gray-400">Pressroom</a></li>
                                <li><a href="#" className="text-gray-400">Blog</a></li>
                                <li><a href="#" className="text-gray-400">Contact</a></li>
                            </ul>
                        </div>

                        {/* Explore EEVE Section */}
                        <div>
                            <h3 className="mb-4 font-semibold">Explore EEVE</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400">Unlock my Robot Power</a></li>
                                <li><a href="#" className="text-gray-400">Starlight</a></li>
                                <li><a href="#" className="text-gray-400">Robot Platform</a></li>
                                <li><a href="#" className="text-gray-400">EEVE Roadmap</a></li>
                            </ul>
                        </div>

                        {/* Community & Support Section */}
                        <div>
                            <h3 className="mb-4 font-semibold">Community & Support</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400">Willow X Community</a></li>
                                <li><a href="#" className="text-gray-400">Developer & Maker Access</a></li>
                                <li><a href="#" className="text-gray-400">Special Case</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-8 ">
                    <div className="flex space-x-4 md:mr-8">
                        {icons.map((icon, index) => (
                            <a key={index} href={icon.href} className="hover:opacity-75">
                                <img src={icon.src} alt={icon.alt} className="w-6 h-6" />
                            </a>
                        ))}
                    </div>

                    <ul className="flex space-x-6 mt-8 md:mt-0 mb-8 ">
                        <li><a href="#" className="text-gray-400">March22 Recap</a></li>
                        <li><a href="#" className="text-gray-400">Privacy Policy</a></li>
                        <li><a href="#" className="text-gray-400">General Terms</a></li>
                        <li><a href="#" className="text-gray-400">Contact</a></li>
                    </ul>

                    <div className="flex items-center gap-2 mt-4 md:ms-12 md:mt-0">
                        <img className="w-4 h-2" src={photo} alt="Flag" />
                        <p className="text-sm text-gray-500">United States (English)</p>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">EEVE © 2024. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
