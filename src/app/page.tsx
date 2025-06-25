import { homeGrids } from "@/lib/HomeGrids";
import GridItem from "@/components/pages/HomeComponents/GridItem";
import HeroSection from "@/components/pages/HomeComponents/HeroSection";
import SkillsSection from "@/components/pages/HomeComponents/SkillsSection";
import ExperienceSection from "@/components/pages/HomeComponents/ExperienceSection";
import BlogsSection from "@/components/pages/HomeComponents/BlogsSection";
import LiveProjectsSection from "@/components/pages/HomeComponents/LiveProjectsSection";
import FooterSection from "@/components/pages/HomeComponents/FooterSection";

export default async function Home() {
  // Get individual items
  const blogsItem = homeGrids.find((item) => item.id === "blogs");
  const aboutItem = homeGrids.find((item) => item.id === "about");
  const contactItem = homeGrids.find((item) => item.id === "contact");
  const liveProjectsItem = homeGrids.find(
    (item) => item.id === "live-projects"
  );

  if (!blogsItem || !aboutItem || !contactItem) {
    return <div>Error: Missing grid items</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full viewport height */}
      <HeroSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Blogs Section */}
      <BlogsSection />

      {/* Live Projects Section */}
      <LiveProjectsSection />

      {/* Quick Links Grid Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Explore More
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Discover my work, read my thoughts, and get in touch
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Featured Blog */}
            <div className="xl:col-span-2">
              <GridItem item={blogsItem} />
            </div>

            {/* Side Panel */}
            <div className="flex flex-col gap-6">
              {liveProjectsItem && <GridItem item={liveProjectsItem} />}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6">
                <GridItem item={aboutItem} />
                <GridItem item={contactItem} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
