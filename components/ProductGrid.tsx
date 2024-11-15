'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Vintage Camera',
      images: [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
        'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848'
      ],
      price: 75,
      dimensions: '12" x 8" x 6"',
      quantity: 3,
    },
    // Add more sample products as needed
  ]);

  const { toast } = useToast();

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target?.result as string;
      const lines = csvData.split('\n');
      const headers = lines[0].split(',');
      
      const newProducts = lines.slice(1).map((line, index) => {
        const values = line.split(',');
        return {
          id: Date.now() + index,
          name: values[0],
          images: values[1].split(' '),
          price: parseFloat(values[2]),
          dimensions: values[3],
          quantity: parseInt(values[4]),
        };
      });

      setProducts([...products, ...newProducts]);
      toast({
        title: 'Products imported successfully',
        description: `${newProducts.length} products have been added.`,
      });
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <div className="mb-8">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
          id="csv-upload"
        />
        <label htmlFor="csv-upload">
          <Button variant="outline" className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            Import Products (CSV)
          </Button>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}