import { Priority } from "@moose-desk/repo";
import { create } from "zustand";
interface FormCreate {
  fromEmail: {
    email: string;
    name: string;
  };
  senderConfigId: string;
  agentObjectId: string | undefined;
  agentEmail: string | undefined;
  toEmail: string;
  customerObjectId: string;
  ccEmails: string[];
  bccEmails: string[];
  subject: string;
  description: string;
  status: string;
  priority: string;
  tags: string[];
  attachmentId?: string[];
}

interface SettingState {
  formCreate: FormCreate;
  updateFormCreate: (object: FormCreate) => void;
}
export const initialSave: FormCreate = {
  fromEmail: {
    email: "",
    name: "",
  },
  senderConfigId: "",
  agentObjectId: undefined,
  agentEmail: undefined,
  toEmail: "",
  customerObjectId: "",
  ccEmails: [],
  bccEmails: [],
  subject: "",
  description: "",
  status: "OPEN",
  priority: Priority.MEDIUM,
  tags: [],
  attachmentId: [],
};

const useCreateTicket = create<SettingState>()((set) => ({
  formCreate: initialSave,
  updateFormCreate: (object: FormCreate) =>
    set((state) => ({ formCreate: object })),
}));
export default useCreateTicket;
