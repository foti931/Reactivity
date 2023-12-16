import { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import "./styles.css";
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from '../NavBar';
import ActivityDashbord from '../../features/activities/dashbord/ActivityDashbord';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    agent.Activities.list().then(response => {
      const activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    })
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
    setEditMode(false);
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
    setEditMode(false);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  // activityの追加/更新
  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities
        .edit(activity)
        .then(() => {
          setActivities([...activities.filter(x => x.id !== activity.id), activity]);
          setEditMode(false);
          setSelectedActivity(activity);
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        })
    }
    else {
      activity.id = uuid();
      agent.Activities
        .create(activity)
        .then(() => {
          setEditMode(false);
          setActivities([...activities, { ...activity, id: uuid() }]);
          setSelectedActivity(activity);
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        })
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities
      .delete(id)
      .then(() => {
        setActivities([...activities.filter(x => x.id !== id)]);
        setEditMode(false);
        setSelectedActivity(undefined);
        setSubmitting(false);
      })
      .catch(err => {
        console.log(err);
        setSubmitting(false);
        setEditMode(false);
      })
  }

  return (
    <>
      <NavBar handleFormOpen={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashbord
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          handleFormOpen={handleFormOpen}
          handleFormClose={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          isLoading={isLoading}
          submitting={submitting}
        />
      </Container>
    </ >
  )
}

export default App
