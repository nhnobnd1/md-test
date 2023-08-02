import { Customer } from "@moose-desk/repo";
import { FC, useMemo } from "react";
import PopupCustomer from "src/modules/customer/component/PopupCustomer";

interface ModalCustomerProps {
  open: boolean;
  setOpen: any;
  email?: string;
}

export const ModalCustomer: FC<ModalCustomerProps> = ({
  open,
  setOpen,
  email,
}) => {
  const dataPopup: any = useMemo(() => {
    return (
      {
        email: email || "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
      } || undefined
    );
  }, [email]);
  return (
    <PopupCustomer
      open={open}
      dataForm={dataPopup as Customer}
      onCancel={() => {
        setOpen(false);
      }}
    />
  );
};
