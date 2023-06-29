import {
  generatePath,
  PageComponent,
  useJob,
  useNavigate,
} from "@moose-desk/core";
import { CreateUserGroupRequest, UserGroupRepository } from "@moose-desk/repo";
import { Button } from "antd";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import {
  GroupForm,
  GroupFormValues,
} from "src/modules/group/components/GroupForm";
import GroupRoutePaths from "src/modules/group/routes/paths";
import { useStore } from "src/providers/StoreProviders";

interface GroupChildPageProps {}

const GroupChildPage: PageComponent<GroupChildPageProps> = () => {
  const [form] = Form.useForm();
  const { storeId } = useStore();
  const message = useMessage();
  const notification = useNotification();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { run: createGroupApi, processing: loadingAddGroup } = useJob(
    (payload: CreateUserGroupRequest) => {
      message.loading.show(t("messages:loading.creating_group"));

      return UserGroupRepository()
        .create(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              message.loading.hide().then(() => {
                notification.success(t("messages:success.create_group"));
                navigate(generatePath(GroupRoutePaths.Index));
              });
            } else {
              if (data.errorCode) {
                message.loading.hide().then(() => {
                  notification.error(t("messages:error.create_group"));
                });
              }
            }
          }),
          catchError((err) => {
            message.loading.hide().then(() => {
              notification.error(t("messages:error.create_group"));
            });
            return of(err);
          })
        );
    },
    {
      showLoading: true,
    }
  );

  const handleSubmit = useCallback(
    (values: GroupFormValues) => {
      const payload: CreateUserGroupRequest = {
        name: values.name,
        description: values.description,
        groupMembers: values.groupMembers,
        storeId,
      };
      createGroupApi(payload);
      window.scrollTo(0, 0);
    },
    [storeId]
  );

  return (
    <div>
      <Header className="mb-5" title="New Group" back>
        <div className="flex justify-end items-center flex-1 gap-2">
          <Button onClick={() => navigate(generatePath(GroupRoutePaths.Index))}>
            Cancel
          </Button>
          <Button
            type="primary"
            loading={loadingAddGroup}
            onClick={() => form.submit()}
          >
            Save
          </Button>
        </div>
      </Header>
      <GroupForm id={undefined} form={form} onFinish={handleSubmit} />
    </div>
  );
};

export default GroupChildPage;
