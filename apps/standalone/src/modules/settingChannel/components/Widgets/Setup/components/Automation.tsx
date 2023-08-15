import { Select } from "antd";
import Link from "antd/es/typography/Link";
import classNames from "classnames";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getListTheme } from "src/modules/settingChannel/components/Widgets/Setup/api/api";
import { Theme } from "src/modules/settingChannel/components/Widgets/Setup/helper/interface";
import styles from "../setup.module.scss";

export const Automation = React.memo(() => {
  const { getSubDomain } = useSubdomain();
  const [themeId, setThemeId] = useState<string>("");
  const { data, isFetching }: any = useQuery({
    queryKey: ["themeList"],
    queryFn: () => getListTheme(),
    keepPreviousData: true,
    onSuccess: ({ data }: any) => {
      const liveTheme = data?.data?.find(
        (theme: Theme) => theme.role === "main"
      );
      setThemeId(String(liveTheme.id));
    },
  });

  const options = useMemo(() => {
    if (!data?.data?.data?.length) return [];
    return data?.data?.data?.map((theme: Theme) => {
      return {
        value: String(theme.id),
        label: `${theme.name}${theme.role === "main" ? " (Live theme)" : ""}`,
      };
    });
  }, [data?.data?.data]);
  const handleChangeTheme = (value: string) => {
    setThemeId(value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Automation setup</h2>
      </div>
      <div className={styles.wrapThemeSelect}>
        <p>
          <span className={styles.stepText}>Step 1:</span> Select theme
        </p>
        <Select
          className={styles.select}
          //   placeholder="Search themes"
          //   optionFilterProp="children"
          onChange={handleChangeTheme}
          loading={isFetching}
          //   filterOption={(input: any, option: any) =>
          //     (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          //   }
          options={options}
          value={themeId}
        />
      </div>
      <div className={styles.stepWrap}>
        <p>
          <span className={styles.stepText}>Step 2:</span> Click the button
          below to go to the Theme Editor
        </p>
        <div
          className={classNames(styles.buttonLink, {
            [styles.disabledBtn]: isFetching,
          })}
        >
          <Link
            target="_blank"
            href={`https://${getSubDomain()}.myshopify.com/admin/themes/${
              themeId || "current"
            }/editor?context=apps&template=index&activateAppId=${
              import.meta.env.VITE_THEME_WIDGET_ID
            }/app-widget`}
          >
            Go to Theme Editor
          </Link>
        </div>
      </div>
      <div className={styles.stepWrap}>
        <p>
          <span className={styles.stepText}>Step 3:</span> Click{" "}
          <span>Save</span>
        </p>
        <div className={styles.imageContainer}>
          <div className={styles.wrapImage}>
            <img
              src="https://cdn.shopify.com/s/files/1/0805/0819/1024/files/md-help-widget-setup-auto-1.png?v=1692075440"
              alt="auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
