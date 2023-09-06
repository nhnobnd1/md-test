import Information from "@moose-beta/components/layoutComponents/Information";
import Setting from "@moose-beta/components/layoutComponents/Setting";
import {
  MediaScreen,
  TokenManager,
  useSearchParams,
  useToggle,
} from "@moose-desk/core";
import { Agent, Customer } from "@moose-desk/repo";
import * as jose from "jose";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import useScreenType from "src/hooks/useScreenType";
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
  return (
    <section className={styles.container}>
      <div className={styles.wrapSetting}>
        <Setting
          layout={layout}
          basicInformation={basicInformation}
          loading={loading}
        />
      </div>
      {/* {isMobile && (
        <Button
          onClick={toggle}
          icon={<Icon name="user" />}
        />
      )} */}
      {/* {isMobile ? (
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
              loadingProfile={loading}
            />
          }
          closable={true}
        />
      ) : ( */}
      <div className={styles.wrapInfo}>
        <Information
          profile={dataProfile}
          layout={layout}
          onRefetch={handleRefetchProfile}
          loadingProfile={loading}
        />
      </div>
      {/* )} */}
    </section>
  );
}
