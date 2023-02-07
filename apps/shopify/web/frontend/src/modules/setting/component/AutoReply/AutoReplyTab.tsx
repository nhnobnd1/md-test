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
import ModalAutoReply from "src/modules/setting/component/AutoReply/ModalAutoReply";

interface AutoReplyTabProps {
  disabled?: boolean;
  value?: {
    name: string;
    content: any;
  }[];
  onChange?: () => void;
}

const AutoReplyTab = ({
  disabled,
  value,
  onChange,
  ...props
}: AutoReplyTabProps) => {
  const [valueListAutoReplys, setValueListAutoReplys] = useState<
    {
      name: string;
      content: any;
    }[]
  >([
    {
      name: "autoReply 1",
      content: "ahihi",
    },
  ]);
  const defaultFilter = () => ({
    page: 1,
    limit: 5,
  });
  const [filterData, setFilterData] = useState<any>(defaultFilter);
  const resourceName = {
    singular: "autoReply",
    plural: "autoReplys",
  };

  const [dataForm, setDataForm] = useState<{
    name: string;
    content: any;
    index: number;
  }>();
  const rowMarkup = valueListAutoReplys.map((value, index) => (
    <IndexTable.Row id={value.name} key={value.name} position={index}>
      <IndexTable.Cell className="py-3">
        <Link monochrome onClick={() => handleDetails(index)} removeUnderline>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {`${value.name}`}
          </Text>
        </Link>
      </IndexTable.Cell>
      <IndexTable.Cell className="py-3">{value.content}</IndexTable.Cell>
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
      const dataDetails = { ...valueListAutoReplys[index] };
      setDataForm({
        ...dataDetails,
        index,
      });
      setOpenModalAutoReply(true);
    },
    [valueListAutoReplys]
  );
  // delete
  const [isOpen, setIsOpen] = useState(false);
  const [deleteAutoReply, setDeleteAutoReply] = useState<string>("");
  const handleOpenModalDelete = (id: string) => {
    setIsOpen(true);
    setDeleteAutoReply(id);
  };
  const handleRemoveAutoReply = useCallback((dataDelete: string[]) => {}, []);
  // modal
  const isDetail = useMemo(() => {
    return !!dataForm?.name;
  }, [dataForm?.name]);
  const handleUpdateValue = useCallback(
    (value: any) => {
      if (isDetail && dataForm?.name) {
        setValueListAutoReplys((init: any[]) => [
          ...init.splice(dataForm.index, 1, value),
        ]);
      } else {
        setValueListAutoReplys((init: any[]) => [...init, { ...value }]);
      }
    },
    [isDetail, dataForm]
  );
  const [openModalAutoReply, setOpenModalAutoReply] = useState(false);

  const handleOnpen = useCallback(() => {
    setOpenModalAutoReply(true);
  }, []);

  useEffect(() => {
    console.log("valueListAutoReplys", valueListAutoReplys);
  }, [valueListAutoReplys]);
  return (
    <div className="p-2 mt-2">
      <ModalAutoReply
        title="Add an Auto-Reply"
        open={openModalAutoReply}
        onClose={() => setOpenModalAutoReply(false)}
        dataForm={dataForm}
        onChange={handleUpdateValue}
      />
      {valueListAutoReplys.length ? (
        <div>
          <ModalDelete
            title="Are you sure that you want to remove this autoReply?"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            content={
              "This auto-reply will be removed permanently. This action cannot be undone. All tickets which are using this autoReply will get affected too."
            }
            deleteAction={() => handleRemoveAutoReply([deleteAutoReply])}
          />
          <Card>
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
          </Card>
          <div className="flex items-center justify-center mt-4">
            <Pagination
              total={valueListAutoReplys ? valueListAutoReplys.length : 1}
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
      <Link onClick={handleOnpen}>Add an auto-reply...</Link>
    </div>
  );
};

export default AutoReplyTab;
