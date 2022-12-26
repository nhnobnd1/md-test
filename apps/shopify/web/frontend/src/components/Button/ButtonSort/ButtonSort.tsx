import {
  Button,
  ChoiceList,
  Icon,
  Popover,
  PopoverProps,
  Text,
  TextContainer,
} from "@shopify/polaris";
import { SortMinor } from "@shopify/polaris-icons";
import { Choice } from "src/models/Form";

interface ButtonSortProps extends Omit<PopoverProps, "activator"> {
  options: Choice[];
  onShow: () => void;
  sortValue: string[];
  onSort: (selected: string[], name: string) => void;
}

export const ButtonSort = ({
  options,
  sortValue,
  onShow,
  onSort,
  ...props
}: ButtonSortProps) => {
  return (
    <Popover
      {...props}
      preferredAlignment={"right"}
      captureOverscroll
      activator={
        <Button
          onClick={onShow}
          icon={() => <Icon source={() => <SortMinor />} color="base" />}
        >
          Sort
        </Button>
      }
    >
      <Popover.Pane>
        <Popover.Section>
          <TextContainer spacing="tight">
            <Text variant="bodyMd" as="span" color="subdued">
              Sort by
            </Text>
            <ChoiceList
              title=""
              choices={options as any}
              selected={sortValue}
              onChange={onSort}
            />
          </TextContainer>
        </Popover.Section>
      </Popover.Pane>
    </Popover>
  );
};

export default ButtonSort;
