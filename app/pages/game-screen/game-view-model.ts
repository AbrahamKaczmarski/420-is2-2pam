import {
  Button,
  EventData,
  Label,
  Observable,
  Page,
  StackLayout,
} from "@nativescript/core";

// import { Folder, knownFolders } from "@nativescript/core/file-system";

const campaign = require("../../levels/filler/story.json");

export class GameViewModel extends Observable {
  private _page: Page;
  private _storyUi: StackLayout;
  private _choiceUi: StackLayout;
  private _counter: number;
  private _id: number;
  private _message: string;
  private _title: string;
  // private _story: string;
  private _location: string;
  // private _documents: Folder;

  constructor(page: Page) {
    super();

    this._page = page;
    this._title = campaign.title;
    this._storyUi = page.getViewById("story");
    this._choiceUi = page.getViewById("choices");

    this._counter = 42;
    this._id = 0;
    this._location = campaign.title ?? "untitled";
    this.updateScene();
    // this._documents = knownFolders.currentApp();

    // TODO: fix permissions to read files or find another way
    // this._documents.getEntities().then((files) => {
    //   this._story = files.length.toFixed();
    // });
  }

  // get story(): string {
  //   return this._story;
  // }

  // set story(value: string) {
  //   if (this._story !== value) {
  //     this._story = value;
  //     this.notifyPropertyChange("story", value);
  //   }
  // }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    if (this._title !== value) {
      this._title = value;
      this.notifyPropertyChange("title", value);
    }
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    if (this._message !== value) {
      this._message = value;
      this.notifyPropertyChange("message", value);
    }
  }

  set id(value: number) {
    if (this._id !== value) {
      this._id = value;
      this.notifyPropertyChange("message", value);
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

  onNext() {
    this._id = (this._id + 1) % campaign.levels.length;
    this.updateScene();
  }

  private updateScene() {
    this._storyUi.removeChildren();
    campaign.levels[this._id].story.forEach((segment) => {
      this.addStoryParagraph(segment.text);
    });
  }

  private addStoryParagraph(text: string) {
    const label = new Label();
    label.text = text;
    this._storyUi.addChild(label);
  }

  onMainMenu() {
    this._page.frame.navigate("main-menu");
  }

  // private updateMessage() {
  //   if (this._counter <= 0) {
  //     this.message =
  //       "Hoorraaay! You unlocked the NativeScript clicker achievement!";
  //   } else {
  //     this.message = `${this._counter} taps left`;
  //   }
  // }
}
