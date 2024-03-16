import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityList from './ActivityList';
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
// import { useLocation } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore;


    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities])

    return (
        <Grid>
            {activityStore.loadingInitial && <LoadingComponent />}
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
            </Grid.Column>
        </Grid >
    )
})
