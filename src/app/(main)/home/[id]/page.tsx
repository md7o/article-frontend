import { IGridItem, homeGrids } from "@/lib/HomeGrids";
import Link from "next/link";

interface GridItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function GridItemPage({ params }: GridItemPageProps) {
  const { id } = await params;
  const item = homeGrids.find((item: IGridItem) => item.id === id);

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div
          className="relative h-96 bg-gradient-to-br rounded-lg"
          style={{ background: item.background }}
        >
          <div className="flex items-center justify-center h-full">
            <h2
              className={`text-6xl font-bold ${item.textColor || "text-white"}`}
            >
              {item.tag || item.title || "Item"}
            </h2>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">
            {item.title || "Untitled"}
          </h1>
          {item.description && (
            <p className="text-xl mb-6">{item.description}</p>
          )}

          {item.link && (
            <div className="mb-6">
              <Link
                href={item.link}
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {item.buttonText || "View More"}
              </Link>
            </div>
          )}

          <div className="mt-8">
            <Link href="/" className="text-blue-600 hover:underline">
              &larr; Back to all items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
