import { Customer } from "@moose-desk/repo";
import { FC, useState } from "react";
import PopupCustomer from "src/modules/customer/component/PopupCustomer";

interface ModalCustomerProps {
  open: boolean;
  setOpen: any;
}

export const ModalCustomer: FC<ModalCustomerProps> = ({ open, setOpen }) => {
  const [dataPopup, setDataPopup] = useState<
    | {
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
      }
    | undefined
  >({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
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
