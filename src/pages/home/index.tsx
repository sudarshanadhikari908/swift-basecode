import NavBar from "@features/navbar";
import React from "react";
import useHomeHook from "@hooks/home";
import ProductCard from "@features/product-card";
import { IProduct } from "@shared/interface/products";
import "./home.css";
import Loader from "@shared/components/loader";

function Home() {
  const { productList } = useHomeHook();
  return (
    <>
      <NavBar />
      <div className="product-card-container mt-60">
        {productList ? (
          productList?.products?.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}

export default Home;
