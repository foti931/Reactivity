import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default observer(function ActivityDetails() {

    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        if (id) {
            loadActivity(id);
        }
        if (location.state != undefined) {
            if (location.state.success) {
                toast.success(location.state.message)
            } else {
                toast.error(location.state.message)
            }
        }
    }, [id, loadActivity, location.state]);

    if (loadingInitial || !activity) return <LoadingComponent />

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
            </Grid.Column >
            <Grid.Column width={6}>
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
});