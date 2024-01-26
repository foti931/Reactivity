import { observer } from "mobx-react-lite"
import { Item, Segment, Button, Label } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityList() {
    const [targetButton, setTargetButton] = useState("");
    const { activityStore } = useStore();
    const { activityByDate, loading, setActivity, deleteActivity } = activityStore;

    function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTargetButton(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activityByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated="right" content="View" color="blue" onClick={() => setActivity(activity?.id)} />
                                <Button name={activity.id} loading={loading && targetButton == activity.id} floated="right" content="Delete" color="red" onClick={(e) => handleDeleteActivity(e, activity.id)} />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </ Segment>
    );
})