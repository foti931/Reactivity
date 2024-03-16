import { observer } from "mobx-react-lite"
import { Item, Segment, Button, Label } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default observer(function ActivityList() {
    const [targetButton, setTargetButton] = useState("");
    const { activityStore } = useStore();
    const { activityByDate, loading, deleteActivity } = activityStore;

    function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string, title: string) {
        setTargetButton(e.currentTarget.name);
        deleteActivity(id).then(() => {
            toast.success(`タイトル「${title}」を削除しました。`)
        }).catch(() => {
            toast.error(`タイトル「${title}」の削除に失敗しました。`)
        });
    }

    return (
        <Segment>
            <Toaster></Toaster>
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
                                <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="blue" />
                                <Button name={activity.id} loading={loading && targetButton == activity.id} floated="right" content="Delete" color="red" onClick={(e) => handleDeleteActivity(e, activity.id, activity.title)} />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </ Segment>
    );
})