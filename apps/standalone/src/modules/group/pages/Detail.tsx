import {
  generatePath,
  useJob,
  useNavigate,
  useParams,
  useToggle,
} from "@moose-desk/core";
import { UpdateUserGroupRequest, UserGroupRepository } from "@moose-desk/repo";
import { Button } from "antd";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "react-query";
import { catchError, map, of } from "rxjs";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { GroupForm } from "src/modules/group/components/GroupForm";
import { getOneGroup } from "src/modules/group/helper/api";
import GroupRoutePaths from "src/modules/group/routes/paths";

const DetailGroup = () => {
  const [form] = Form.useForm();
  const message = useMessage();
  const notification = useNotification();
  const { toggle: updateForm } = useToggle();
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: dataGroup,
    isLoading: processing,
    refetch,
  } = useQuery({
    queryKey: ["getGroup", id],
    queryFn: () => getOneGroup(id as string),
    // retry: 1,

    onError: () => {
      navigate("/404");
    },
  });

  const group = useMemo(() => {
    return dataGroup;
  }, [dataGroup]);
  const { t } = useTranslation();

  const { run: updateGroupApi, processing: loadingUpdateGroup } = useJob(
    (id: string, payload: UpdateUserGroupRequest) => {
      message.loading.show(t("messages:loading.updating_group"));

      return UserGroupRepository()
        .update(id, payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              message.loading.hide().then(() => {
                notification.success(t("messages:success.update_group"));
                queryClient.setQueryData(["getGroup", id], data.data);
                navigate(generatePath(GroupRoutePaths.Index));
              });
            } else {
              if (data.errorCode) {
                message.loading.hide().then(() => {
                  notification.error(t("messages:error.update_group"));
                });
              }
            }
          }),
          catchError((err) => {
            message.loading.hide().then(() => {
              notification.error(t("messages:error.update_group"));
            });
            return of(err);
          })
        );
    },
    {
      showLoading: true,
    }
  );

  const initialValues = useMemo(() => {
    return {
      name: group?.name ?? "",
      description: group?.description ?? "",
      groupMembers: group?.memberIds ?? [],
    };
  }, [group]);

  const handleSubmit = useCallback(
    (values) => {
      if (id) {
        updateGroupApi(id, values);
        window.scrollTo(0, 0);
      }
    },
    [id]
  );

  // useMount(() => {
  //   getGroupApi();
  // });

  return (
    <div>
      <Header className="pb-6" title={group?.name ?? ""} back>
        <div className="flex justify-end items-center flex-1">
          <div className="flex gap-2">
            <Button
              onClick={() => {
                form.resetFields();
                navigate(generatePath(GroupRoutePaths.Index));
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              loading={loadingUpdateGroup}
              onClick={() => form.submit()}
            >
              Save
            </Button>
          </div>
        </div>
      </Header>
      {processing ? (
        <MDSkeleton lines={10} />
      ) : (
        <GroupForm
          id={id}
          form={form}
          initialValues={initialValues}
          onValuesChange={updateForm}
          onFinish={handleSubmit}
        />
      )}
    </div>
  );
};

export default DetailGroup;
