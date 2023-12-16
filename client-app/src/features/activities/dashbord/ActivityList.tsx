import { Item, Segment, Button, Label, ButtonProps } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity"
import React, { SyntheticEvent, useState } from "react";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityList({ activities, selectActivity, deleteActivity, submitting }: Props) {

    const [targetButton, setTargetButton] = useState("");

    function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTargetButton(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated="right" content="View" color="blue" onClick={() => selectActivity(activity?.id)} />
                                <Button name={activity.id} loading={submitting && targetButton == activity.id} floated="right" content="Delete" color="red" onClick={(e) => handleDeleteActivity(e, activity.id)} />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment >
    );
}