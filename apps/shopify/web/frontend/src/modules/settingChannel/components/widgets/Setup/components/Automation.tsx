import { Link, Select, Spinner, Text } from "@shopify/polaris";
import classNames from "classnames";
import React, { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getListTheme } from "src/modules/settingChannel/components/widgets/Setup/api/api";
import { Theme } from "src/modules/settingChannel/components/widgets/Setup/helper/interface";
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
  const deselectedOptions = useMemo(() => {
    if (!data?.data?.data?.length) return [];
    return data?.data?.data?.map((theme: Theme) => {
      return {
        value: String(theme.id),
        label: `${theme.name}${theme.role === "main" ? " (Live theme)" : ""}`,
      };
    });
  }, [data?.data?.data]);
  const handleSelectChange = useCallback(
    (value: string) => setThemeId(value),
    []
  );
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Text variant="headingMd" as="h2">
          Automation setup
        </Text>
      </div>
      <div className={styles.wrapThemeSelect}>
        <Select
          label={
            isFetching ? (
              <Spinner size="small" />
            ) : (
              <p>
                <span className={styles.stepText}>Step 1:</span> Select theme
              </p>
            )
          }
          options={deselectedOptions}
          onChange={handleSelectChange}
          value={themeId}
        />
      </div>

      <div className={styles.stepWrap}>
        <p>
          <span className={styles.stepText}>Step 2:</span> Click the button
          below to go to the Theme Editor
        </p>
        <div
          className={classNames(
            styles.buttonLink,
            "Polaris-Button Polaris-Button--primary",
            { [styles.disabledBtn]: isFetching }
          )}
        >
          <Link
            removeUnderline
            url={`https://${getSubDomain()}.myshopify.com/admin/themes/${
              themeId || "current"
            }/editor?context=apps&template=index&activateAppId=07370181-6fc0-4239-952b-84901be873c5/app-widget`}
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
              src={
                "https://cdn.shopify.com/s/files/1/0805/0819/1024/files/md-setup-widget-auto-1.png?v=1691587731"
              }
              alt="auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
