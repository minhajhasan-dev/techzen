import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { ResponseContext } from "../hooks/ResponseContext";
import { axiosCommon } from "../hooks/useAxiosCommon";

// Fetch products function
const fetchProducts = async () => {
  const response = await axiosCommon(`/products`);
  return response.data;
};

const Sidebar = () => {
  const { register, watch, getValues } = useForm();
  const { setResponseData } = useContext(ResponseContext);
  // Watch form data changes
  const category = watch("category");
  const brand = watch("brand");
  const priceRange = watch("priceRange");
  const sortBy = watch("sortBy");

  // Memoize formData to prevent unnecessary re-renders
  const formData = useMemo(
    () => getValues(),
    [category, brand, priceRange, sortBy]
  );

  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    console.log("Form data changed:", formData);

    // Send formData to the server
    const sendFormData = async () => {
      try {
        const response = await axiosCommon.post("/form-data", formData);
        console.log("Form data sent successfully:", response.data);
        const responseData = response.data;
        setResponseData(responseData);
      } catch (error) {
        console.error(
          "Error sending form data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    sendFormData();
  }, [formData, setResponseData]);

  // Memoize categories and brands to avoid recalculating on every render
  const categories = useMemo(() => {
    return productData
      ? [...new Set(productData.map((product) => product.category))]
      : [];
  }, [productData]);

  const brands = useMemo(() => {
    return productData
      ? [...new Set(productData.map((product) => product.brand))]
      : [];
  }, [productData]);

  return (
    <div className="flex  lg:w-80   min-h-[calc(100vh-120px)] flex-col justify-between border-e bg-white ">
      <div className="px-4 py-6 sidebar sticky top-16">
        <form className="max-w-sm flex flex-col gap-8 mx-auto">
          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              id="category"
              {...register("category")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="default">All Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label
              htmlFor="brand"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Brand
            </label>
            <select
              id="brand"
              {...register("brand")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="default">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label
              htmlFor="priceRange"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price Range
            </label>
            <select
              id="priceRange"
              {...register("priceRange")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="default">All Prices</option>
              <option value="below5k">0 ৳ - 5000 ৳</option>
              <option value="5kTo20k">5000 ৳ - 20000 ৳</option>
              <option value="above20k">Above 20000 ৳</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label
              htmlFor="sortBy"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sort By
            </label>
            <select
              id="sortBy"
              {...register("sortBy")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="default">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest-first">Newest First</option>
            </select>
          </div>
        </form>
        {isLoading && <p>Loading...</p>}
        {error && (
          <p className=" text-sm text-red-500 text-center ">
            Error fetching products
          </p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
