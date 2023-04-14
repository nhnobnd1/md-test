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
    title: string;
    description: string;
    textDelete?: string;
    okeText?: string;
  } | null;

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
      {specialDelete && specialDelete.title && (
        <ButtonModalDelete
          onlyIcon={onlyIcon}
          title={specialDelete.title}
          description={specialDelete.description}
          onConfirm={() => onSpecialDelete && onSpecialDelete(record)}
          textDelete={specialDelete.textDelete}
          okeText={specialDelete.okeText}
        />
      )}
    </Space>
  );
};

export default TableAction;
