import { AutoReply, Holidays } from "@moose-desk/repo";
import Link from "antd/es/typography/Link";
import dayjs from "dayjs";
import moment from "moment";
import { memo, useCallback, useEffect, useState } from "react";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import useNotification from "src/hooks/useNotification";
import ModalAutoReply from "src/modules/setting/component/AutoReply/ModalAutoReply";

interface AutoReplyTabProps {
  value?: AutoReply[];
  onChange?: (value: AutoReply[]) => void;
  dataHolidays: Holidays[];
  dataBusinessHoursAutoReplyCode: string;
}

const AutoReplyTab = ({
  value,
  onChange,
  dataHolidays,
  dataBusinessHoursAutoReplyCode,
  ...props
}: AutoReplyTabProps) => {
  const notification = useNotification();
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [valueListAutoReplys, setValueListAutoReplys] = useState<AutoReply[]>(
    []
  );
  const [valueTableAutoReply, setValueTableAutoReply] = useState<AutoReply[]>(
    []
  );
  const defaultFilter = () => ({
    page: 1,
    limit: 10,
  });
  const [filterData, setFilterData] = useState(defaultFilter);
  const [dataForm, setDataForm] = useState<{
    value: AutoReply;
    index: number;
  }>();
  // details
  const handleDetails = useCallback(
    (index: number) => {
      const dataDetails = { ...valueListAutoReplys[index] };
      setDataForm({
        value: { ...dataDetails },
        index,
      });
      setOpenModalAutoReply(true);
      setIsDetail(true);
    },
    [valueListAutoReplys]
  );
  // delete
  const handleRemoveAutoReply = useCallback(
    (indexDelete: number) => {
      const findAutoReplyCode = dataHolidays.find(
        (holiday) =>
          holiday.autoReplyCode === valueListAutoReplys[indexDelete].code
      );

      if (
        !findAutoReplyCode &&
        valueListAutoReplys[indexDelete].code !== dataBusinessHoursAutoReplyCode
      ) {
        setValueListAutoReplys((init: AutoReply[]) => {
          init.splice(indexDelete, 1);
          onChange && onChange([...init]);
          return init;
        });
      } else {
        notification.error(
          "Auto Reply is being used in a holiday or business hours. Please check again!",
          {
            description: "Update failed!",
            style: {
              width: 450,
            },
          }
        );
      }
    },
    [valueListAutoReplys, dataHolidays, dataBusinessHoursAutoReplyCode]
  );
  // modal

  const handleUpdateValue = useCallback(
    (value: any, isDetais?: boolean) => {
      if (isDetais && dataForm?.value.name) {
        setValueListAutoReplys((init: AutoReply[]) => {
          if (
            !init.find((data) => {
              return data.name === value.name && data.code !== value.code;
            })
          ) {
            init.splice(dataForm.index, 1, value);
            onChange && onChange([...init]);
            notification.success("Edit Auto Reply success!");
            return init;
          } else {
            notification.error(
              `Auto Reply name ${value.name} already exists. Please try again!`,
              {
                description: `Auto Reply name ${value.name} already exists. Please try again!`,
                style: {
                  width: 450,
                },
              }
            );
            return init;
          }
        });
      } else {
        setValueListAutoReplys((init: AutoReply[]) => {
          if (!init.find((data) => data.name === value.name)) {
            onChange && onChange([...init, { ...value }]);
            notification.success("New Auto Reply has been created!");
            return [...init, { ...value }];
          } else {
            notification.error(
              `Auto Reply name ${value.name} already exists. Please try again!`,
              {
                description: `Auto Reply name ${value.name} already exists. Please try again!`,
                style: {
                  width: 450,
                },
              }
            );
            return init;
          }
        });
      }
    },
    [dataForm, valueListAutoReplys, isDetail]
  );
  const [openModalAutoReply, setOpenModalAutoReply] = useState(false);

  const handleOpen = useCallback(() => {
    setDataForm(undefined);
    setIsDetail(false);
    setOpenModalAutoReply(true);
  }, []);
  const handleCloseModal = useCallback(() => {
    setOpenModalAutoReply(false);
  }, []);
  // handle table
  const handleUpdateTable = useCallback(() => {
    setValueTableAutoReply(
      valueListAutoReplys.slice(
        (filterData.page - 1) * filterData.limit,
        filterData.page * filterData.limit
      )
    );
  }, [filterData, valueListAutoReplys]);
  //
  const onPagination = useCallback(
    ({ page, limit }: { page: number; limit: number }) => {
      setFilterData((value) => {
        return {
          ...value,
          page,
          limit,
        };
      });
    },
    []
  );
  // handle Effect

  useEffect(() => {
    handleUpdateTable();
  }, [filterData, valueListAutoReplys]);

  useEffect(() => {
    setValueListAutoReplys(value?.length ? [...value] : []);
  }, [value]);
  return (
    <div className="p-2 mt-2">
      <ModalAutoReply
        title="Add an Auto-Reply"
        open={openModalAutoReply}
        onClose={handleCloseModal}
        dataForm={dataForm}
        onChange={handleUpdateValue}
      />
      {valueListAutoReplys.length ? (
        <div>
          <Table dataSource={valueTableAutoReply}>
            <Table.Column
              key="name"
              title="Name"
              render={(_, record: AutoReply) => <span>{`${record.name}`}</span>}
              sorter={{
                compare: (a: AutoReply, b: AutoReply) => {
                  return ("" + a.name).localeCompare(b.name);
                },
              }}
            />
            <Table.Column
              key="date"
              title="Date Create"
              render={(_, record: AutoReply) => (
                <span>{dayjs(`${record.createAt}`).format("MM/DD/YYYY")}</span>
              )}
              sorter={{
                compare: (a: AutoReply, b: AutoReply) => {
                  const dateA: number = moment(a.createAt).valueOf();
                  const dateB: number = moment(b.createAt).valueOf();

                  return dateA - dateB;
                },
              }}
            ></Table.Column>
            <Table.Column
              align="center"
              title="Action"
              render={(_, record: AutoReply, index) => (
                <TableAction
                  record={record}
                  edit
                  showDelete
                  onlyIcon
                  onEdit={() => handleDetails(index)}
                  onDelete={() => handleRemoveAutoReply(index)}
                />
              )}
            />
          </Table>
          <Pagination
            className="mt-4 flex justify-end"
            currentPage={filterData.page ?? 1}
            total={valueListAutoReplys ? valueListAutoReplys.length : 1}
            pageSize={filterData.limit}
            onChange={onPagination}
          />
        </div>
      ) : null}
      <>
        <Link onClick={handleOpen}>Add an auto-reply...</Link>
      </>
    </div>
  );
};

export default memo(AutoReplyTab);
