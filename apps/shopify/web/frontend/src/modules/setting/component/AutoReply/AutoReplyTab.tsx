import { AutoReply, Holidays } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  ButtonGroup,
  EmptySearchResult,
  IndexTable,
  LegacyCard,
  Link,
  Text,
} from "@shopify/polaris";
import dayjs from "dayjs";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonDelete } from "src/components/Button/ButtonDelete";
import { ButtonEdit } from "src/components/Button/ButtonEdit";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import { Pagination } from "src/components/Pagination";
import { Search } from "src/components/Search/Search";
import ModalAutoReply from "src/modules/setting/component/AutoReply/ModalAutoReply";

interface AutoReplyTabProps {
  value?: AutoReply[];
  onChange?: (value: AutoReply[]) => void;
  dataHolidays: Holidays[];
  dataBusinessHoursAutoReplyCode: string;
  handleSave: any;
}

const AutoReplyTab = ({
  value,
  onChange,
  dataHolidays,
  dataBusinessHoursAutoReplyCode,
  handleSave,
}: AutoReplyTabProps) => {
  const { show } = useToast();
  const { t, i18n } = useTranslation();

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
  const resourceName = {
    singular: "autoReply",
    plural: "autoReplys",
  };

  const [dataForm, setDataForm] = useState<{
    value: AutoReply;
    index: number;
  }>();
  const rowMarkup = useMemo(() => {
    return valueTableAutoReply.map((value, index) => (
      <IndexTable.Row id={value.name} key={value.name} position={index}>
        <IndexTable.Cell className="py-3">
          <Link monochrome onClick={() => handleDetails(index)} removeUnderline>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {`${value.name}`}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">
          {/* <div dangerouslySetInnerHTML={{ __html: value.content }}></div> */}
          {value.createAt ? dayjs(value.createAt).format("MM/DD/YYYY") : ""}
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">
          <ButtonGroup>
            <ButtonEdit plain onClick={() => handleDetails(index)}></ButtonEdit>
            <ButtonDelete
              plain
              onClick={() => handleOpenModalDelete(index)}
            ></ButtonDelete>
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    ));
  }, [valueTableAutoReply]);
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
      console.log("abc", valueListAutoReplys[indexDelete].code);
      console.log("cde", dataBusinessHoursAutoReplyCode);
      if (
        !findAutoReplyCode &&
        valueListAutoReplys[indexDelete].code !== dataBusinessHoursAutoReplyCode
      ) {
        setValueListAutoReplys((init: AutoReply[]) => {
          init.splice(indexDelete, 1);
          onChange && onChange([...init]);
          return init;
        });
        handleSave();
      } else {
        show(t("messages:error.delete_auto_reply"), {
          isError: true,
        });
      }
    },
    [
      deleteAutoReply,
      valueListAutoReplys,
      dataHolidays,
      dataBusinessHoursAutoReplyCode,
    ]
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
            show(
              `Auto Reply name ${value.name} already exists. Please try again!`,
              {
                isError: true,
              }
            );
            return init;
          }
        });
      } else {
        setValueListAutoReplys((init: AutoReply[]) => {
          if (!init.find((data) => data.name === value.name)) {
            onChange && onChange([...init, { ...value }]);
            return [...init, { ...value }];
          } else {
            show(
              `Auto Reply name ${value.name} already exists. Please try again!`,
              {
                isError: true,
              }
            );
            return init;
          }
        });
      }
      handleSave();
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
  // handle Effect

  useEffect(() => {
    handleUpdateTable();
  }, [filterData, valueListAutoReplys]);

  useEffect(() => {
    setValueListAutoReplys(value?.length ? [...value] : []);
  }, [value]);
  const handleSearchAutoReply = (valueSearch: string) => {
    setValueListAutoReplys(() => {
      const filter = value?.filter((item) =>
        item.name.toLowerCase().includes(valueSearch.toLowerCase())
      );

      return filter || [];
    });
  };
  return (
    <div className="p-4">
      <ModalAutoReply
        title="New Auto-reply"
        open={openModalAutoReply}
        onClose={handleCloseModal}
        dataForm={dataForm}
        onChange={handleUpdateValue}
      />
      <div className="w-full flex justify-end my-2 gap-2">
        <div className="flex-1">
          <Search onTypeSearch={handleSearchAutoReply} />
        </div>
        <Button onClick={handleOpen} primary>
          + Add Auto-reply
        </Button>
      </div>
      {valueListAutoReplys.length ? (
        <div>
          <ModalDelete
            title="Are you sure that you want to remove this auto reply?"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            content={
              "This auto-reply will be removed permanently. This action cannot be undone. All tickets and business hours which are using this auto reply will get affected too."
            }
            deleteAction={() => handleRemoveAutoReply(deleteAutoReply)}
          />
          <LegacyCard>
            <IndexTable
              resourceName={resourceName}
              itemCount={valueListAutoReplys.length}
              selectable={false}
              headings={[{ title: "Name" }, { title: "Date Created" }]}
              hasMoreItems
              emptyState={
                <EmptySearchResult
                  title={"No auto-reply yet"}
                  description={"Try changing the filters or search term"}
                  withIllustration
                />
              }
            >
              {rowMarkup}
            </IndexTable>
          </LegacyCard>
          <div className="flex items-center justify-center mt-4">
            <Pagination
              total={valueListAutoReplys ? valueListAutoReplys.length : 1}
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
    </div>
  );
};

export default memo(AutoReplyTab);
