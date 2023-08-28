import {
  useCountDown,
  useNavigate,
  useSearchParams,
  useToggle,
  useUnMount,
} from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { Typography } from "antd";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { MDButton } from "src/components/UI/Button/MDButton";
import { getRecoveryCodes, getStatus2FA } from "src/modules/setting/api/api";
import { Enable2FAModal } from "src/modules/setting/component/Security/Enable2FAModal";
import { ModalRecoveryCode } from "src/modules/setting/pages/account&Security/ModalRecoveryCode";
import { ResetModalRecoveryCode } from "src/modules/setting/pages/account&Security/ResetModalRecoveryCode";
import styles from "./style.module.scss";

const fontStyle = {
  fontSize: 13,
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
    navigate("/setting-account?tab=settings", { replace: true });
  }, []);
  const handleAcceptRequestCodes = useCallback(() => {
    handleOpenRecoveryCodeModal();
  }, []);
  return (
    <div className={classNames(styles.block, { "align-start": method.show })}>
      <div className={styles.title}>
        <span>Two-Factor Authentication</span>
      </div>
      <div className={styles.group}>
        <div>
          {method.show && (
            <div className="flex items-center">
              <div className="mr-2">
                {status ? (
                  <Typography.Text style={fontStyle}>Method :</Typography.Text>
                ) : (
                  <Typography.Text style={fontStyle} type="secondary">
                    Method :
                  </Typography.Text>
                )}
              </div>
              <div>
                {status ? (
                  <Typography.Text style={fontStyle} strong>
                    {method.method === "Email"
                      ? "Email OTP"
                      : method.method === "Authenticator"
                      ? "External Authentication Application"
                      : method.method}
                  </Typography.Text>
                ) : (
                  <Typography.Text style={fontStyle} type="secondary">
                    {method.method === "Email"
                      ? "Email OTP"
                      : method.method === "Authenticator"
                      ? "External Authentication Application"
                      : method.method}
                  </Typography.Text>
                )}
              </div>
            </div>
          )}
        </div>
        <div className={styles.subContent}>
          {method.show ? (
            <div className={styles.recoveryCode}>
              <ResetModalRecoveryCode
                onOpenModalRecoveryCode={handleAcceptRequestCodes}
                countDown={countDown}
                loading={isFetching}
                size="small"
              />
            </div>
          ) : null}
        </div>
        <MDButton onClick={() => setOpen2FA(true)} disabled={!status}>
          {method.show ? "Change" : "Enable 2FA"}
        </MDButton>
      </div>
      {open2FA ? (
        <Enable2FAModal
          onOpenRecoveryCode={handleOpenRecoveryCodeModal}
          open={open2FA}
          setOpen={setOpen2FA}
          initialValue={{ ...method, status }}
          fetch2FAStatus={fetchingStatus}
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
