import Information from "@moose-beta/components/layoutComponents/Information";
import Setting from "@moose-beta/components/layoutComponents/Setting";
import { TokenManager, useSearchParams, useToggle } from "@moose-desk/core";
import { Agent, Customer } from "@moose-desk/repo";
import * as jose from "jose";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { MDButton } from "src/components/UI/Button/MDButton";
import Icon from "src/components/UI/Icon";
import { MDDrawer } from "src/components/UI/MDDrawer";
import useViewport from "src/hooks/useViewport";
import { getOneCustomer } from "src/modules/customer/api/api";
import { getProfile } from "src/modules/setting/api/api";
import styles from "./layoutComponents/style.module.scss";

interface IProps {
  layout: "customer" | "profile";
}
export default function InformationLayout({ layout }: IProps) {
  const [searchParams] = useSearchParams();
  const customerId: string = searchParams.get("customer") || "";
  const { state: visible, off, on, toggle } = useToggle(false);
  const { isMobile } = useViewport(1024);
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
  const basicInformation = useMemo(() => {
    return {
      firstName: dataProfile?.firstName,
      lastName: dataProfile?.lastName,
      email: dataProfile?.email,
    };
  }, [dataProfile?.firstName, dataProfile?.lastName, dataProfile?.email]);
  const handleRefetchProfile = useCallback(() => {
    layout === "customer" ? refetchCustomer() : refetchProfile();
  }, [layout]);
  return (
    <section className={styles.container}>
      <div className={styles.wrapSetting}>
        <Setting
          layout={layout}
          basicInformation={basicInformation}
          // loadingProfile={isLoadingProfile}
        />
      </div>
      {isMobile && (
        <MDButton
          className={styles.buttonToggle}
          onClick={toggle}
          icon={<Icon name="user" />}
        />
      )}
      {isMobile ? (
        <MDDrawer
          title=""
          visible={visible}
          onClose={off}
          rootClassName={styles.drawerSearch}
          content={
            <Information
              profile={dataProfile}
              layout={layout}
              onRefetch={handleRefetchProfile}
              loadingProfile={isLoadingProfile || isLoadingCustomer}
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
            loadingProfile={isLoadingProfile || isLoadingCustomer}
          />
        </div>
      )}
    </section>
  );
}
