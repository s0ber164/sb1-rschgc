'use client';

import { useState } from 'react';
import { ProductCard } from './product-card';
import { ProductDialog } from './product-dialog';
import { CsvUploader } from './csv-uploader';
import { Product } from '@/lib/types';

export function ProductList() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Vintage Film Camera',
      images: [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
        'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848'
      ],
      price: 75,
      dimensions: '12" x 8" x 6"',
      quantity: 3,
    },
    {
      id: '2',
      name: 'Retro Telephone',
      images: [
        'https://images.unsplash.com/photo-1557180295-76eee20ae8aa',
        'https://images.unsplash.com/photo-1558961363-fa8fdf82db35'
      ],
      price: 45,
      dimensions: '10" x 8" x 8"',
      quantity: 5,
    },
  ]);

  return (
    <div>
      <CsvUploader onProductsImported={(newProducts) => setProducts([...products, ...newProducts])} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={() => setSelectedProduct(product)}
          />
        ))}
      </div>
      <ProductDialog
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}