import { MediaScreen } from "@moose-desk/core";
import useToggleGlobal from "@moose-desk/core/hooks/useToggleGlobal";
import { Priority } from "@moose-desk/repo";
import classNames from "classnames";
import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { Header } from "src/components/UI/Header";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import useViewport from "src/hooks/useViewport";
import TicketFormBeta from "src/modules/ticket/components/TicketForm/TicketFormBeta";
import { getListEmailIntegration } from "src/modules/ticket/helper/api";
import styles from "./styles.module.scss";

const CreateTicket = () => {
  const { isMobile } = useViewport(MediaScreen.LG);
  const { visible, setVisible } = useToggleGlobal();

  const { data: dataEmailIntegration, isLoading: loadingList } = useQuery({
    queryKey: ["getListEmailIntegration"],
    queryFn: () => getListEmailIntegration({ page: 1, limit: 500, isLive: 1 }),
    retry: 3,
    staleTime: 10000,
    onError: () => {},
  });

  const primaryEmail = useMemo(() => {
    if (!dataEmailIntegration) {
      return undefined;
    }
    return dataEmailIntegration?.length > 0
      ? dataEmailIntegration[0]
      : undefined;
  }, [dataEmailIntegration]);
  const initialValues = useMemo(() => {
    return {
      priority: Priority.MEDIUM,
      content: primaryEmail?.signature
        ? `<br/> <div class='divide'> - - - - - - - </div><div class='signature'>${primaryEmail?.signature}</div>`
        : "",
      to: "",
      tags: [],
      subject: "",
      assignee: "",
      signature: primaryEmail?.signature,
      from: primaryEmail?._id,
    };
  }, [primaryEmail]);

  useEffect(() => {
    return () => {
      setVisible(false);
    };
  }, []);
  const css = `
  .md-layout-content{
    overflow: hidden!important;
  }
  `;
  return (
    <section
      className={classNames(styles.container, {
        "d-flex": visible && !isMobile,
      })}
    >
      {/* <style>{css}</style> */}
      <div className={styles.wrapContent}>
        {/* <Header className="mb-5" title="New Ticket"></Header> */}

        {loadingList ? (
          <>
            <MDSkeleton lines={10} />
          </>
        ) : (
          <TicketFormBeta
            primaryEmail={primaryEmail}
            initialValues={initialValues}
          />
        )}
      </div>
    </section>
  );
};

export default CreateTicket;
