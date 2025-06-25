import { homeGrids } from "@/lib/HomeGrids";
import GridItem from "@/components/pages/HomeComponents/GridItem";

export default async function Home() {
  // Get individual items
  const blogsItem = homeGrids.find((item) => item.id === "blogs");
  const aboutItem = homeGrids.find((item) => item.id === "about");
  const liveProjectsItem = homeGrids.find(
    (item) => item.id === "live-projects"
  );
  const contactItem = homeGrids.find((item) => item.id === "contact");

  if (!blogsItem || !aboutItem || !liveProjectsItem || !contactItem) {
    return <div>Error: Missing grid items</div>;
  }

  return (
    <section>
      {/* Quick Links Grid Section */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-2 max-w-7xl mx-auto">
          {/* First Row: Blogs and Live Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <div className="lg:col-span-2">
              <GridItem item={blogsItem} />
            </div>
            <div className="lg:col-span-1">
              <GridItem item={liveProjectsItem} />
            </div>
          </div>

          {/* Second Row: About and Contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="lg:col-span-1">
              <GridItem item={contactItem} />
            </div>
            <div className="lg:col-span-2">
              <GridItem item={aboutItem} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
