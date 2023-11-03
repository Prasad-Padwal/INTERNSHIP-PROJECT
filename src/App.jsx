import React, { useState } from 'react';
import ProductCard from './ProductCard';
import productData from './productData';

function App() {
  const [products, setProducts] = useState(productData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Display 6 products per page
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('asc');

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Filter the products based on the search term
    const filteredProducts = productData.filter((product) =>
      product.title.toLowerCase().includes(searchValue)
    );

    // Update the products with the filtered results
    setProducts(filteredProducts);
  };

  const handleSort = () => {
    const sortedProducts = [...products];
    if (sortType === 'asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
      setSortType('desc');
    } else {
      sortedProducts.sort((a, b) => b.price - a.price);
      setSortType('asc');
    }
    setProducts(sortedProducts);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  const productCards = currentItems.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div >
        
      </div>
      <div className="container mx-auto p-4 overflow-hidden bg-zinc-500">
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center mb-4">
        <div className="overflow-hidden z-0 rounded-full relative p-3">
          <form role="form" className="relative flex z-50 bg-white rounded-full">
            <input
              type="text"
              placeholder="enter your search here"
              className="rounded-full flex-1 px-6 py-4 text-gray-700 focus:outline-none"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="bg-indigo-500 text-white rounded-full font-semibold px-8 py-4 hover:bg-indigo-400 focus:bg-indigo-600 focus:outline-none" onClick={handleSearch}>
              Search
            </button>
          </form>
          <div className="glow glow-1 z-10 bg-pink-400 absolute"></div>
          <div className="glow glow-2 z-20 bg-purple-400 absolute"></div>
          <div className="glow glow-3 z-30 bg-yellow-400 absolute"></div>
          <div className="glow glow-4 z-40 bg-blue-400 absolute"></div>
        </div>
          <button
            onClick={handleSort}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            {sortType === 'asc' ? 'Sort by Price (Low to High)' : 'Sort by Price (High to Low)'}
          </button>
        </div>
        <div>
          <h1 className='flex justify-center items-center text-lg md:text-4xl pb-10 text-white'>
            Product List
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:pl-10 md:pr-4">
          {productCards}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded hover:bg-blue-700"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
        <p className="text-center mt-4 text-gray-600 text-white">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
}

export default App;
