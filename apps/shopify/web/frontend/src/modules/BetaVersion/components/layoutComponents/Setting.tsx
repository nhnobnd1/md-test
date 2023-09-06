import Tickets from "@moose-beta/components/layoutComponents/component/Tickets";
import { useNavigate } from "@moose-desk/core";
import { Button, Icon, SkeletonBodyText, Tabs } from "@shopify/polaris";
import { ArrowLeftMinor } from "@shopify/polaris-icons";
import React, { useCallback, useState } from "react";
import MDAvatar from "src/components/MDAvatar/MDAvatar";
import { ListTicketCustomer } from "src/modules/customers/component/ListTicketCustomer";
import { Security } from "src/modules/profileBeta/components/Security";
import styles from "./style.module.scss";
interface IProps {
  layout: "profile" | "customer" | "agent";
  basicInformation: {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  loading?: boolean;
}
const Setting = ({ layout, basicInformation, loading = false }: IProps) => {
  const navigate = useNavigate();
  const [selectedTabs, setSelectedTabs] = useState(0);
  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelectedTabs(selectedTabIndex);
    if (layout === "profile") {
      navigate(`/setting-account?tab=${profileTab[selectedTabIndex]?.id}`);
    }
  }, []);
  const handleBack = () => {
    navigate(-1);
  };
  const renderName = () => {
    if (basicInformation.firstName || basicInformation.lastName) {
      return `${basicInformation.firstName} ${basicInformation.lastName}`;
    }
    return basicInformation.email;
  };
  const customerTab = [
    {
      id: "tickets",
      value:
        layout === "customer" ? (
          <ListTicketCustomer customerId={basicInformation?._id || ""} />
        ) : (
          <Tickets agentId={basicInformation?._id || ""} />
        ),
      content: "Tickets",
      panelID: "tickets",
    },
  ];
  const profileTab = [
    {
      id: "setting",
      content: "Security Settings",
      value: <Security />,
      panelID: "setting",
    },
  ];
  const tabs = layout === "profile" ? profileTab : customerTab;
  return (
    <div>
      <div className={styles.myProfile}>
        {layout !== "profile" && (
          <div className={styles.buttonBack}>
            <Button
              icon={<Icon source={ArrowLeftMinor} color="base" />}
              onClick={handleBack}
              size="medium"
            ></Button>
          </div>
        )}
        <div className={styles.profile}>
          <MDAvatar
            firstName={basicInformation.firstName}
            lastName={basicInformation.lastName}
            email={basicInformation.email}
          />

          <div className={styles.name}>
            {loading ? <SkeletonBodyText lines={1} /> : renderName()}
          </div>
        </div>
        {layout === "profile" && (
          <div className={styles.buttonCreate}>
            <Button primary onClick={handleRedirectCreateTicket}>
              New Ticket
            </Button>
          </div>
        )}
      </div>
      <Tabs
        tabs={layout === "profile" ? profileTab : tabs}
        selected={selectedTabs}
        onSelect={handleTabChange}
      >
        <div className={styles.tabContentWrap}>{tabs[selectedTabs]?.value}</div>
      </Tabs>
    </div>
  );
};
export default React.memo(Setting);
