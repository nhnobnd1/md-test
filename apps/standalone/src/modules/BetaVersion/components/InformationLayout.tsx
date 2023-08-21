import { TokenManager, useToggle } from "@moose-desk/core";
import { Agent, Customer } from "@moose-desk/repo";
import * as jose from "jose";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { MDButton } from "src/components/UI/Button/MDButton";
import Icon from "src/components/UI/Icon";
import { MDDrawer } from "src/components/UI/MDDrawer";
import useViewport from "src/hooks/useViewport";
import Information from "src/modules/BetaVersion/components/layoutComponents/Information";
import Setting from "src/modules/BetaVersion/components/layoutComponents/Setting";
import { getProfile } from "src/modules/setting/api/api";
import styles from "./layoutComponents/style.module.scss";

interface IProps {
  layout: "customer" | "profile";
}
export default function InformationLayout({ layout }: IProps) {
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
  const basicInformation = useMemo(() => {
    return {
      firstName: dataProfile?.firstName,
      lastName: dataProfile?.lastName,
      email: dataProfile?.email,
    };
  }, [dataProfile?.firstName, dataProfile?.lastName, dataProfile?.email]);
  const handleRefetchProfile = useCallback(() => {
    refetchProfile();
  }, []);
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
              layout="profile"
              onRefetch={handleRefetchProfile}
              loadingProfile={isLoadingProfile}
            />
          }
          closable={true}
        />
      ) : (
        <div className={styles.wrapInfo}>
          <Information
            profile={dataProfile}
            layout="profile"
            onRefetch={handleRefetchProfile}
            loadingProfile={isLoadingProfile}
          />
        </div>
      )}
    </section>
  );
}
