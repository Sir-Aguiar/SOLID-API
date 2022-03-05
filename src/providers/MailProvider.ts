interface Address {
  email: string;
  name: string;
}

interface Message {
  to: Address;
  from: Address;
  subject: string;
  body: string;
  // attachment?:
}

interface MailProvider {
  sendEmailToUser(message: Message): Promise<void>;
}
export { MailProvider, Message };
