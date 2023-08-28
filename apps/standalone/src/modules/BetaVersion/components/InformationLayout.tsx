import Information from "@moose-beta/components/layoutComponents/Information";
import Setting from "@moose-beta/components/layoutComponents/Setting";
import {
  TokenManager,
  useSearchParams,
  useToggle,
  useUnMount,
} from "@moose-desk/core";
import { Agent, Customer } from "@moose-desk/repo";
import * as jose from "jose";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { MDButton } from "src/components/UI/Button/MDButton";
import Icon from "src/components/UI/Icon";
import { MDDrawer } from "src/components/UI/MDDrawer";
import useUpdated from "src/hooks/useUpdated";
import useViewport from "src/hooks/useViewport";
import { getOneAgent } from "src/modules/agent/api/api";
import { getOneCustomer } from "src/modules/customer/api/api";
import { getProfile } from "src/modules/setting/api/api";
import styles from "./layoutComponents/style.module.scss";

interface IProps {
  layout: "customer" | "profile" | "agent";
}
export default function InformationLayout({ layout }: IProps) {
  const { state: visible, off, toggle } = useToggle(false);
  const { setUpdated } = useUpdated();
  const { isMobile: isTable } = useViewport(1024);
  const { isMobile } = useViewport();

  const [searchParams] = useSearchParams();
  const customerId: string = searchParams.get("customer") || "";
  const agentId: string = searchParams.get("agent") || "";

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
  useUnMount(() => {
    setUpdated(false);
  });
  const handleRefetchProfile = useCallback(() => {
    switch (layout) {
      case "profile":
        return refetchProfile();
      case "customer":
        return refetchCustomer();
      case "agent":
        return refetchAgent();
      default:
        return () => {};
    }
  }, [layout]);
  const loading = isLoadingProfile || isLoadingCustomer || isLoadingAgent;
  const basicInformation = useMemo(() => {
    return {
      _id: dataProfile?._id,
      firstName: dataProfile?.firstName,
      lastName: dataProfile?.lastName,
      email: dataProfile?.email,
      avatar: dataProfile?.avatar,
    };
  }, [
    dataProfile?.firstName,
    dataProfile?.lastName,
    dataProfile?.email,
    dataProfile?.avatar,
  ]);
  const handleCloseDrawer = () => {
    off();
    setUpdated(false);
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
        <MDButton
          className={styles.buttonToggle}
          onClick={toggle}
          icon={<Icon name="user" />}
        />
      )}
      {isTable ? (
        <MDDrawer
          title=""
          visible={visible}
          onClose={handleCloseDrawer}
          rootClassName={styles.drawerSearch}
          destroyOnClose
          width={isMobile ? "100%" : 378}
          content={
            <Information
              profile={dataProfile}
              layout={layout}
              onRefetch={handleRefetchProfile}
              loadingProfile={loading}
              onCloseDrawer={isMobile ? handleCloseDrawer : undefined}
            />
          }
          closable={true}
        />
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
