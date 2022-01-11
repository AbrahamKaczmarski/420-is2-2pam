import {
  Button,
  Observable,
  Page,
  StackLayout,
  Http,
  ImageCache,
  Image,
} from "@nativescript/core";
import * as storage from "@nativescript/core/application-settings";

import { API_URL, IMG_URL } from "~/global";
import { Campaign } from "~/types";

export class CampaignSelectViewModel extends Observable {
  private _page: Page;
  private _title: string;
  private _campaignList: StackLayout;
  private _cachedList: StackLayout;

  private _noConnection: string;
  private _cacheEmpty: boolean;

  constructor(page: Page) {
    super();

    this._page = page;
    this._title = "Campaign select";
    this._campaignList = page.getViewById("campaigns");
    this._cachedList = page.getViewById("cached-campaigns");

    if (!global.imageCache) {
      global.imageCache = new ImageCache();
    }

    this.refresh();
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    if (this._title !== value) {
      this._title = value;
      this.notifyPropertyChange("title", value);
    }
  }

  get cacheEmpty(): boolean {
    return this._cacheEmpty;
  }

  set cacheEmpty(value: boolean) {
    if (this._cacheEmpty !== value) {
      this._cacheEmpty = value;
      this.notifyPropertyChange("cacheEmpty", value);
    }
  }

  get noConnection(): string {
    return this._noConnection;
  }

  set noConnection(value: string) {
    if (this._noConnection !== value) {
      this._noConnection = value;
      this.notifyPropertyChange("noConnection", value);
    }
  }

  private refresh() {
    this._noConnection = "No new campaigns are available";

    const cached = storage.getAllKeys();
    this.cacheEmpty = cached.length === 0;

    this._cachedList.removeChildren();
    this._campaignList.removeChildren();

    cached.forEach((key) => {
      this.displayCachedCampaign(key);
    });

    Http.getJSON(API_URL).then((campaigns: any) => {
      this.noConnection = "";
      campaigns.forEach(
        (title, id) => !cached.includes(title) && this.addCampaign(id, title)
      );
    });
  }

  private addCampaign(id: number, title: string) {
    const button = new Button();
    button.text = title;
    button.addEventListener("tap", () => {
      Http.getJSON<Campaign>(`${API_URL}/${id}`).then((story) => {
        global.imgPrefix = title;
        global.campaign = story;
        storage.setString(title, JSON.stringify(story));
        this.cacheImages(title, story);
        this._page.frame.navigate("pages/game-screen/game-screen");
      });
    });
    this._campaignList.addChild(button);
  }

  private displayCachedCampaign(key: string) {
    const button = new Button();
    button.text = `${key} (saved)`;
    button.addEventListener("tap", () => {
      const story = JSON.parse(storage.getString(key));
      global.imgPrefix = key;
      global.campaign = story;
      this._page.frame.navigate("pages/game-screen/game-screen");
    });
    this._cachedList.addChild(button);
  }

  clearCashe() {
    storage.clear();
    this.refresh();
  }

  onMainMenu() {
    this._page.frame.navigate("main-menu");
  }

  private cacheImages(title: string, campaign: Campaign) {
    campaign.levels.forEach((level) => {
      level.story.forEach(({ image }) => {
        if (image) {
          const url = `${IMG_URL}/${title}/${image}.jpg`;
          const img = global.imageCache.get(url);
          if (!img) {
            global.imageCache.push({
              key: url,
              url: url,
            });
          }
        }
      });
    });
  }
}
