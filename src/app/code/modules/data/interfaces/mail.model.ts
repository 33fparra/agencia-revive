import { Product } from "./Product";
import { Cart } from "./Cart";

export interface MailAttachment {
  filename?: string;
  path: string;
}

export class Mail {
  to: string;
  message: {
    subject: string;
    text: string;
    html?: string;
    attachments: MailAttachment[];
  }
}
