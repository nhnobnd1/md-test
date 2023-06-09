import { AutoReply, Holidays } from "@moose-desk/repo";
import {
  Button,
  Card,
  EmptySearchResult,
  Icon,
  IndexTable,
  Link,
  Text,
} from "@shopify/polaris";
import { DeleteMajor, EditMajor } from "@shopify/polaris-icons";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import { Pagination } from "src/components/Pagination";
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
  const [valueListHolidays, setValueListHolidays] = useState<Holidays[]>([]);
  const [valueTableHolidays, setValueTableHolidays] = useState<Holidays[]>([]);
  const defaultFilter = () => ({
    page: 1,
    limit: 5,
  });
  const [filterData, setFilterData] = useState(defaultFilter);
  const resourceName = {
    singular: "holiday",
    plural: "holidays",
  };
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
  const day = new Date();
  const rowMarkup = useMemo(() => {
    return valueTableHolidays.map((value, index) => (
      <IndexTable.Row id={value.name} key={value.name} position={index}>
        <IndexTable.Cell className="py-3">
          <Link monochrome onClick={() => handleDetails(index)} removeUnderline>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {`${value.name}`}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">
          {`${dayjs(
            `${value.startDate}-${day.getFullYear()}`,
            "MM/DD/YYYY"
          ).format("MM/DD")} to ${dayjs(
            `${value.endDate}-${day.getFullYear()}`,
            "MM/DD/YYYY"
          ).format("MM/DD")}`}
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">
          {getAutoReplyName(value.autoReplyCode)}
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">
          <div className="flex gap-2">
            <Button
              onClick={() => handleDetails(index)}
              icon={() => <Icon source={() => <EditMajor />} color="base" />}
            />
            <Button
              icon={() => (
                <Icon
                  accessibilityLabel="Delete"
                  source={() => <DeleteMajor />}
                />
              )}
              onClick={() => handleOpenModalDelete(index)}
              destructive
            />
          </div>
        </IndexTable.Cell>
      </IndexTable.Row>
    ));
  }, [valueTableHolidays]);
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
  const [isOpen, setIsOpen] = useState(false);
  const [deleteHoliday, setDeleteHoliday] = useState<number>(0);
  const handleOpenModalDelete = (index: number) => {
    setIsOpen(true);
    setDeleteHoliday(index);
  };
  const handleRemoveHoliday = useCallback(
    (indexDelete: number) => {
      setValueListHolidays((init: Holidays[]) => {
        init.splice(indexDelete, 1);
        onChange && onChange([...init]);
        return init;
      });
    },
    [deleteHoliday, setValueListHolidays, valueListHolidays]
  );
  // modal
  const isDetail = useMemo(() => {
    return !!dataForm?.value.name;
  }, [dataForm?.value.name]);

  const handleUpdateValue = useCallback(
    (value: any) => {
      console.log({ value });
      if (isDetail && dataForm?.value.name) {
        setValueListHolidays((init: Holidays[]) => {
          init.splice(dataForm.index, 1, value);
          onChange && onChange([...init]);
          return init;
        });
      } else {
        setValueListHolidays((init: Holidays[]) => {
          onChange && onChange([...init, { ...value }]);
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
          <ModalDelete
            title="Are you sure that you want to remove this holiday?"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            content={
              "This holiday will be removed permanently. This action cannot be undone. All tickets which are using this holiday will get affected too."
            }
            deleteAction={() => handleRemoveHoliday(deleteHoliday)}
          />
          <Card>
            <IndexTable
              resourceName={resourceName}
              itemCount={valueListHolidays.length}
              selectable={false}
              headings={[
                { title: "Name" },
                { title: "Date" },
                { title: "Auto-Reply" },
              ]}
              hasMoreItems
              emptyState={
                <EmptySearchResult
                  title={"No holiday yet"}
                  description={"Try changing the filters or search term"}
                  withIllustration
                />
              }
            >
              {rowMarkup}
            </IndexTable>
          </Card>
          <div className="flex items-center justify-center mt-4">
            <Pagination
              total={valueListHolidays ? valueListHolidays.length : 1}
              pageSize={filterData.limit}
              currentPage={filterData.page}
              onChangePage={(page) =>
                setFilterData((val: any) => ({ ...val, page }))
              }
              previousTooltip={"Previous"}
              nextTooltip={"Next"}
            />
          </div>
        </div>
      ) : null}
      <Link onClick={handleOnpen}>Add a holiday...</Link>
    </div>
  );
};

export default HolidayTab;
