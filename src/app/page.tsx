import { homeGrids, IGridItem } from '@/lib/HomeGrids';
import GridItem from '@/components/HomeComponents/GridItem';
import { login } from '@/lib/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const displayOrder = ['blogs', 'combined-cell', 'settings', 'live-projects'];

  // Get individual items
  const blogsItem = homeGrids.find(item => item.id === 'blogs');
  const settingsItem = homeGrids.find(item => item.id === 'settings');
  const projectsItem = homeGrids.find(item => item.id === 'all-projects');
  const profileItem = homeGrids.find(item => item.id === 'profile');

  if (!blogsItem || !settingsItem || !projectsItem || !profileItem) {
    return <div>Error: Missing grid items</div>;
  }
  
  // const isLoggedIn = (await cookies()).get('auth-token')?.value; // Or your auth method
  // if (!isLoggedIn) {
  //   redirect('/login'); // Redirect to login page if not authenticated
  // }

  return (
    <div className=" ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-[100rem] mx-auto">
        {/* Blogs (large) */}
       
       
        <GridItem item={blogsItem} />

        {/* Combined Projects & Profile Cell */}
        <div className="flex flex-col gap-2 h-full">
        
            <GridItem item={projectsItem} />
         
        
            <GridItem item={profileItem} />
          
        </div>

        {/* Settings */}
        <GridItem item={settingsItem} />

        {/* Other items */}
        {homeGrids
          .filter(item => !['blogs', 'all-projects', 'profile', 'settings'].includes(item.id))
          .map((item) => (
            <GridItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}