import React from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../Slice/productsSlice";

const Sidebar = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.products.searchQuery);
  const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

  return (
    <aside className="w-64 bg-gray-50 shadow-md hidden md:block">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Filter Items</h2>
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(event) => dispatch(setSearchQuery(event.target.value))}
          className="w-full p-2 border rounded-lg mb-4 mt-1"
        />

        {/* Category Filter */}
        <nav>
          <ul>
            {categories.map((category) => (
              <li key={category} className="mb-2">
                <Button
                  onClick={() => onFilterChange(category)}
                  className="w-full text-left p-2 bg-white rounded hover:bg-gray-200 mt-2"
                >
                  {category}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
