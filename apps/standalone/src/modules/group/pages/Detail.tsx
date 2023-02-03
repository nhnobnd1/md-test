import {
  generatePath,
  useJob,
  useMount,
  useNavigate,
  useParams,
} from "@moose-desk/core";
import {
  UpdateUserGroupRequest,
  UserGroup,
  UserGroupRepository,
} from "@moose-desk/repo";
import { Button } from "antd";
import { useCallback, useMemo, useState } from "react";
import { catchError, map, of } from "rxjs";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { GroupForm } from "src/modules/group/components/GroupForm";
import GroupRoutePaths from "src/modules/group/routes/paths";
import { useStore } from "src/providers/StoreProviders";
interface DetailGroupProps {}

const DetailGroup = (props: DetailGroupProps) => {
  const [form] = Form.useForm();
  const { storeId } = useStore();
  const message = useMessage();
  const notification = useNotification();
  const navigate = useNavigate();
  const [group, setGroup] = useState<UserGroup>();
  const { id } = useParams();

  const { run: getGroupApi } = useJob(() => {
    return UserGroupRepository()
      .getOne(id ?? "")
      .pipe(
        map(({ data }) => {
          setGroup(data.data);
        }),
        catchError((err) => {
          return of(err);
        })
      );
  });

  const { run: updateGroupApi, processing: loadingUpdateGroup } = useJob(
    (id: string, payload: UpdateUserGroupRequest) => {
      message.loading.show("Updating a group");
      return UserGroupRepository()
        .update(id, payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              message.loading.hide().then(() => {
                notification.success("Group has been updated succcesfully.");
                navigate(generatePath(GroupRoutePaths.Index));
              });
            } else {
              if (data.errorCode) {
                message.loading.hide().then(() => {
                  notification.success("Update a group failed.");
                });
              }
            }
          }),
          catchError((err) => {
            message.loading.hide().then(() => {
              notification.success("Update a group failed.");
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

  useMount(() => {
    getGroupApi();
  });

  return (
    <div>
      <Header className="pb-6" title={group?.name ?? ""} back>
        <div className="flex justify-end items-center flex-1">
          <Button
            type="primary"
            loading={loadingUpdateGroup}
            onClick={() => form.submit()}
          >
            Save
          </Button>
        </div>
      </Header>
      <GroupForm
        id={id}
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
      />
    </div>
  );
};

export default DetailGroup;