import {
  BreadcrumbItemProps as ABreadcrumbItemProps,
  Breadcrumb as BreadcrumbAnt,
} from "antd";
import classNames from "classnames";
import "./BreadCrumb.scss";

export interface BreadcrumbProps {
  items: Array<{
    key: string;
    props: ABreadcrumbItemProps;
  }>;
  className?: string;
}

export const Breadcrumb = (props: BreadcrumbProps) => {
  return (
    <BreadcrumbAnt
      {...props}
      className={classNames([props.className, "BreadCrumbs"])}
    >
      {props.items.map((item) => (
        <BreadcrumbAnt.Item key={item.key} {...item.props}></BreadcrumbAnt.Item>
      ))}
    </BreadcrumbAnt>
  );
};

export default Breadcrumb;
