import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import SideDrawer from "./SideDrawer";

function HomePro() {
  const [selectedCategory, setSelectedCategory] = useState("Rocking chair");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/products.json"); // Replace with the actual path
        const data = await response.json();
        setAllProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter products based on selected category
  useEffect(() => {
    const filtered = allProducts.filter(
      (product) => product.type === selectedCategory
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); 
  }, [selectedCategory, allProducts]);

  // Pagination logic: Get current products for the page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex flex-col lg:flex-row ">
      {/* Side Drawer for category selection */}
      <SideDrawer
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main content section (filtered products) */}
      <div className="flex-1 p-4 lg:px-24">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 lg:mt-12">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center mt-4 lg:mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 lg:px-3 lg:py-1 rounded border border-gray-300"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-2 py-1 lg:px-3 lg:py-1 rounded border ${
                currentPage === index + 1
                  ? "bg-gray-300 text-gray-800"
                  : "bg-white text-gray-500 border-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 lg:px-3 lg:py-1 rounded border border-gray-300"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePro;
