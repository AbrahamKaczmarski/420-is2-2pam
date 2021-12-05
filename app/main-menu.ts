import { EventData, Page } from "@nativescript/core";
import { MenuViewModel } from "./main-menu-view-model";

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new MenuViewModel();
}
