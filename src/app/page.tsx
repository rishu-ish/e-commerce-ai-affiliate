"use client";
import { useProducts } from "@lib/queries";

export default function Home() {
  const { data: products, isLoading, isError } = useProducts();
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-[#23272f] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 flex flex-col"
              >
                {/* Product Image */}
                <div className="relative p-4 pb-0">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 pt-2 flex flex-col flex-grow">
                  {/* Title */}
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {product.title}
                  </h2>

                  {/* Description */}
                  {product.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {/* Price */}
                  {typeof product.price === 'number' && (
                    <div className="mb-3">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ₹{product.price.toFixed(2)}
                      </span>
                    </div>
                  )}

                  {/* Category */}
                  {product.category && (
                    <div className="mb-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                        {product.category}
                      </span>
                    </div>
                  )}

                  {/* Action Button */}
                  {product.affiliateLink && (
                    <a
                      href={product.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center text-sm"
                    >
                      View Deal
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="mt-16 text-gray-500 dark:text-gray-400 text-sm text-center">
        &copy; {new Date().getFullYear()} E-Commerce AI Affiliate. All rights reserved.
      </footer>
    </div>
  );
}
