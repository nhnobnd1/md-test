export interface Option {
  label: string;
  value: string | undefined;
}

export interface Choice extends Option {
  id?: string;
  disabled?: boolean;
  helpText?: React.ReactNode;
  describedByError?: boolean;
  renderChildren?: (isSelected: boolean) => any;
}

export enum SortOrderOptions {
  ACS = "acs",
  DES = "des",
}
