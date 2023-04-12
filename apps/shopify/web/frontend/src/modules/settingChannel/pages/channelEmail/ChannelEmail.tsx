import {
  generatePath,
  TokenManager,
  useDebounceFn,
  useDidUpdate,
  useJob,
  useNavigate,
  usePrevious,
  useToggle,
} from "@moose-desk/core";
import {
  BaseMetaDataListResponse,
  EmailIntegration,
  EmailIntegrationRepository,
  GetListUserGroupRequest,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  ButtonGroup,
  Card,
  EmptySearchResult,
  Filters,
  IndexTable,
  Link,
  Page,
  Text,
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import { ButtonDelete } from "src/components/Button/ButtonDelete";
import { ButtonEdit } from "src/components/Button/ButtonEdit";
import { ButtonSort } from "src/components/Button/ButtonSort";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import { Pagination } from "src/components/Pagination";
import env from "src/core/env";
import { useSubdomain } from "src/hooks/useSubdomain";
import { SortOrderOptions } from "src/models/Form";

import GroupsRoutePaths from "src/modules/groups/routes/paths";
import { optionsSort } from "src/modules/settingChannel/constant/channelEmail";

export interface ChannelEmailProps {}

export const ChannelEmail = (props: ChannelEmailProps) => {
  const navigate = useNavigate();
  const [sortValue, setSortValue] = useState<string[]>([]);
  const [emails, setEmails] = useState<EmailIntegration[]>([]);
  const { show } = useToast();
  const { getSubDomain, getDomainStandalone } = useSubdomain();
  const {
    state: btnSort,
    toggle: toggleBtnSort,
    off: closeBtnSort,
  } = useToggle();

  const {
    state: modalDelete,
    on: openModalDelete,
    off: closeModalDelete,
  } = useToggle(false);

  const defaultFilter: () => GetListUserGroupRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });

  const [filterData, setFilterData] = useState<GetListUserGroupRequest>(
    defaultFilter()
  );
  const prevFilter = usePrevious<GetListUserGroupRequest>(filterData);

  const [meta, setMeta] = useState<BaseMetaDataListResponse>();

  const { run: getListEmailApi, processing: loadingList } = useJob(
    (payload: any) => {
      return EmailIntegrationRepository()
        .getListEmail(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              const listEmails = data.data.map((item) => ({
                ...item,
                id: item._id,
              }));
              setEmails(listEmails);
              setMeta(data.metadata);
            } else {
              show("Get data agent failed", {
                isError: true,
              });
            }
          })
        );
    }
  );

  const { run: getListDebounce } = useDebounceFn(
    (payload: GetListUserGroupRequest) => {
      getListEmailApi(payload);
    },
    { wait: 300 }
  );

  const handleSort = useCallback(
    (selected: string[]) => {
      const arraySort = selected[0].split(":");
      const sortBy = arraySort[0];
      const sortOrder = arraySort[1] === SortOrderOptions.ACS ? 1 : -1;
      setSortValue(selected);

      setFilterData((value) => {
        return { ...value, sortBy, sortOrder };
      });
    },
    [filterData]
  );

  const handleFiltersQueryChange = useCallback((queryValue: string) => {
    setFilterData((old) => {
      return {
        ...old,
        query: queryValue,
      };
    });
  }, []);

  const resetFilterData = useCallback(() => {
    setFilterData(defaultFilter());
  }, []);

  const handleQueryValueRemove = useCallback(() => {
    setFilterData((old) => {
      return {
        ...old,
        query: "",
      };
    });
  }, []);

  const [idDelete, setIdDelete] = useState<string | null>(null);

  const prevIdDelete = usePrevious(idDelete);

  const handleOpenModalDelete = useCallback((id: string) => {
    setIdDelete(id);
  }, []);

  useDidUpdate(() => {
    if (prevIdDelete !== idDelete && idDelete) {
      openModalDelete();
    }
  }, [idDelete]);

  const { run: deleteEmail, processing: loadingDelete } = useJob(
    (id: string) => {
      return EmailIntegrationRepository()
        .deleteEmailIntegration(id)
        .pipe(
          map(({ data }) => {
            setIdDelete(null);
            closeModalDelete();
            if (data.statusCode === 200) {
              getListEmailApi(filterData);
              show("Delete email success");
            } else {
              show("Delete email failed", {
                isError: true,
              });
            }
          }),
          catchError((error) => {
            show("Delete email failed", {
              isError: true,
            });
            return of(error);
          })
        );
    }
  );

  useEffect(() => {
    if (prevFilter?.query !== filterData.query && filterData.query) {
      getListDebounce(filterData);
    } else {
      getListEmailApi(filterData);
    }
  }, [filterData]);

  const getDomain = useCallback(() => {
    return `https://${getSubDomain()}${getDomainStandalone()}`;
  }, [import.meta.env.MODE, getSubDomain, getDomainStandalone]);

  const handleRedirectStandaloneCreate = useCallback(() => {
    const baseToken = TokenManager.getToken("base_token");
    const refreshToken = TokenManager.getToken("refresh_token");
    window.open(
      `https://${getDomain()}/setting-channel/channel-email/redirect?baseToken=${baseToken}&refreshToken=${refreshToken}&type=create`
    );
  }, [window.location.href, import.meta.env.MODE]);

  const handleRedirectStandaloneEdit = useCallback(
    (id: string) => {
      const baseToken = TokenManager.getToken("base_token");
      const refreshToken = TokenManager.getToken("refresh_token");
      window.open(
        `https://${getDomain()}/setting-channel/channel-email/redirect?baseToken=${baseToken}&refreshToken=${refreshToken}&type=update&id=${id}`
      );
    },
    [window.location.href, getDomain]
  );

  return (
    <>
      <Page
        title="Email Configuration"
        primaryAction={{
          content: "Add new Email Address",
          onAction: () => handleRedirectStandaloneCreate(),
        }}
        fullWidth
      >
        <ModalDelete
          open={modalDelete}
          onClose={() => {
            setIdDelete(null);
            closeModalDelete();
          }}
          textConfirm={"Remove"}
          closePopupAction={false}
          title="Are you sure that you want to permanently remove this email connection."
          content="This email will be removed permanently. You can no longer use this email for sending or receiving emails for MooseDesk's support tickets."
          loadingConfirm={loadingDelete}
          deleteAction={() => idDelete && deleteEmail(idDelete)}
        />
        <Card>
          <div className="flex-1 px-4 pt-4 pb-2">
            <Filters
              queryValue={filterData.query}
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={handleQueryValueRemove}
              queryPlaceholder="Search"
              filters={[]}
              onClearAll={resetFilterData}
            >
              <div className="pl-2">
                <ButtonSort
                  active={btnSort}
                  sortValue={sortValue}
                  onSort={handleSort}
                  onShow={toggleBtnSort}
                  onClose={closeBtnSort}
                  options={optionsSort}
                />
              </div>
            </Filters>
          </div>
          <IndexTable
            resourceName={{ singular: "email", plural: "emails" }}
            itemCount={emails.length}
            selectable={false}
            hasMoreItems
            lastColumnSticky
            loading={loadingList}
            emptyState={
              <EmptySearchResult
                title={
                  "Sorry! There is no records matched with your search criteria"
                }
                description={"Try changing the filters or search term"}
                withIllustration
              />
            }
            headings={[
              { title: "Name" },
              { title: "Email Address" },
              { title: "Action" },
            ]}
          >
            {emails.map((emailItem, index) => (
              <IndexTable.Row
                id={emailItem._id}
                key={emailItem._id}
                position={index}
              >
                <IndexTable.Cell className="py-3">
                  <div className="unstyle-link">
                    <Link
                      data-polaris-unstyled
                      url={generatePath(GroupsRoutePaths.Detail, {
                        id: emailItem._id,
                      })}
                      removeUnderline={true}
                    >
                      <Text variant="bodyMd" fontWeight="semibold" as="span">
                        {emailItem.name}
                      </Text>
                    </Link>
                  </div>
                </IndexTable.Cell>
                <IndexTable.Cell className="py-3">
                  <div>{emailItem.supportEmail}</div>
                </IndexTable.Cell>

                <IndexTable.Cell className="py-3">
                  <ButtonGroup>
                    <ButtonEdit
                      onClick={() =>
                        handleRedirectStandaloneEdit(emailItem._id)
                      }
                    ></ButtonEdit>
                    <ButtonDelete
                      disabled={emailItem?.isPrimaryEmail}
                      onClick={() => handleOpenModalDelete(emailItem._id)}
                      destructive
                    >
                      Remove
                    </ButtonDelete>
                  </ButtonGroup>
                </IndexTable.Cell>
              </IndexTable.Row>
            ))}
          </IndexTable>
          {meta?.totalCount ? (
            <div className="flex items-center justify-center py-8">
              {filterData.page && filterData.limit && meta?.totalCount && (
                <Pagination
                  total={meta.totalCount}
                  pageSize={filterData.limit ?? 0}
                  currentPage={filterData.page}
                  onChangePage={(page) =>
                    setFilterData((val) => {
                      return { ...val, page };
                    })
                  }
                />
              )}
            </div>
          ) : null}
        </Card>
      </Page>
    </>
  );
};

export default ChannelEmail;
