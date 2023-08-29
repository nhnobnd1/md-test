import { Priority } from "@moose-desk/repo";
import classNames from "classnames";
import { useMemo } from "react";
import { useQuery } from "react-query";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import TicketFormBeta from "src/modules/ticket/components/TicketForm/TicketFormBeta";
import { getListEmailIntegration } from "src/modules/ticket/helper/api";
import styles from "./styles.module.scss";

const CreateTicket = () => {
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

  return (
    <section
      className={classNames(styles.container, {
        "d-flex": true,
      })}
    >
      <div className={styles.wrapContent}>
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
