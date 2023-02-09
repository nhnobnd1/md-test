import {
  generatePath,
  PageComponent,
  useJob,
  useNavigate,
} from "@moose-desk/core";
import { CreateUserGroupRequest, UserGroupRepository } from "@moose-desk/repo";
import { Button } from "antd";
import { useCallback } from "react";
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

  const { run: createGroupApi, processing: loadingAddGroup } = useJob(
    (payload: CreateUserGroupRequest) => {
      message.loading.show("Creating a group");
      return UserGroupRepository()
        .create(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              message.loading.hide().then(() => {
                notification.success("Group has been added succcesfully.");
                navigate(generatePath(GroupRoutePaths.Index));
              });
            } else {
              if (data.errorCode) {
                message.loading.hide().then(() => {
                  notification.success("Create a group failed.");
                });
              }
            }
          }),
          catchError((err) => {
            message.loading.hide().then(() => {
              notification.success("Create a group failed.");
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
      <Header className="pb-6" title="New Group" back>
        <div className="flex justify-end items-center flex-1">
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
