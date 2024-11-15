'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListPlus } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export default function ProductCard({ product, onSelect }) {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToList = (e) => {
    e.stopPropagation();
    toast({
      title: 'Added to list',
      description: `${product.name} has been added to your rental list.`,
    });
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      <div className="relative aspect-square">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>${product.price}/week</p>
          <p>{product.dimensions}</p>
          <p>{product.quantity} available</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleAddToList}
        >
          <ListPlus className="mr-2 h-4 w-4" />
          Add to List
        </Button>
      </CardFooter>
    </Card>
  );
}