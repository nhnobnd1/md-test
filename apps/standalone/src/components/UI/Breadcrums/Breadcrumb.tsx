import {
  Breadcrumb as BreadcrumbAnt,
  BreadcrumbItemProps as ABreadcrumbItemProps,
  BreadcrumbProps as ABreadcrumbProps,
} from "antd";

export interface BreadcrumbProps extends ABreadcrumbProps {
  items: Array<{
    key: string;
    props: ABreadcrumbItemProps;
  }>;
}

export const Breadcrumb = (props: BreadcrumbProps) => {
  return (
    <BreadcrumbAnt {...props}>
      {props.items.map((item) => (
        <BreadcrumbAnt.Item key={item.key} {...item.props}></BreadcrumbAnt.Item>
      ))}
    </BreadcrumbAnt>
  );
};

export default Breadcrumb;
