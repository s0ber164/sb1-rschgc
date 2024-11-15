'use client';

import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/lib/types';

interface CsvUploaderProps {
  onProductsImported: (products: Product[]) => void;
}

export function CsvUploader({ onProductsImported }: CsvUploaderProps) {
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target?.result as string;
      const lines = csvData.split('\n');
      const headers = lines[0].split(',');
      
      const newProducts = lines.slice(1).filter(line => line.trim()).map((line, index) => {
        const values = line.split(',');
        return {
          id: Date.now() + index + '',
          name: values[0]?.trim() ?? '',
          images: values[1]?.trim().split(' ').filter(url => url) ?? [],
          price: parseFloat(values[2]?.trim() ?? '0'),
          dimensions: values[3]?.trim() ?? '',
          quantity: parseInt(values[4]?.trim() ?? '0', 10),
        };
      });

      onProductsImported(newProducts);
      toast({
        title: 'Products imported successfully',
        description: `${newProducts.length} products have been added.`,
      });
    };

    reader.readAsText(file);
  };

  return (
    <div>
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
  );
}