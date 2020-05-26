import { createActions } from "redux-actions";

const actions = createActions({
  SEND_INVOICE_ACTION: (username: string, email: string, subject: string, message?: string) => ({ username, email, subject, message })
});

export const { sendInvoiceAction } = actions;
