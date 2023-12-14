import axios from 'axios'
import { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import "./styles.css";
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from '../NavBar';
import ActivityDashbord from '../../features/activities/dashbord/ActivityDashbord';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then(response => {
        console.log(response.data);
        setActivities(response.data)
      })
      .catch(err => (
        console.log(err)
      ))
  }, []);

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashbord activities={activities} />
      </Container>
    </ >
  )
}

export default App
