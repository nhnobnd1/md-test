import { AutoReply, Holidays } from "@moose-desk/repo";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import useMessage from "src/hooks/useMessage";
import ModalHoliday from "src/modules/setting/component/Holidays/ModalHoliday";
interface HolidayTabProps {
  value?: Holidays[];
  onChange?: (value: Holidays[]) => void;
  dataAutoReply: AutoReply[];
  loading: boolean;
}

const HolidayTab = ({
  value,
  onChange,
  dataAutoReply,
  loading,
}: HolidayTabProps) => {
  const message = useMessage();
  const { t } = useTranslation();

  const [valueListHolidays, setValueListHolidays] = useState<Holidays[]>([]);
  const [valueTableHolidays, setValueTableHolidays] = useState<Holidays[]>([]);
  const defaultFilter = () => ({
    page: 1,
    limit: 10,
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
          message.success(t("messages:success.edit_holiday"));
          return init;
        });
      } else {
        setValueListHolidays((init: Holidays[]) => {
          onChange && onChange([...init, { ...value }]);
          message.success(t("messages:success.create_holiday"));

          return [...init, { ...value }];
        });
      }
    },
    [isDetail, dataForm]
  );
  const [openModalHoliday, setOpenModalHoliday] = useState(false);

  const handleOpen = useCallback(() => {
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
    <div>
      <div className="my-2 w-full flex justify-end">
        <ButtonAdd onClick={handleOpen}>Add holiday</ButtonAdd>
      </div>
      <ModalHoliday
        title="New holiday"
        open={openModalHoliday}
        onClose={handleCloseModal}
        dataForm={dataForm}
        onChange={handleUpdateValue}
        dataAutoReply={dataAutoReply}
      />
      {valueListHolidays.length ? (
        <div>
          <Table
            dataSource={valueListHolidays}
            rowKey={"name"}
            loading={loading}
          >
            <Table.Column
              key="nameHoliday"
              title="Name"
              render={(_, record: Holidays) => <span>{`${record.name}`}</span>}
              sorter={{
                compare: (a: Holidays, b: Holidays) => {
                  return ("" + a.name).localeCompare(b.name);
                },
              }}
            />
            <Table.Column
              key="dateHoliday"
              title="Date"
              sorter={{
                compare: (a: Holidays, b: Holidays) => {
                  const dateA: any = moment(a.startDate, "DD-MM");
                  const dateB: any = moment(b.startDate, "DD-MM");
                  return (dateA - dateB) as number;
                },
              }}
              render={(_, record: Holidays) => (
                <span>
                  {record.startDate === record.endDate
                    ? record.startDate
                    : `${record?.startDate} to ${record?.endDate}`}
                </span>
              )}
            ></Table.Column>
            <Table.Column
              key="autoReplyHoliday"
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
      {/* <Link onClick={handleOpen}>Add a holiday...</Link> */}
    </div>
  );
};

export default HolidayTab;
