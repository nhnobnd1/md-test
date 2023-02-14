import { AutoReply, Holidays } from "@moose-desk/repo";
import Link from "antd/es/typography/Link";
import dayjs from "dayjs";
import { memo, useCallback, useEffect, useState } from "react";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import ModalAutoReply from "src/modules/setting/component/AutoReply/ModalAutoReply";

interface AutoReplyTabProps {
  value?: AutoReply[];
  onChange?: (value: AutoReply[]) => void;
  dataHolidays: Holidays[];
}

const AutoReplyTab = ({ value, onChange, dataHolidays }: AutoReplyTabProps) => {
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [valueListAutoReplys, setValueListAutoReplys] = useState<AutoReply[]>(
    []
  );
  const [valueTableAutoReply, setValueTableAutoReply] = useState<AutoReply[]>(
    []
  );
  const defaultFilter = () => ({
    page: 1,
    limit: 5,
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
  const [isOpen, setIsOpen] = useState(false);
  const [deleteAutoReply, setDeleteAutoReply] = useState<number>(0);
  const handleOpenModalDelete = (index: number) => {
    setIsOpen(true);
    setDeleteAutoReply(index);
  };
  const handleRemoveAutoReply = useCallback(
    (indexDelete: number) => {
      const findAutoReplyCode = dataHolidays.find(
        (holiday) =>
          holiday.autoReplyCode === valueListAutoReplys[indexDelete].code
      );
      if (!findAutoReplyCode) {
        setValueListAutoReplys((init: AutoReply[]) => {
          init.splice(indexDelete, 1);
          onChange && onChange([...init]);
          return init;
        });
      } else {
        // show(`Auto Reply is being used in a holiday. Please check again!`, {
        //   isError: true,
        // });
      }
    },
    [deleteAutoReply, valueListAutoReplys, dataHolidays]
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
            return init;
          } else {
            // show(
            //   `Auto Reply name ${value.name} already exists. Please try again!`,
            //   {
            //     isError: true,
            //   }
            // );
            return init;
          }
        });
      } else {
        setValueListAutoReplys((init: AutoReply[]) => {
          if (!init.find((data) => data.name === value.name)) {
            onChange && onChange([...init, { ...value }]);
            return [...init, { ...value }];
          } else {
            // show(
            //   `Auto Reply name ${value.name} already exists. Please try again!`,
            //   {
            //     isError: true,
            //   }
            // );
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
            />
            <Table.Column
              key="date"
              title="Date Create"
              render={(_, record: AutoReply) => (
                <span>{dayjs(`${record.createAt}`).format("DD-MMM-YYYY")}</span>
              )}
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
