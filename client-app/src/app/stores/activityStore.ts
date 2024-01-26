import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activityByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        this.activityRegistry.set(activity.id, activity);
      });
      runInAction(() => {
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  setActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.setEditMode(false);
  };

  setEditMode = (state: boolean) => {
    this.editMode = state;
  };

  setActivities = (activities: Activity[]) => {
    activities.forEach((activity) => {
      this.activityRegistry.set(activity.id, activity);
    });
  };

  cancelActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.setActivity(id) : this.cancelActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.setEditMode(false);
  };

  editActivity = async (activity: Activity) => {
    runInAction(() => {
      this.loading = true;
    });
    try {
      await agent.Activities.edit(activity);
      this.activityRegistry.set(activity.id, activity);
      this.setActivity(activity.id);
      runInAction(() => {
        this.setEditMode(false);
        this.loading = true;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setEditMode(false);
        this.loading = true;
      });
    }
  };

  createActivity = async (activity: Activity) => {
    runInAction(() => {
      this.loading = true;
    });
    try {
      activity.id = uuid();
      await agent.Activities.create(activity);
      this.activityRegistry.set(activity.id, activity);
      this.setActivity(activity.id);
      runInAction(() => {
        this.setEditMode(false);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setEditMode(false);
        this.loading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    runInAction(() => {
      this.loading = true;
    });
    try {
      await agent.Activities.delete(id);
      this.activityRegistry.delete(id);
      if (this.selectedActivity?.id === id) this.cancelActivity();
      runInAction(() => {
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
