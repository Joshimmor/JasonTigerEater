

import ShowSection from '@/components/ShowsSection';
import { getUpcomingShows } from '@/lib/bandsintown';

export default async function ShowsPage() {
    const [ shows] = await Promise.all([

        getUpcomingShows(),
      
      ]);
  return (
    <div>
      <ShowSection shows={shows} />
    </div>
  );
}
