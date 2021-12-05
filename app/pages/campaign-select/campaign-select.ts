import { EventData, Page } from "@nativescript/core";
import { CampaignSelectViewModel } from "./campaign-select-view-model";

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new CampaignSelectViewModel(page);
}
