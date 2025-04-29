import { IGridItem, homeGrids } from '@/lib/HomeGrids';
import Image from 'next/image';

interface GridItemPageProps {
  params: { id: string };
}

export default function GridItemPage({ params }: GridItemPageProps) {
  const item = homeGrids.find((item: IGridItem) => item.id === params.id);
  
  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative h-96">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        
        <div>
          <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
          {item.description && (
            <p className="text-xl mb-6">{item.description}</p>
          )}
          
          <div className="mt-8">
            <a href="/" className="text-blue-600 hover:underline">
              &larr; Back to all items
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}