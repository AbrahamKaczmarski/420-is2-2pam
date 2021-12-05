import {
  Button,
  EventData,
  Label,
  Observable,
  Page,
  StackLayout,
} from "@nativescript/core";
import { Campaign } from "~/types";

import campaigns from "../../levels";

export class CampaignSelectViewModel extends Observable {
  private _page: Page;
  private _title: string;
  private _campaignList: StackLayout;

  constructor(page: Page) {
    super();

    this._page = page;
    this._title = "Campaign select";
    this._campaignList = page.getViewById("campaigns");

    campaigns.forEach((e) => this.addCampaign(e));
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

  private addCampaign(c: Campaign) {
    const button = new Button();
    button.text = c.title;
    button.addEventListener("tap", () => {
      global.campaign = c;
      this._page.frame.navigate("pages/game-screen/game-screen");
    });
    this._campaignList.addChild(button);
  }

  onMainMenu() {
    this._page.frame.navigate("main-menu");
  }
}
