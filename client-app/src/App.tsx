import axios from 'axios'
import './App.css'
import { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import "./index.css";
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/activities")
      .then(response => {
        console.log(response.data);
        setActivities(response.data)
      })
      .catch(err => (
        console.log(err)
      ))
  }, []);

  return (
    <div>
      <Header as="h2" icon="users" content="Reactivities"></Header>
      <List>
        {activities.map((activitiy: any) => (
          <List.Item key={activitiy.id}>
            {activitiy.title}
          </List.Item>
        ))}
      </List>
    </div >
  )
}

export default App
