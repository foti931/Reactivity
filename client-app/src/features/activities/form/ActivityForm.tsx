import { observer } from "mobx-react-lite";
import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity.ts";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";
import toast, { Toaster } from "react-hot-toast";

export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const { createActivity, editActivity, loading, loadingInitial, loadActivity } = activityStore;

    const { id } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);

    function handleSubmit() {
        if (activity.id) {
            editActivity(activity).then(() => {
                navigate(`/activities/${activity.id}`, { state: { "success": true, "message": "編集に成功しました" } });
            })
        } else {
            createActivity(activity).then(() => {
                navigate(`/activities/${activity.id}`, { state: { "success": true, "message": "追加に成功しました" } });
            }).catch(error => {
                toast.error(error);
            });
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    if (loadingInitial) return <LoadingComponent />

    return (
        <Segment clearing>
            <Toaster></Toaster>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' type="text" value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input placeholder='Date' type="date" value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button loading={loading} floated="right" positive type="submit" content="Submit" />
                <Button floated="right" type="button" content="Cancel" as={Link} to={'/activities'} />
            </Form>
        </Segment >
    )
});