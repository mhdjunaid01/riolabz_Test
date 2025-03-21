import React from "react";
import { Link } from "react-router-dom";
const ProductCard = ({product}) => {
   
  return (
    <div className="border p-4 rounded-lg bg-white shadow-md">
      <img src={product.image} alt={product.title} className="h-32 mx-auto" />
      <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
      <p className="text-gray-600">${product.price}</p>
      <Link to={`/product/${product.id}`} className="block mt-3 text-blue-500 hover:underline">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
