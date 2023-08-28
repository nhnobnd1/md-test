import { MDButton } from "src/components/UI/Button/MDButton";
import styles from "./style.module.scss";
interface IProps {
  onCancel?: () => void;
  onSave: () => void;
  loading?: boolean;
}
export const ContextualSaveBar = ({
  onCancel,
  onSave,
  loading = false,
}: IProps) => {
  return (
    <div className={styles.contextualSaveBar}>
      <div className={styles.groupButton}>
        {onCancel && (
          <MDButton onClick={onCancel} className={styles.cancelBtn}>
            Cancel
          </MDButton>
        )}
        <MDButton onClick={onSave} type="primary" loading={loading}>
          Save
        </MDButton>
      </div>
    </div>
  );
};
