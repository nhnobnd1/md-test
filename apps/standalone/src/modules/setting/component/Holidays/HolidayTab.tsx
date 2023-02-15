import { AutoReply, Holidays } from "@moose-desk/repo";
import Link from "antd/es/typography/Link";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import useNotification from "src/hooks/useNotification";
import ModalHoliday from "src/modules/setting/component/Holidays/ModalHoliday";

interface HolidayTabProps {
  value?: Holidays[];
  onChange?: (value: Holidays[]) => void;
  dataAutoReply: AutoReply[];
}

const HolidayTab = ({
  value,
  onChange,
  dataAutoReply,
  ...props
}: HolidayTabProps) => {
  const notification = useNotification();
  const [valueListHolidays, setValueListHolidays] = useState<Holidays[]>([]);
  const [valueTableHolidays, setValueTableHolidays] = useState<Holidays[]>([]);
  const defaultFilter = () => ({
    page: 1,
    limit: 5,
  });
  const [filterData, setFilterData] = useState(defaultFilter);
  const getAutoReplyName = useCallback(
    (value?: string) => {
      const matchedOption = dataAutoReply.find((option) => {
        return option.code === value;
      });
      if (matchedOption) {
        return matchedOption?.name;
      }
      return "";
    },
    [dataAutoReply, valueTableHolidays]
  );
  const [dataForm, setDataForm] = useState<{
    value: Holidays;
    index: number;
  }>();
  // 01/13/2023
  const day = new Date();
  // details
  const handleDetails = useCallback(
    (index: number) => {
      const dataDetails = { ...valueListHolidays[index] };
      setDataForm({
        value: { ...dataDetails },
        index,
      });
      setOpenModalHoliday(true);
    },
    [valueListHolidays]
  );
  // delete
  const handleRemoveHoliday = useCallback(
    (indexDelete: number) => {
      setValueListHolidays((init: Holidays[]) => {
        init.splice(indexDelete, 1);
        onChange && onChange([...init]);
        return init;
      });
    },
    [setValueListHolidays, valueListHolidays]
  );
  // modal
  const isDetail = useMemo(() => {
    return !!dataForm?.value.name;
  }, [dataForm?.value.name]);

  const handleUpdateValue = useCallback(
    (value: any) => {
      if (isDetail && dataForm?.value.name) {
        setValueListHolidays((init: Holidays[]) => {
          init.splice(dataForm.index, 1, value);
          onChange && onChange([...init]);
          notification.success("Edit Holiday success!");
          return init;
        });
      } else {
        setValueListHolidays((init: Holidays[]) => {
          onChange && onChange([...init, { ...value }]);
          notification.success("New Holiday has been created!");
          return [...init, { ...value }];
        });
      }
    },
    [isDetail, dataForm]
  );
  const [openModalHoliday, setOpenModalHoliday] = useState(false);

  const handleOnpen = useCallback(() => {
    setOpenModalHoliday(true);
  }, []);
  const handleCloseModal = useCallback(() => {
    setOpenModalHoliday(false);
    setDataForm(undefined);
  }, []);
  //
  const handleUpdateTable = useCallback(() => {
    setValueTableHolidays(
      valueListHolidays.slice(
        (filterData.page - 1) * filterData.limit,
        filterData.page * filterData.limit
      )
    );
  }, [filterData, valueListHolidays]);
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
  }, [filterData, valueListHolidays]);
  useEffect(() => {
    setValueListHolidays(value?.length ? [...value] : []);
  }, [value]);
  return (
    <div className="p-2 mt-2">
      <ModalHoliday
        title="Add a holiday"
        open={openModalHoliday}
        onClose={handleCloseModal}
        dataForm={dataForm}
        onChange={handleUpdateValue}
        dataAutoReply={dataAutoReply}
      />
      {valueListHolidays.length ? (
        <div>
          <Table dataSource={valueListHolidays}>
            <Table.Column
              key="name"
              title="Name"
              render={(_, record: Holidays) => <span>{`${record.name}`}</span>}
            />
            <Table.Column
              key="date"
              title="Date"
              render={(_, record: Holidays) => (
                <span>
                  {record.startDate === record.endDate
                    ? `${dayjs(
                        `${record.startDate.slice(3)}-${record.startDate.slice(
                          0,
                          2
                        )}-${day.getFullYear()}`,
                        "MM-DD-YYYY"
                      ).format("DD-MMM")}`
                    : `${dayjs(
                        `${record.startDate.slice(3)}-${record.startDate.slice(
                          0,
                          2
                        )}-${day.getFullYear()}`,
                        "MM-DD-YYYY"
                      ).format("DD-MMM")} to ${dayjs(
                        `${record.endDate.slice(3)}-${record.endDate.slice(
                          0,
                          2
                        )}-${day.getFullYear()}`,
                        "MM-DD-YYYY"
                      ).format("DD-MMM")}`}
                </span>
              )}
            ></Table.Column>
            <Table.Column
              key="autoReply"
              title="Auto-Reply"
              render={(_, record: Holidays) => (
                <span>{getAutoReplyName(record.autoReplyCode)}</span>
              )}
            ></Table.Column>
            <Table.Column
              align="center"
              title="Action"
              render={(_, record: Holidays, index) => (
                <TableAction
                  record={record}
                  edit
                  showDelete
                  onlyIcon
                  onEdit={() => handleDetails(index)}
                  onDelete={() => handleRemoveHoliday(index)}
                />
              )}
            />
          </Table>
          <Pagination
            className="mt-4 flex justify-end"
            currentPage={filterData.page ?? 1}
            total={valueListHolidays ? valueListHolidays.length : 1}
            pageSize={filterData.limit}
            onChange={onPagination}
          />
        </div>
      ) : null}
      <Link onClick={handleOnpen}>Add a holiday...</Link>
    </div>
  );
};

export default HolidayTab;
