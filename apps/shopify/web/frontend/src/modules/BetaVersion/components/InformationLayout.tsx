import Information from "@moose-beta/components/layoutComponents/Information";
import Setting from "@moose-beta/components/layoutComponents/Setting";
import {
  MediaScreen,
  TokenManager,
  useSearchParams,
  useToggle,
} from "@moose-desk/core";
import { Agent, Customer } from "@moose-desk/repo";
import { Button, Icon, LegacyCard, Modal } from "@shopify/polaris";
import { CustomersMajor } from "@shopify/polaris-icons";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import useScreenType from "src/hooks/useScreenType";
import { getOneAgent } from "src/modules/agent/api/api";
import { getOneCustomer } from "src/modules/customers/api/api";
import { getProfile } from "src/modules/setting/api/api";
import styles from "./layoutComponents/style.module.scss";

interface IProps {
  layout: "customer" | "profile";
}
export default function InformationLayout({ layout }: IProps) {
  const { state: visible, off, toggle } = useToggle(false);
  const [screenType, screenWidth] = useScreenType();
  const isMobile = Boolean(screenWidth < MediaScreen.MD);
  const [searchParams] = useSearchParams();
  const customerId: string = searchParams.get("customer") || "";
  const token = jose.decodeJwt(TokenManager.getToken("base_token") || "");
  const [dataProfile, setDataProfile] = useState<Agent | Customer | any>();

  const { isLoading: isLoadingProfile, refetch: refetchProfile }: any =
    useQuery({
      queryKey: ["profile", token.sub],
      queryFn: () => getProfile(token.sub ?? ""),
      enabled: !!token.sub && layout === "profile",
      onSuccess: (data: any) => {
        setDataProfile(data?.data?.data);
      },
    });
  const { isLoading: isLoadingCustomer, refetch: refetchCustomer }: any =
    useQuery({
      queryKey: ["one_customer", customerId],
      queryFn: () => getOneCustomer(customerId),
      enabled: !!customerId && layout === "customer",
      onSuccess: (data: any) => {
        setDataProfile(data?.data?.data);
      },
    });
  const { isLoading: isLoadingAgent, refetch: refetchAgent } = useQuery({
    queryKey: ["one_agent", agentId],
    queryFn: () => getOneAgent(agentId),
    enabled: !!agentId && layout === "agent",
    onSuccess: (data: any) => {
      setDataProfile(data?.data?.data);
    },
  });
  const handleRefetchProfile = useCallback(() => {
    switch (layout) {
      case "profile":
        return refetchProfile();
      case "customer":
        return refetchCustomer();
      default:
        return () => {};
    }
  }, [layout]);
  const loading = isLoadingProfile || isLoadingCustomer;
  const basicInformation = useMemo(() => {
    return {
      _id: dataProfile?._id,
      firstName: dataProfile?.firstName,
      lastName: dataProfile?.lastName,
      email: dataProfile?.email,
    };
  }, [
    dataProfile?.firstName,
    dataProfile?.lastName,
    dataProfile?.email,
    dataProfile?.avatar,
  ]);
  const handleCloseDrawer = () => {
    off();
  };
  return (
    <section className={styles.container}>
      <div className={styles.wrapSetting}>
        <Setting
          layout={layout}
          basicInformation={basicInformation}
          loading={loading}
        />
      </div>
      {isTable && (
        <div className={styles.toggleButton}>
          <Button
            onClick={toggle}
            icon={<Icon source={CustomersMajor} color="base" />}
          />
        </div>
      )}
      {isTable ? (
        <Modal title="" open={visible} onClose={off} fullScreen={true}>
          <LegacyCard sectioned>
            <Information
              profile={dataProfile}
              layout={layout}
              onRefetch={handleRefetchProfile}
              loadingProfile={loading}
            />
          </LegacyCard>
        </Modal>
      ) : (
        <div className={styles.wrapInfo}>
          <Information
            profile={dataProfile}
            layout={layout}
            onRefetch={handleRefetchProfile}
            loadingProfile={loading}
          />
        </div>
      )}
    </section>
  );
}
