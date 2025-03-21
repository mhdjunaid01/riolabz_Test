import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductDetails,
  clearProductDetails,
  setLoading,
  setError,
} from "../Slice/productsSlice.js";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; 
import { getProductById } from "@/services/productServices.js";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct: product, status } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProductDetails = async () => {
      dispatch(setLoading());
      try {
        const data = await getProductById(id)

        dispatch(setProductDetails(data));
      } catch (error) {
        dispatch(setError());
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProductDetails();
  }, [dispatch, id]);

  if (status === "loading") return <p className="text-center mt-6 text-gray-500">Loading product details...</p>;
  if (status === "failed") return <p className="text-center mt-6 text-red-600">Failed to load product details. Try again later.</p>;
  if (!product) return <p className="text-center mt-6 text-gray-500">Product not found.</p>;

  return (
  
    
      <div className="responsive flex flex-col items-center ml-[35rem] ">
        <Card className="w-[400px] shadow-lg">
          <CardContent>
            <img src={product.image} alt={product.title} className="h-40 mx-auto mb-4 rounded-md" />
          </CardContent>
          <CardHeader>
            <CardTitle className="text-center">{product.title}</CardTitle>
            <CardDescription className="text-center">{product.category}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="text-gray-600 text-center">{product.description}</p>
            <p className="text-lg font-bold text-center mt-2">${product.price}</p>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Button className="w-full">Buy Now</Button>
        <Button className="w-full mt-6" onClick={() => navigate('/')}>
          ← Back to Products
        </Button>
          </CardFooter>
        </Card>

      
      </div>
  
  );
};

export default ProductDetails;
