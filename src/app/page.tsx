import { homeGrids } from "@/lib/HomeGrids";
import GridItem from "@/components/pages/HomeComponents/GridItem";

export default async function Home() {
  // Get individual items
  const blogsItem = homeGrids.find((item) => item.id === "blogs");
  const aboutItem = homeGrids.find((item) => item.id === "about");
  const projectsItem = homeGrids.find((item) => item.id === "all-projects");
  const profileItem = homeGrids.find((item) => item.id === "profile");

  if (!blogsItem || !aboutItem || !projectsItem || !profileItem) {
    return <div>Error: Missing grid items</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 w-full 3xl:px-50 xl:px-20 px-5">
        {/* Blogs (large) */}

        <GridItem item={blogsItem} />

        {/* Combined Projects & Profile Cell */}
        <div className="flex flex-col gap-2 h-full">
          <GridItem item={projectsItem} />

          <GridItem item={profileItem} />
        </div>

        {/* About */}
        {/* <GridItem item={aboutItem} /> */}

        {/* Other items */}
        {homeGrids
          .filter(
            (item) =>
              !["blogs", "all-projects", "profile", "settings"].includes(
                item.id
              )
          )
          .map((item) => (
            <GridItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}
