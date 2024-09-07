import React, { useState } from "react";
import MenuDropDown from "../Navbar/MenuDropDown";

const SideDrawer = ({ selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = ["Rocking chair", "Side chair", "Lounge chair"];
  const [activeTab, setActiveTab] = useState(categories[0]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (category) => {
    setActiveTab(category);
    setSelectedCategory(category);
    setIsOpen(false); 
  };

  return (
    <>
     
      {/* Side Drawer for Desktop */}
      <div
        className={`lg:mt-0 fixed inset-0 lg:w-64 lg:bg-gray-100 lg:h-screen lg:p-6 lg:relative lg:translate-x-0 lg:transition-transform lg:shadow-md lg:overflow-y-auto lg:flex lg:flex-col lg:items-start lg:justify-start lg:top-0 lg:left-0 lg:bottom-0  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:opacity-100 lg:transition-opacity lg:duration-300 lg:shadow-md ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-xl font-bold mb-6">Categories</h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setIsOpen(false);
              }}
              className={`cursor-pointer py-2 px-4 mb-2 rounded-lg ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-white text-gray-700"
              } hover:bg-black hover:text-white`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

         {/* Overlay for Mobile */}
         <div
        className={` inset-0  bg-opacity-95  lg:hidden transition-opacity duration-300 lg:mt-20 mt-0 md:mt-4`}
        onClick={() => setIsOpen(false)} 
      >
        <div className="mt-4 ">
          {/* Tab System */}
          <div className="flex justify-between md:justify-center mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleTabClick(category)}
                className={`px-3 py-2 mx-2 rounded-lg ${
                  activeTab === category
                    ? " bg-black text-white"
                    : " bg-white text-gray-700"
                } hover:bg-black hover:text-white`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="text-center">
            {categories.map((category) => (
              <div
                key={category}
                className={`${
                  activeTab === category ? "block" : "hidden"
                }`}
              >
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
