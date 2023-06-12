import {
  createdDatetimeFormat,
  generatePath,
  useDebounceFn,
  useJob,
  useNavigate,
} from "@moose-desk/core";
import { BaseListTagRequest, Tag, TagRepository } from "@moose-desk/repo";
import { ScreenType } from "@moose-desk/repo/global/Global";
import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  Card,
  EmptySearchResult,
  Icon,
  IndexTable,
  Link,
  Loading,
  Page,
  Text,
} from "@shopify/polaris";
import { DeleteMajor } from "@shopify/polaris-icons";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { HeaderList } from "src/components/HeaderList";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import Pagination from "src/components/Pagination/Pagination";
import env from "src/core/env";
import useGlobalData from "src/hooks/useGlobalData";
import useScreenType from "src/hooks/useScreenType";
import { useSubdomain } from "src/hooks/useSubdomain";
import { ModalAddNewTag } from "src/modules/setting/modal/ModalAddNewTag";
import { ModalDetailTag } from "src/modules/setting/modal/ModalDetailTag";
import SettingRoutePaths from "src/modules/setting/routes/paths";

export default function TagIndexPage() {
  const navigate = useNavigate();
  const { show } = useToast();
  const { t } = useTranslation();
  const [direction, setDirection] = useState<"descending" | "ascending">(
    "descending"
  );
  const [indexSort, setIndexSort] = useState<number | undefined>(undefined);
  const [tags, setTags] = useState<Tag[]>([]);
  const [deleteTag, setDeleteTag] = useState<string>("");
  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");
  const [showTitle, setShowTitle] = useState(true);
  const resourceName = {
    singular: "tag",
    plural: "tags",
  };
  const {
    run: fetchListTag,
    result,
    processing: loadTag,
  } = useJob(
    () => {
      return TagRepository()
        .getList(filterData)
        .pipe(
          map(({ data }) => {
            setTags(
              data.data.map((item) => ({
                ...item,
                id: item._id,
              }))
            );
            return data;
          })
        );
    },
    { showLoading: false }
  );
  const rowMarkup = tags.map(
    ({ id, name, updatedDatetime, ticketsCount }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell className="py-3">
          <Link
            monochrome
            onClick={() => navigateToViewTicket(name)}
            removeUnderline
          >
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {`${name}`}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">
          <div
            className="hover:underline hover:cursor-pointer text-center"
            onClick={() => navigateToViewTicket(name)}
          >
            {ticketsCount}
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">
          {createdDatetimeFormat(updatedDatetime, timezone)}
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">
          <div className="flex gap-2">
            <ModalDetailTag fetchListTag={fetchListTag} dataTag={tags[index]} />
            <Button
              icon={() => (
                <Icon
                  accessibilityLabel="Delete"
                  source={() => <DeleteMajor />}
                />
              )}
              onClick={() => handleOpenModalDelete(name)}
              destructive
            />
          </div>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  const navigateToViewTicket = (id: string) => {
    return navigate(
      generatePath(SettingRoutePaths.Workdesk.Tag.ViewTicket, { id })
    );
  };

  const defaultFilter = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
  });
  const [filterData, setFilterData] =
    useState<BaseListTagRequest>(defaultFilter);
  const handleSearchChange = useCallback((value: string) => {
    setFilterData(() => ({
      page: 1,
      ...filterData,
      query: value,
    }));
  }, []);
  const [screenType] = useScreenType();

  const listSort = ["name", "ticketsCount", "updatedTimestamp"];

  const handleSort = (
    headingIndex: number,
    direction: "descending" | "ascending"
  ) => {
    setIndexSort(Number(headingIndex));
    setDirection(direction);
    setFilterData((pre) => ({
      ...pre,
      sortBy: listSort[Number(headingIndex)],
      sortOrder: direction === "ascending" ? 1 : -1,
    }));
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModalDelete = (id: string) => {
    setIsOpen(true);
    setDeleteTag(id);
  };
  const { run: handleRemoveTag } = useJob((dataDelete: string[]) => {
    return TagRepository()
      .delete({ names: dataDelete })
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            show(t("messages:success.delete_tag"));
            fetchListTag();
            setDeleteTag("");
          } else {
            show(t("messages:error.delete_tag"), {
              isError: true,
            });
          }
        }),
        catchError((error) => {
          show(t("messages:error.delete_tag"), {
            isError: true,
          });
          return of(error);
        })
      );
  });

  const { run: callAPI } = useDebounceFn(() => fetchListTag(), {
    wait: 300,
  });

  useEffect(() => {
    callAPI();
  }, [filterData]);
  const css = `
  .Polaris-Page-Header__RightAlign ,.Polaris-Page-Header__PrimaryActionWrapper{
    width:100%!important;
    margin:0
  }
  `;
  return (
    <>
      <style scoped>{screenType === ScreenType.SM ? css : ""}</style>{" "}
      <Page
        title={
          (
            <div
              className={`min-w-[70px]  ${
                showTitle ? "inline-block" : "hidden"
              }`}
            >
              <span>Tags</span>
            </div>
          ) as any
        }
        primaryAction={
          <div className="flex justify-end">
            <HeaderList
              setShowTitle={setShowTitle}
              handleSearch={handleSearchChange}
            >
              <ModalAddNewTag fetchListTag={fetchListTag} />
            </HeaderList>
          </div>
        }
        compactTitle
        fullWidth
      >
        <ModalDelete
          title="Are you sure that you want to permanently remove this Tag?"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          content={
            "This Tag will be removed permanently. This action can not be undone. All tickets which are using this tag will get affected too."
          }
          deleteAction={() => handleRemoveTag([deleteTag])}
          textConfirm="Remove"
        />
        <Card>
          {loadTag && <Loading />}
          <IndexTable
            resourceName={resourceName}
            itemCount={tags.length}
            selectable={false}
            headings={[
              { title: "Name" },
              { title: "# of tickets" },
              { title: "Last updated" },
              { title: "Action" },
            ]}
            hasMoreItems
            loading={loadTag}
            emptyState={
              <EmptySearchResult
                title={
                  "Sorry! There is no records matched with your search creteria"
                }
                description={"Try changing the filters or search term"}
                withIllustration
              />
            }
            sortable={[true, true, true, false]}
            sortDirection={direction}
            sortColumnIndex={indexSort}
            onSort={handleSort}
          >
            {rowMarkup}
          </IndexTable>
        </Card>
        {result && result.metadata.totalCount ? (
          <div className="flex items-center justify-center mt-4">
            <Pagination
              total={result ? result.metadata.totalCount : 1}
              pageSize={filterData.limit ?? 0}
              currentPage={filterData.page ?? 1}
              onChangePage={(page) =>
                setFilterData((val) => ({ ...val, page }))
              }
              previousTooltip={"Previous"}
              nextTooltip={"Next"}
            />
          </div>
        ) : null}
      </Page>
    </>
  );
}
