import { useJob, useNavigate } from "@moose-desk/core";
import {
  BaseListHelpWidgetRequest,
  GetListHelpWidgetRequest,
  HelpWidget,
  HelpWidgetRepository,
} from "@moose-desk/repo";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { map } from "rxjs";

import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import WidgetDetail from "src/modules/settingChannel/pages/Widgets/WidgetDetail";
import useWidgetSetting from "src/modules/settingChannel/store/useSetting";

const Widgets = () => {
  const ContainerHeight = 400;
  const navigate = useNavigate();
  const [helpwidgets, setHelpWidgets] = useState<HelpWidget[]>([]);
  const message = useMessage();

  const updateWidgetSetting = useWidgetSetting(
    (state) => state.updateWidgetSetting
  );

  const defaultFilter: () => GetListHelpWidgetRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
  });
  const { t, i18n } = useTranslation();

  const [filterData, setFilterData] =
    useState<BaseListHelpWidgetRequest>(defaultFilter);
  const { run: getListHelpWidgetApi, processing: loadingList } = useJob(
    (payload: GetListHelpWidgetRequest) => {
      return HelpWidgetRepository()
        .getList(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setHelpWidgets(
                data.data.sort(
                  (a: HelpWidget, b: HelpWidget) =>
                    b.createdTimestamp - a.createdTimestamp
                )
              );

              updateWidgetSetting({
                ...data?.data[0]?.settings,
                id: data.data[0]._id,
              });
            } else {
              message.error(t("messages:error.get_customer"));
            }
          })
        );
    }
  );

  useEffect(() => {
    getListHelpWidgetApi(filterData);
  }, []);

  return <>{helpwidgets[0] ? <WidgetDetail /> : <></>}</>;
};

export default Widgets;
