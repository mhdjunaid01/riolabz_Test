import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoading, setError } from "../Slice/productsSlice.js";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import {getAllProducts} from "@/services/productServices";
import PaginationComponent from "./PaginationComponent.jsx";
import ProductCard from "./ProductCard.jsx";

import LoadingSkeleton from "./LoadingSkeleton.jsx";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, searchQuery } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterProducts, setFilterProducts] = useState([]);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading());
      try {
        const data = await getAllProducts();
        dispatch(setProducts(data)); 
        setFilterProducts(data); 
      } catch (error) {
        dispatch(setError());
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [dispatch]);

  // Filter by category
  const handleFilterChange = (category) => {
    if (category === "all") {
      setFilterProducts(products);
    } else {
      setFilterProducts(products.filter((product) => product.category === category));
    }
    setCurrentPage(1);
  };

  // Filter by search query
  useEffect(() => {
    if (!searchQuery) {
      setFilterProducts(products);
    } else {
      setFilterProducts(products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
  }, [searchQuery, products]);


  if (status === "loading")
    return <LoadingSkeleton />;
  if (status === "failed")
    return <p className="text-center mt-4 text-red-600">Failed to load products</p>;

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filterProducts.length / productsPerPage);

  return (
    <div className="flex min-h-screen">
      <Sidebar onFilterChange={handleFilterChange} />
      
      <div className="p-4 flex-1">
        <h2 className="text-2xl font-bold mb-6">All Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentProducts.map((product) => ( <ProductCard key={product.id} product={product} /> ))}
        </div>

        <PaginationComponent currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default ProductList;
