import {
  Button,
  ButtonGroup,
  Card,
  EmptySearchResult,
  Icon,
  IndexTable,
  Link,
  Text,
} from "@shopify/polaris";
import { DeleteMajor, EditMajor } from "@shopify/polaris-icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import { Pagination } from "src/components/Pagination";
import ModalHoliday from "src/modules/setting/component/Holidays/ModalHoliday";

interface HolidayTabProps {
  disabled?: boolean;
  value?: {
    name: string;
    date: {
      start: Date | Range | undefined;
      end: Date | Range | undefined;
    };
  }[];
  onChange?: () => void;
}

const HolidayTab = ({
  disabled,
  value,
  onChange,
  ...props
}: HolidayTabProps) => {
  const [valueListHolidays, setValueListHolidays] = useState<
    {
      name: string;
      date: {
        start: Date | Range | undefined;
        end: Date | Range | undefined;
      };
      autoReply: string;
    }[]
  >([
    {
      name: "holiday 1",
      date: {
        start: undefined,
        end: undefined,
      },
      autoReply: "111111",
    },
  ]);
  const defaultFilter = () => ({
    page: 1,
    limit: 5,
  });
  const [filterData, setFilterData] = useState<any>(defaultFilter);
  const resourceName = {
    singular: "holiday",
    plural: "holidays",
  };

  // const valueTest = "Jun 20";
  // console.log(dayjs(valueTest, "MM DD").format("DD MM"));

  const [dataForm, setDataForm] = useState<{
    name: string;
    date: {
      start: Date | Range | undefined;
      end: Date | Range | undefined;
    };
    autoReply: string;
    index: number;
  }>();
  const rowMarkup = valueListHolidays.map((value, index) => (
    <IndexTable.Row id={value.name} key={value.name} position={index}>
      <IndexTable.Cell className="py-3">
        <Link monochrome onClick={() => handleDetails(index)} removeUnderline>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {`${value.name}`}
          </Text>
        </Link>
      </IndexTable.Cell>
      <IndexTable.Cell className="py-3">1</IndexTable.Cell>
      <IndexTable.Cell className="py-3">{value.autoReply}</IndexTable.Cell>
      <IndexTable.Cell className="py-3">
        <ButtonGroup>
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
            onClick={() => handleOpenModalDelete(value.name)}
            destructive
          />
        </ButtonGroup>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));
  // details
  const handleDetails = useCallback(
    (index: number) => {
      const dataDetails = { ...valueListHolidays[index] };
      setDataForm({
        ...dataDetails,
        index,
      });
      setOpenModalHoliday(true);
    },
    [valueListHolidays]
  );
  // delete
  const [isOpen, setIsOpen] = useState(false);
  const [deleteHoliday, setDeleteHoliday] = useState<string>("");
  const handleOpenModalDelete = (id: string) => {
    setIsOpen(true);
    setDeleteHoliday(id);
  };
  const handleRemoveHoliday = useCallback((dataDelete: string[]) => {}, []);
  // modal
  const isDetail = useMemo(() => {
    return !!dataForm?.name;
  }, [dataForm?.name]);
  const handleUpdateValue = useCallback(
    (value: any) => {
      if (isDetail && dataForm?.name) {
        setValueListHolidays((init: any[]) => [
          ...init.splice(dataForm.index, 1, value),
        ]);
      } else {
        setValueListHolidays((init: any[]) => [...init, { ...value }]);
      }
    },
    [isDetail, dataForm]
  );
  const [openModalHoliday, setOpenModalHoliday] = useState(false);

  const handleOnpen = useCallback(() => {
    setOpenModalHoliday(true);
  }, []);

  useEffect(() => {
    console.log("valueListHolidays", valueListHolidays);
  }, [valueListHolidays]);
  return (
    <div className="p-2 mt-2">
      <ModalHoliday
        title="Add a holiday"
        open={openModalHoliday}
        onClose={() => setOpenModalHoliday(false)}
        dataForm={dataForm}
        onChange={handleUpdateValue}
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
            deleteAction={() => handleRemoveHoliday([deleteHoliday])}
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
              pageSize={5}
              currentPage={1}
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
