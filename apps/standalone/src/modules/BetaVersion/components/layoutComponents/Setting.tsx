import { ListTicketCustomer } from "@moose-beta/components/layoutComponents/component/CustomerTicket/ListTicketCustomer";
import { Security } from "@moose-beta/components/layoutComponents/component/Security";
import { Tickets } from "@moose-beta/components/layoutComponents/component/Tickets";
import { useNavigate, useSearchParams } from "@moose-desk/core";
import { Tabs, TabsProps } from "antd";
import React from "react";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import MDAvatar from "src/components/UI/MDAvatar/MDAvatar";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import styles from "./style.module.scss";

interface IProps {
  layout: "profile" | "customer" | "agent";
  basicInformation: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  loading?: boolean;
}
const Setting = ({ layout, basicInformation, loading = false }: IProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab");
  const onChange = (key: string) => {
    if (layout === "profile") navigate(`/setting-account?tab=${key}`);
  };
  const items: TabsProps["items"] = [
    {
      key: "ticket",
      label: "Tickets",
      children:
        layout === "customer" ? (
          <ListTicketCustomer />
        ) : (
          <Tickets email={basicInformation.email} />
        ),
    },
  ];
  const handleRedirectCreateTicket = () => {
    if (layout === "profile") navigate("/ticket/new");
  };
  const renderName = () => {
    if (basicInformation.firstName || basicInformation.lastName) {
      return `${basicInformation.firstName} ${basicInformation.lastName}`;
    }
    return basicInformation.email;
  };
  return (
    <div>
      <div className={styles.myProfile}>
        <div className={styles.profile}>
          <MDAvatar
            firstName={basicInformation.firstName}
            lastName={basicInformation.lastName}
            email={basicInformation.email}
            skeleton={loading}
          />

          <div className={styles.name}>
            {loading ? <MDSkeleton lines={1} width={100} /> : renderName()}
          </div>
        </div>
        {layout === "profile" && (
          <div className={styles.buttonCreate}>
            <ButtonAdd type="primary" onClick={handleRedirectCreateTicket}>
              New Ticket
            </ButtonAdd>
          </div>
        )}
      </div>
      <Tabs
        activeKey={currentTab || "ticket"}
        items={[
          ...items,
          ...(layout === "profile"
            ? [
                {
                  key: "setting",
                  label: "Security Settings",
                  children: <Security />,
                },
              ]
            : []),
        ]}
        onChange={onChange}
      />
    </div>
  );
};
export default React.memo(Setting);
