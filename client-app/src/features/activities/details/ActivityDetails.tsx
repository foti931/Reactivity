import { observer } from "mobx-react-lite";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
        <Card fluid>
            <Toaster></Toaster>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content='Edit' />
                        <Button as={Link} to='/activities' basic color="grey" content='Cancel' />
                    </Button.Group>
                </Card.Content>
            </Card.Content>
        </Card >
    )
});