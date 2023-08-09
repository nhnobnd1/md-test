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
          Automation setup
        </Text>
      </div>
      <div className={styles.wrapThemeSelect}>
        <Combobox
          activator={
            <Combobox.TextField
              prefix={<Icon source={SearchMinor} />}
              onChange={updateText}
              label="Step 1: Select theme"
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
      <div>
        <p>Step 2: Click the button below to go to the Theme Editor</p>
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
        <p>Step 3: Click Save</p>
        <img
          src={
            "https://cdn.shopify.com/s/files/1/0805/0819/1024/files/md-setup-widget-auto-1.png?v=1691587731"
          }
        />
      </div>
      <div className={styles.tutorial}>
        <div className={styles.title}>
          {" "}
          <Text variant="headingMd" as="h2">
            Manual setup
          </Text>
        </div>

        <p>
          - Step 1: From Shopify admin, go to <span>Online Store</span> &#62;{" "}
          <span>Themes</span> &#62; <span>Customize</span>
        </p>
        <img
          src={
            "https://cdn.shopify.com/s/files/1/0805/0819/1024/files/md-setup-widget-manual-step-1.png?v=1691587730"
          }
        />
        <p>
          - Step 2: From the <span>Sections</span> at the left top, click{" "}
          <span>Add section</span> in <span>Footer</span>
        </p>
        <p>
          - Step 3: Click <span>Apps</span> tab, and select{" "}
          <span>MooseDesk Help Widget</span>
        </p>
        <img
          src={
            "https://cdn.shopify.com/s/files/1/0805/0819/1024/files/md-setup-widget-manual-step-2.png?v=1691587730"
          }
        />
        <p>
          - Step 4: Click <span>Save</span>
        </p>
        <img
          src={
            "https://cdn.shopify.com/s/files/1/0805/0819/1024/files/md-setup-widget-manual-step-3.png?v=1691587731"
          }
        />
      </div>

      {/* </Card> */}
    </div>
  );
}
