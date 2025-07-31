"use client";
import { useProducts } from "@lib/queries";
import Image from "next/image";

interface Product {
  _id: string;
  title: string;
  description?: string;
  price?: number;
  image?: string;
  affiliateLink?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function Home() {
  const { data: products, isLoading, isError } = useProducts();
  function ProductCard({ product, style }: { product: Product; style?: React.CSSProperties }) {
    return (
      <div
        style={style}
        className="rounded-xl overflow-hidden shadow-md bg-white dark:bg-[#23272f] p-2 flex flex-col justify-between"
        onClick={() => {
          window.open(product.affiliateLink);
        }}
      >
        <div className="flex-1 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
          {product.image ? (
            <Image width={100} height={100} src={product.image} alt={product.title} className="object-cover w-full h-full" />
          ) : (
            <div className="text-gray-400 text-sm">No image</div>
          )}
        </div>
        <h2 className="text-xs font-semibold text-gray-900 dark:text-white truncate">
          {product.title}
        </h2>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading products...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Failed to load products.</div>;
  }

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-[#18181b] dark:to-[#23272f] p-6 sm:p-12 flex flex-col items-center">
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Shop the Latest Tech</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">Discover trending gadgets and accessories at unbeatable prices. Fast shipping. Easy returns. Shop now!</p>
      </header>
      <main className="w-full max-w-6xl">
        {!products || products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No products available at the moment.
            </div>
            <p className="text-gray-400 dark:text-gray-500">
              Check back soon for new arrivals!
            </p>
          </div>
        ) : (
          <div className="mt-10 flex justify-center items-center">
            <div
              style={{
                backgroundColor: '#333333',
                width: '70vw',
                padding: '1vh',
                borderRadius: '1vh',
              }}
              className="flex flex-col gap-3"
            >
              <div className="flex justify-center gap-3">
                {products && products[3] && (
                  <ProductCard
                    product={products[3]}
                    style={{ backgroundColor: '#000000', width: '92vw', height: '30vh' }}
                  />
                )}
                <div className="flex flex-col gap-3">
                  {products && products[1] && (
                    <ProductCard
                      product={products[1]}
                      style={{ backgroundColor: '#000000', width: '16vw', height: '14vh' }}
                    />
                  )}
                  {products && products[2] && (
                    <ProductCard
                      product={products[2]}
                      style={{ backgroundColor: '#000000', width: '16vw', height: '15vh' }}
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                {[1, 2, 0].map((i) =>
                  products && products[i] ? (
                    <ProductCard
                      key={products[i]._id}
                      product={products[i]}
                      style={{ backgroundColor: '#000000', height: '17vh' }}
                    />
                  ) : null
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="mt-16 text-gray-500 dark:text-gray-400 text-sm text-center">
        &copy; {new Date().getFullYear()} E-Commerce AI Affiliate. All rights reserved.
      </footer>
    </div>
  );
}
