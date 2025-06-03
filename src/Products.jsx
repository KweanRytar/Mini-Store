import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

const Products = ({ addToCart, product, productPricee }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [prodCart, setProdCart] = useState(0);

  const increase = () => {
    setProdCart((prev) => prev + 1);
  };

  const decrease = () => {
    if (prodCart > 0) {
      setProdCart((prev) => prev - 1);
    }
  };

  const getProductName = () => {
    if (typeof product !== "string") return "Unknown Product"; // Handle invalid cases
    const rawName = product.split("-"); // Split by dash
    if (rawName.length < 2) return "Unknown"; // Ensure correct format
    return rawName[1].charAt(0).toUpperCase() + rawName[1].slice(1); // Capitalize first letter
  };

  const sendToCart = () => {
    if (prodCart > 0 && productPricee) {
      const price = productPricee // Convert price to number
      const quantity = prodCart;

      const order = {
        name: getProductName(),
        price: price,
        quantity: quantity,
        total: price * quantity,
      };

      addToCart(order);
      setProdCart(0);
    }
  };

  return (
    <div className="relative">
      <img
        src={product}
        onClick={() => setIsSelected(!isSelected)}
        className={`cursor-pointer ${
          isSelected ? "border-pink-500 border-4" : "border-transparent"
        } hover:border-amber-500`}
        alt="product"
      />
      <div className="absolute bottom-10 left-60 flex flex-col items-center gap-2 md:left-20 md:w-2 md:top-20">
        {/* Add to Cart Button */}
        <button
          onClick={sendToCart}
          className="cursor-pointer rounded-2xl w-30 border-4 px-4 py-2 bg-pink-500 text-white md:text-[8px] md:px-2 md:py-1"
        >
          <FaCartPlus className="w-6 mx-auto md:w-2" />
          Add to Cart {`(${prodCart})`}
        </button>

        {/* Plus and Minus Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={decrease}
            className="cursor-pointer rounded-full border-4 p-2 bg-pink-500 border-pink-200 md:border-1 md:p-1"
          >
            <FaCircleMinus className="w-8 text-white md:h-2" />
          </button>
          <button
            onClick={increase}
            className="cursor-pointer rounded-full border-4 p-2 bg-pink-500 border-pink-200 md:border-0 md:p-1"
          >
            <FaCirclePlus className="w-6 text-white md:h-2" />
          </button>
        </div>
      </div>
      <h3 className="font-extrabold text-pink-500 text-center">{getProductName()}</h3>
      <h4 className="font-bold text-center text-gray-400">{productPricee}</h4>
    </div>
  );
};

export default Products;
