import { observer } from "mobx-react-lite"
import { Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";
import { Fragment } from "react";

export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;

    return (
        <>
            {
                groupedActivities.map(([group, activities]) => (
                    <Fragment key={group}>
                        <Header sub color="teal">{group}</Header>
                        <Segment>
                            {activities.map(activity => (
                                <ActivityListItem activity={activity} key={activity.id} />
                            ))}
                        </Segment>
                    </Fragment >
                )
                )
            }
        </>
    )
});