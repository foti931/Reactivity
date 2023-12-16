import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../folder/ActivityForm";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    handleFormOpen: (id?: string) => void;
    handleFormClose: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    isLoading: boolean;
    submitting: boolean;
}

export default function ActivityDashbord({
    activities,
    selectedActivity,
    selectActivity,
    cancelSelectActivity,
    editMode,
    handleFormOpen,
    handleFormClose,
    createOrEdit,
    deleteActivity,
    isLoading,
    submitting
}: Props) {

    // Loadding
    if (isLoading) return <LoadingComponent />;

    return (
        <>
            <Grid>
                <Grid.Column width='10' >
                    <ActivityList
                        activities={activities}
                        selectActivity={selectActivity}
                        deleteActivity={deleteActivity}
                        submitting={submitting} />
                </Grid.Column>
                <Grid.Column width='6'>
                    {selectedActivity && !editMode &&
                        < ActivityDetails
                            activity={selectedActivity}
                            cancelSelectActivity={cancelSelectActivity}
                            handleFormOpen={handleFormOpen}
                            handleFormClose={handleFormClose} />
                    }
                    {editMode &&
                        <ActivityForm
                            activity={selectedActivity}
                            selectActivity={selectActivity}
                            cancelSelectActivity={cancelSelectActivity}
                            handleFormClose={handleFormClose}
                            createOrEdit={createOrEdit}
                            submitting={submitting} />}
                </Grid.Column>
            </Grid >
        </>
    )
}