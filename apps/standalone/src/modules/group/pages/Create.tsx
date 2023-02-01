import { PageComponent } from "@moose-desk/core";
import { Header } from "src/components/UI/Header";
import { GroupForm } from "src/modules/group/components/GroupForm";

interface GroupChildPageProps {}

const GroupChildPage: PageComponent<GroupChildPageProps> = () => {
  return (
    <div>
      <Header className="pb-6" title="New Group" back></Header>
      <GroupForm />
    </div>
  );
};

export default GroupChildPage;
