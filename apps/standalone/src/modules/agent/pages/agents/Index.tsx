import { useMount } from "@moose-desk/core";
import { Button } from "antd";
import { Header } from "src/components/UI/Header";

interface AgentsIndexProps {}

const AgentsIndex = (props: AgentsIndexProps) => {
  useMount(() => {});

  return (
    <div>
      <Header title="Account" back>
        <div className="flex-1 flex justify-end">
          <Button type="primary">Add agent</Button>
        </div>
      </Header>
      <div></div>
    </div>
  );
};

export default AgentsIndex;
