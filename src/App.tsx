import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "./api/baseUrl";

// Define Product type
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

// Main Component
function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await apiService.getProducts();
      console.log("Product Response:", response.data);
      setProducts(response.data.products);
      toast.success("Products fetched successfully!");
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products");
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-2xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer /> {/* Toast container to display toasts */}
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="mt-2 text-green-500">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
