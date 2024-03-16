import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activityByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        this.setActivity(activity);
      });
      runInAction(() => {
        this.setLoadingInitial(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoadingInitial(false);
      });
    }
  };

  private setLoadingInitial(bool: boolean) {
    this.loadingInitial = bool;
  }

  private setLoading(bool: boolean) {
    this.loading = bool;
  }

  setEditMode = (state: boolean) => {
    this.editMode = state;
  };

  setActivities = (activities: Activity[]) => {
    activities.forEach((activity) => {
      this.activityRegistry.set(activity.id, activity);
    });
  };

  editActivity = async (activity: Activity) => {
    runInAction(() => {
      this.setLoading(true);
      this.setEditMode(true);
    });
    try {
      await agent.Activities.edit(activity);
      this.activityRegistry.set(activity.id, activity);
      this.setActivity(activity);
      runInAction(() => {
        this.setEditMode(false);
        this.setLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setEditMode(false);
        this.setLoading(false);
      });
    }
  };

  loadActivity = async (id: string) => {
    const activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      this.setLoadingInitial(false);
      return activity;
    } else {
      this.setLoadingInitial(true);
      try {
        const activity = await agent.Activities.detail(id);
        runInAction(() => {
          this.selectedActivity = activity;
          this.setActivity(activity);
          this.setLoadingInitial(false);
        });
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setActivity(activity: Activity) {
    activity.date = activity.date.split("T")[0];
    this.activityRegistry.set(activity.id, activity);
  }

  private getActivity(id: string) {
    return this.activityRegistry.get(id);
  }

  createActivity = async (activity: Activity) => {
    runInAction(() => {
      this.setLoading(true);
    });
    try {
      activity.id = uuid();
      await agent.Activities.create(activity).then();
      this.activityRegistry.set(activity.id, activity);
      this.setActivity(activity);
      runInAction(() => {
        this.setEditMode(false);
        this.setLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setEditMode(false);
        this.setLoading(false);
      });
    }
  };

  deleteActivity = async (id: string) => {
    runInAction(() => {
      this.setLoading(true);
    });
    try {
      await agent.Activities.delete(id);
      this.activityRegistry.delete(id);
      if (this.selectedActivity?.id === id) this.activityRegistry.delete(id);
      runInAction(() => {
        this.setLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };
}
