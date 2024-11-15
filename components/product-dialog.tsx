'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ListPlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface ProductDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDialog({ product, isOpen, onClose }: ProductDialogProps) {
  const { toast } = useToast();

  if (!product) return null;

  const handleAddToList = () => {
    toast({
      title: 'Added to list',
      description: `${product.name} has been added to your rental list.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square">
                      <Image
                        src={image}
                        alt={`${product.name} - View ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <div className="space-y-2">
              <p className="text-xl font-semibold">${product.price}/week</p>
              <p className="text-muted-foreground">Dimensions: {product.dimensions}</p>
              <p className="text-muted-foreground">{product.quantity} available</p>
            </div>
            <Button
              className="w-full mt-4"
              onClick={handleAddToList}
            >
              <ListPlus className="mr-2 h-4 w-4" />
              Add to List
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}