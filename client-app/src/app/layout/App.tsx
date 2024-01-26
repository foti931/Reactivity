import { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import "./styles.css";
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashbord from '../../features/activities/dashbord/ActivityDashbord';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from './LoadingComponent';

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  return (
    <>
      {activityStore.loadingInitial && <LoadingComponent />}
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashbord />
      </Container>
    </ >
  )
}

export default observer(App);