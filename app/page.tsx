import { ProductList } from '@/components/product-list';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Props</h2>
        <ProductList />
      </div>
    </main>
  );
}