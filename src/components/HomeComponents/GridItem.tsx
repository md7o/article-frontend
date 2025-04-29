import Link from 'next/link';
import Image from 'next/image';
import type { IGridItem } from '@/lib/HomeGrids';

interface GridItemProps {
  item: IGridItem;
}

export default function GridItem({ item }: GridItemProps) {
  const sizeClasses = {
    huge: 'col-span-2 row-span-1 h-[510px]',
    large: 'col-span-2 row-span-1 h-[300px]',
    medium: 'col-span-1 row-span-1 h-[300px]', 
    small: 'col-span-1 row-span-1 h-[200px]'
  };

  return (
    <Link
      href={`/${item.id}`}
      className={`relative overflow-hidden rounded-3xl group ${sizeClasses[item.size]} ${
        item.id === 'all-projects' ? 'md:row-start-1 md:col-start-3' : ''
      } ${
        item.id === 'profile' ? 'md:row-start-2 md:col-start-3' : ''
      }`}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/70 bg-opacity-30 flex flex-col justify-end p-6 text-white">
        <h3 className="text-2xl font-bold">{item.title}</h3>
        {item.description && (
          <p className="mt-2 text-sm">{item.description}</p>
        )}
      </div>
    </Link>
  );
}