import { Select } from "antd";
import Link from "antd/es/typography/Link";
import classNames from "classnames";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getListTheme } from "src/modules/settingChannel/components/Widgets/Setup/api/api";
import { Theme } from "src/modules/settingChannel/components/Widgets/Setup/helper/interface";
import styles from "./setup.module.scss";
export default function Setup() {
  const { getSubDomain } = useSubdomain();
  const { data, isLoading }: any = useQuery({
    queryKey: ["themeList"],
    queryFn: () => getListTheme(),
  });

  const options = useMemo(() => {
    if (!data?.data?.data?.length) return [];
    return data?.data?.data?.map((theme: Theme) => {
      return {
        value: theme.id,
        label: theme.name,
      };
    });
  }, [data?.data?.data]);
  const [themeId, setThemeId] = useState<string>("current");
  const handleChangeTheme = (value: number) => {
    setThemeId(value ? String(value) : "current");
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Select theme to add Web Form</h2>
      </div>
      <div className={styles.wrapThemeSelect}>
        <p className={styles.label}>Theme</p>
        <Select
          className={styles.select}
          showSearch
          placeholder="Search themes"
          optionFilterProp="children"
          onChange={handleChangeTheme}
          allowClear
          loading={isLoading}
          filterOption={(input: any, option: any) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={options}
        />
      </div>
      <div className={styles.tutorial}>
        <div className={styles.title}>
          <h2>To install the Web Form on online store:</h2>
        </div>

        <p>
          - From Shopify admin, go to <span>Online Store</span> &#62;{" "}
          <span>Themes</span> &#62; <span>Customize</span>
        </p>
        <p>
          - From the <span>Sections</span> at the left top, click{" "}
          <span>Add section</span> in <span>Footer</span>
        </p>
        <p>
          - Click <span>Apps</span> tab, and select{" "}
          <span>MooseDesk Help Widget</span>
        </p>
        <p>
          - Click <span>Save</span>
        </p>
      </div>
      <div className={styles.videoContainer}>
        <div className={styles.wrapVideo}>
          <iframe
            src="https://www.youtube.com/embed/C5Ii1IOA-Xg"
            title="Tutorial to install Web Form on Online store"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>
      <div>
        <div className={classNames(styles.buttonLink)}>
          <Link
            target="_blank"
            href={`https://${getSubDomain()}.myshopify.com/admin/themes/${themeId}/editor?template=index&addAppBlockId=ed118f6f-db02-4570-8695-4416c857ded1/app-widget&target=sectionGroup:footer`}
          >
            Go to Theme Editor
          </Link>
        </div>
      </div>
      {/* </Card> */}
    </div>
  );
}
