import { Button, EventData, Observable, Page } from "@nativescript/core";

import { Folder, knownFolders } from "@nativescript/core/file-system";

export class GameViewModel extends Observable {
  private _counter: number;
  private _message: string;
  private _story: string;
  private _documents: Folder;

  constructor() {
    super();

    this._counter = 42;
    this._documents = knownFolders.currentApp();

    // TODO: fix permissions to read files or find another way
    this._documents.getEntities().then((files) => {
      this._story = files.length.toFixed();
    });
  }

  get story(): string {
    return this._story;
  }

  set story(value: string) {
    if (this._story !== value) {
      this._story = value;
      this.notifyPropertyChange("story", value);
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

  onTap() {
    this._counter--;
    this.updateMessage();
  }

  onMainMenu(args: EventData) {
    const button: Button = <Button>args.object;
    const page: Page = button.page;
    page.frame.navigate("main-menu");
  }

  private updateMessage() {
    if (this._counter <= 0) {
      this.message =
        "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
      this.message = `${this._counter} taps left`;
    }
  }
}
