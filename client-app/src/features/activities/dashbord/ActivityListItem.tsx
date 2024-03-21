import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import { useState } from "react";
import { Activity } from "../../../app/models/activity";
// import { useStore } from "../../../app/stores/store";

interface Props {
    activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src="/assets/user.png" />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title ? activity.title : "No Title"}</Item.Header>
                            <Item.Description>Hosted by Bob</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock" />{activity.date}
                    <Icon name="marker" />{activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button floated="right" content="View" color="teal" as={Link} to={`/activities/${activity.id}`} />
            </Segment>
        </Segment.Group >
    );
}