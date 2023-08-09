import { Combobox, Icon, Link, Listbox, Text } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getListTheme } from "src/modules/settingChannel/components/widgets/Setup/api/api";
import { Theme } from "src/modules/settingChannel/components/widgets/Setup/helper/interface";
import styles from "./setup.module.scss";
export default function Setup() {
  const { getSubDomain } = useSubdomain();
  const { data, isLoading }: any = useQuery({
    queryKey: ["themeList"],
    queryFn: () => getListTheme(),
  });
  const deselectedOptions = useMemo(() => {
    if (!data?.data?.data?.length)
      return [
        { value: "123", label: "Dawn" },
        {
          value: "234",
          label: "Hello",
        },
      ];
    return data?.data?.data?.map((theme: Theme) => {
      return {
        value: String(theme.id),
        label: theme.name,
      };
    });
  }, [data?.data?.data]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);
  const [themeId, setThemeId] = useState<string>("current");
  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions?.filter((option: any) =>
        option?.label?.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions]
  );
  const updateSelection = useCallback(
    (selected: string) => {
      const matchedOption = options?.find((option: any) => {
        return option?.value?.match(selected);
      });

      setThemeId(selected);
      setInputValue((matchedOption && matchedOption.label) || "");
    },
    [options]
  );
  const optionsMarkup =
    options?.length > 0
      ? options?.map((option: any) => {
          const { label, value } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={themeId === value}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  return (
    <div className={styles.container}>
      {/* <Card sectioned> */}
      <div className={styles.title}>
        <Text variant="headingMd" as="h2">
          Select theme to add Web Form
        </Text>
      </div>
      <div className={styles.wrapThemeSelect}>
        <Combobox
          activator={
            <Combobox.TextField
              prefix={<Icon source={SearchMinor} />}
              onChange={updateText}
              label="Theme"
              value={inputValue}
              placeholder="Search themes"
              autoComplete="off"
            />
          }
        >
          {options.length > 0 ? (
            <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
          ) : null}
        </Combobox>
      </div>
      <div className={styles.tutorial}>
        <div className={styles.title}>
          {" "}
          <Text variant="headingMd" as="h2">
            To install the Web Form on online store:
          </Text>
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
        <div
          className={classNames(
            styles.buttonLink,
            "Polaris-Button Polaris-Button--primary"
          )}
        >
          <Link
            removeUnderline
            url={`https://${getSubDomain()}.myshopify.com/admin/themes/${themeId}/editor?template=index&addAppBlockId=ed118f6f-db02-4570-8695-4416c857ded1/app-widget&target=sectionGroup:footer`}
          >
            Go to Theme Editor
          </Link>
        </div>
      </div>
      {/* </Card> */}
    </div>
  );
}
