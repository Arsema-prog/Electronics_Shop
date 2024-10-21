import React, { useEffect, useState } from 'react';
import ProductDetailModel from '../components/ProductDetailModel';

const Perfume = ({ onProductSelect }) => {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(() => {
        // Fetching products from the API
        fetch('http://localhost:3000/api_product_details.php') // Ensure this URL is correct
            .then((res) => res.json())
            .then((data) => {
                // Filter for products in the "perfume" category
                const perfumeProducts = data.filter(product => product.category.toLowerCase() === 'perfume');
                setProducts(perfumeProducts);
                setDisplayedProducts(perfumeProducts);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);
    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };
    return (
        <div className="product-page">
            <h2 className="text-5xl font-bold text-center mb-10 text-gray-800">Phones</h2>
            <div className="flex justify-center items-center gap-10 mb-4">
                {products.map((product, index) => (
                    <div key={index} className="flex-shrink-0 w-64">
                        <div className="bg-gray-100 p-2 rounded-lg shadow-md mb-4 transition-transform duration-300 transform hover:scale-105 hover:brightness-100 hover:shadow-xl">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
                                {/* Image displayed above the product name */}
                                <div className="flex-shrink-0 relative">
                                    <img
                                        src={product.image}
                                        alt={product.product_name}
                                        className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105 hover:brightness-90 hover:shadow-xl"
                                    />
                                </div>
                                <div className="bg-gray-200 p-4 flex flex-col flex-grow">
                                    {/* Product Name */}
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.product_name}</h3>
                                    <button
                                        onClick={() => handleProductSelect(product)} // Trigger modal
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600"
                                    >
                                        See More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Render ProductDetailModel modal */}
            {selectedProduct && (
                <ProductDetailModel
                    product={selectedProduct}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};
export default Perfume;
