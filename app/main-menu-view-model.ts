import { Button, EventData, Observable, Page } from "@nativescript/core";

export class MenuViewModel extends Observable {
  constructor() {
    super();
  }

  onNewGame(args: EventData) {
    const button: Button = <Button>args.object;
    const page: Page = button.page;
    page.frame.navigate("pages/campaign-select/campaign-select");
  }
}
