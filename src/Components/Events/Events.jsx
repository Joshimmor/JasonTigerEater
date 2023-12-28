
import { useEffect,useState } from "react"
import "./Events.css"
export default function Events() {
  let [events, setEvents] = useState([]);
  // const fetchData = async () => {
  //   let URL = 'https://rest.bandsintown.com/artists/Jason%20Tiger%20Eater/events/?app_id=f0c8a82f00c5f3b7972f0787236a491a'
  //   try {
  //       let response = await axios.get(URL);
  //       let eventList = response.data
  //       setEvents(eventList);
  //       console.log(events)
  //     } catch (error) {
  //       setEvents([{id:1,title:'No Events'}]);
  //     }
  //     return
  // }
  useEffect(()=>{
    fetch( 'https://rest.bandsintown.com/artists/Jason%20Tiger%20Eater/events/?app_id=f0c8a82f00c5f3b7972f0787236a491a')
    .then(response => response.json())
    .then(data => setEvents(data))
    .catch( _ =>{
      console.log(_)
      setEvents([{}])})
  },[])
  return (
    <div className="event-hero">
      <ul>
      {events.length > 0 ? 
      events.map(e =>(
        <EventDisplay key={e.id} event={e}/>
      ))
      :"No Upcoming Events"}

      </ul>
    </div>
  )
}

function EventDisplay ({event}){
  return (
    <li>
        {event.title}
    </li>
  )
}

