import {
  useCountDown,
  useNavigate,
  useSearchParams,
  useToggle,
  useUnMount,
} from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { Button } from "@shopify/polaris";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getRecoveryCodes, getStatus2FA } from "src/modules/setting/api/api";
import Enable2FAModal from "src/modules/setting/component/Security/Enable2FAModal";
import { ModalRecoveryCode } from "src/modules/setting/pages/account&Security/ModalRecoveryCode";
import { ResetModalRecoveryCode } from "src/modules/setting/pages/account&Security/ResetModalRecoveryCode";
import styles from "./style.module.scss";

const fontStyle = {
  fontSize: 12,
};
export default function TwoFaAuthenticated() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get("recovery");
  const [open2FA, setOpen2FA] = useState(false);

  const {
    state: visibleRecoveryCodeModal,
    off: handleCloseRecoveryCodeModal,
    on: handleOpenRecoveryCodeModal,
  } = useToggle(false);
  const {
    clearCountDown,
    initCountdown: startCountDown,
    state: countDown,
  } = useCountDown({
    initValue: 10,
    key: "countdownRecoveryCode",
  });
  useEffect(() => {
    if (!querySearch) return;
    if (querySearch === "true") {
      handleOpenRecoveryCodeModal();
    }
  }, [querySearch]);
  useUnMount(() => clearCountDown("countdownRecoveryCode"));
  const { data, isFetching }: any = useQuery({
    queryKey: ["2faRecoveryCodes"],
    queryFn: () => getRecoveryCodes(),
    keepPreviousData: true,
    enabled: visibleRecoveryCodeModal,
    onSuccess: () => startCountDown("countdownRecoveryCode"),
  });
  const {
    data: statusSecurity,
    isLoading,
    refetch: fetchingStatus,
  }: any = useQuery({
    queryKey: [QUERY_KEY.TWO_FA_STATUS],
    queryFn: () => getStatus2FA(),
  });
  const method = useMemo(() => {
    return {
      show: statusSecurity?.data?.data?.twoFactorEnabled,
      method: statusSecurity?.data?.data?.twoFactorMethod || "Disabled",
    };
  }, [statusSecurity]);
  const status = useMemo(() => {
    return statusSecurity?.data?.data?.twoFactorStoreEnabled || false;
  }, [statusSecurity]);
  const handleCloseRecoveryCodes = useCallback(() => {
    handleCloseRecoveryCodeModal();
    navigate("/setting-account?tab=setting", { replace: true });
  }, []);
  const handleAcceptRequestCodes = useCallback(() => {
    handleOpenRecoveryCodeModal();
  }, []);
  return (
    <div className={classNames(styles.block, { "align-start": method.show })}>
      <div className={styles.title}>
        <span>Two-Factor Authentication</span>
        <div>
          {method.show && (
            <div className="flex items-center">
              <div className="mr-2">
                {status ? (
                  <p style={fontStyle}>Method :</p>
                ) : (
                  <p style={fontStyle}>Method :</p>
                )}
              </div>
              <div>
                {status ? (
                  <p style={fontStyle}>
                    {method.method === "Email"
                      ? "Email OTP"
                      : method.method === "Authenticator"
                      ? "External Authentication Application"
                      : method.method}
                  </p>
                ) : (
                  <p style={fontStyle}>
                    {method.method === "Email"
                      ? "Email OTP"
                      : method.method === "Authenticator"
                      ? "External Authentication Application"
                      : method.method}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {method.show ? (
          <div className={styles.recoveryCode}>
            <ResetModalRecoveryCode
              onOpenModalRecoveryCode={handleAcceptRequestCodes}
              countDown={countDown}
              loading={isFetching}
            />
          </div>
        ) : null}
      </div>
      <div className={styles.group}>
        <Button onClick={() => setOpen2FA(true)} disabled={!status}>
          {method.show ? "Change" : "Enable 2FA"}
        </Button>
        <div className={styles.subContent}>
          <p
          // type={
          //   method.show
          //     ? status
          //       ? "success"
          //       : "secondary"
          //     : status
          //     ? "danger"
          //     : "secondary"
          // }
          // strong
          >
            {method.show ? "Active" : "InActive"}
          </p>
        </div>
      </div>
      {open2FA ? (
        <Enable2FAModal
          open={open2FA}
          setOpen={setOpen2FA}
          fetch2FAStatus={fetchingStatus}
          onOpenRecoveryCode={handleOpenRecoveryCodeModal}
        />
      ) : null}
      <ModalRecoveryCode
        visible={visibleRecoveryCodeModal}
        onClose={handleCloseRecoveryCodes}
        isFetching={isFetching}
        listRecoveryCodes={data?.data || []}
        countDown={countDown}
      />
    </div>
  );
}
