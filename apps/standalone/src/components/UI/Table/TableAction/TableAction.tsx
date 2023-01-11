import { Space } from "antd";
import { ButtonDelete } from "src/components/UI/Button/ButtonDelete";
import { ButtonEdit } from "src/components/UI/Button/ButtonEdit";
import { ButtonModalDelete } from "src/components/UI/Button/ButtonModalDelete";
import { ButtonView } from "src/components/UI/Button/ButtonView";
import "./TableAction.scss";
interface TableActionProps {
  record: any;
  history?: boolean;
  edit?: boolean;
  view?: boolean;
  showDelete?: boolean;
  onlyIcon?: boolean;

  specialDelete?: {
    name: string;
    description: string;
  };

  onView?: (record: any) => void;
  onEdit?: (record: any) => void;
  onDelete?: (record: any) => void;
  onSpecialDelete?: (record: any) => void;
}

const TableAction = ({
  record,
  edit,
  onlyIcon,
  showDelete,
  specialDelete,
  view,
  onView,
  onEdit,
  onDelete,
  onSpecialDelete,
}: TableActionProps) => {
  return (
    <Space className="flex justify-center">
      {view && (
        <ButtonView
          onlyIcon={onlyIcon}
          onClick={() => onView && onView(record)}
        />
      )}
      {edit && (
        <ButtonEdit
          onlyIcon={onlyIcon}
          onClick={() => onEdit && onEdit(record)}
        />
      )}
      {showDelete && (
        <ButtonDelete
          onlyIcon={onlyIcon}
          onClick={() => onDelete && onDelete(record)}
        />
      )}
      {specialDelete && specialDelete.name && (
        <ButtonModalDelete
          onlyIcon={onlyIcon}
          name={specialDelete.name}
          description={specialDelete.description}
          onConfirm={() => onSpecialDelete && onSpecialDelete(record)}
        />
      )}
    </Space>
  );
};

export default TableAction;
