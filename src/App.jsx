import './App.css'
import AttendeeList from './components/AtteendesList'
import { useEffect , useState} from 'react';

function App() {

  const [attendees, setAttendees] = useState([]);
  const [speakers, setSpeakers] = useState([]);

  useEffect(()=> {
    fetch('https://reactnexus.com/')
    .then(response => response.text())
    .then(html=> {

      let parser = new DOMParser();
      let doc = parser.parseFromString(html, 'text/html');

      const attendeeDivs = doc.querySelectorAll('div.flex.flex-col.items-center.my-5');
      const speakers = [];

      let id = 0;
      attendeeDivs.forEach(div => {
        const nameElement = div.querySelector('div.text-cyan-500.font-bold.text-xl');
        const companyElement = div.querySelector('div.text-gray-100.text-base');

        const name = nameElement ? nameElement.textContent.trim() : '';
        const company = companyElement ? companyElement.textContent.trim() : '';

        if (name && company) {
          speakers.push({
            id,
            name,
            company,
            picture : "https://avatar.iran.liara.run/public?username="+id
          });
        }
        id++;
      });

      console.log(speakers);
      setSpeakers(speakers);
    })
  } , [])

  useEffect(() => {
    fetch('attendes.json')
    .then(response  => response.json()) 
    .then(data => setAttendees(data))
  }, [])


  return (
      <AttendeeList attendees={attendees} speakers={speakers} />
  )
}

export default App
