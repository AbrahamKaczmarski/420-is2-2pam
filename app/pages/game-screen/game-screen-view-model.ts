import {
  Button,
  EventData,
  Label,
  Observable,
  Page,
  StackLayout,
} from "@nativescript/core";

import { Choice } from "~/types";

export class GameViewModel extends Observable {
  private _page: Page;
  private _title: string;
  private _id: number;
  private _location: string;
  private _story: StackLayout;
  private _choices: StackLayout;
  // private _documents: Folder;

  constructor(page: Page) {
    super();

    this._page = page;
    this._title = global.campaign.title;
    this._story = page.getViewById("story");
    this._choices = page.getViewById("choices");

    this._id = 0;
    this.updateScene();
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

  get location(): string {
    return this._location;
  }

  set location(value: string) {
    if (this._location !== value) {
      this._location = value;
      this.notifyPropertyChange("location", value);
    }
  }

  goTo(id: number) {
    this._id = id;
    this.updateScene();
  }

  private updateScene() {
    const level = global.campaign.levels[this._id];
    // -- location
    this.location = level.location;
    // -- story paragraphs
    this._story.removeChildren();
    level.story.forEach((segment) => {
      this.addStoryParagraph(segment.text);
    });
    // -- choice buttons
    this._choices.removeChildren();
    level.choices.forEach((choice) => {
      this.addChoiceButton(choice);
    });
  }

  private addStoryParagraph(text: string) {
    const label = new Label();
    label.text = text;
    label.textWrap = true;
    this._story.addChild(label);
  }

  private addChoiceButton({ description, destination }: Choice) {
    const button = new Button();
    button.text = description;
    if (destination !== null) {
      if (destination >= 0) {
        button.addEventListener("tap", () => this.goTo(destination));
      } else {
        button.addEventListener("tap", () =>
          this._page.frame.navigate("main-menu")
        );
      }
    }
    this._choices.addChild(button);
  }

  onMainMenu() {
    this._page.frame.navigate("main-menu");
  }
}
