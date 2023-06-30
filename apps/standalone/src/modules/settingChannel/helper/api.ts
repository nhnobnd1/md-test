import { HelpWidget, HelpWidgetRepository } from "@moose-desk/repo";
import { lastValueFrom } from "rxjs";

export const getListHelpWidget = (): Promise<HelpWidget> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(HelpWidgetRepository().getList({ limit: 1, page: 1 }))
      .then(({ data }) => resolve(data.data[0]))
      .catch((error) => reject(error));
  });
};

export const updateHelpWidget = (
  id: string,
  object: any
): Promise<HelpWidget> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(HelpWidgetRepository().update(id, object))
      .then(({ data }) => resolve(data.data))
      .catch((error) => reject(error));
  });
};
