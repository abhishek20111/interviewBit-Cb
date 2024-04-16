import React, { useEffect, useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import Card from 'components/card';
import axios from 'axios';

const Banner1 = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/products');
            setAllProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    useEffect(() => {
        if (allProducts.length > 0) {
            const sortedByRating = [...allProducts].sort((a, b) => b.rating - a.rating);
            const top5Rated = sortedByRating.slice(0, 5);
            setTopRated(top5Rated);
        }
    }, [allProducts]);
    const renderProduct = (product) => (
        <div key={product.id} className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <div className="flex items-center">
                <img className="h-[83px] w-[83px] rounded-lg" src={product.image} alt={product.name} />
                <div className="ml-4">
                    <p className="text-base font-medium text-navy-700 dark:text-white">{product.name}</p>
                    <p className="mt-2 text-sm text-gray-600">{product.description} 
                        <a className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white" href={`/products/${product.id}`}>
                            See product details
                        </a>
                    </p>
                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                        Rating: {product.rating.toFixed(1)}⭐
                    </p>
                </div>
            </div>
           
        </div>
    );

    return (
        <Card extra="w-full p-4 h-full m-4">
            <div className="mb-8 w-full">
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">Best Products Based on Customer Ratings</h4>
                <p className="mt-2 text-base text-gray-600">Discover the top 3 products based on customer ratings.</p>
            </div>
            {topRated.map(renderProduct)}
        </Card>
    );
};

export default Banner1;
