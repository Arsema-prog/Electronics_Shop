import React from 'react';

const ProductDetailModel = ({ product, onClose }) => {
    if (!product) return null;
    return (
        <div className="fixed inset-0 z-50 flex justify-between items-center bg-white overflow-auto">
            {/* Left Side: Enlarged Image */}
            <div className="w-1/2 h-full flex justify-center items-center bg-gray-100">
                <img
                    src={product.image}
                    alt={product.product_name}
                    className="max-w-full max-h-full transition-transform duration-300 transform hover:scale-105"
                />
            </div>

            {/* Right Side: Product Details */}
            <div className="w-1/2 h-full p-6">
                <h2 className="text-4xl font-bold mb-4">{product.product_name}</h2>
                <p className="text-lg text-gray-700 mb-4">{product.description}</p>
                <p className="text-2xl font-semibold text-gray-900 mb-4">{`$${product.price}`}</p>
                <button
                    onClick={onClose} // This will close the modal
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ProductDetailModel;
