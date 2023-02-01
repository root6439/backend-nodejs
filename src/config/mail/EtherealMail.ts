import { HandlebarsMailTemplate } from "./HandlebarsMailTemplate";
import nodemailer from "nodemailer";

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

interface EmailContact {
  name: string;
  email: string;
}

interface ISendMailInfos {
  to: EmailContact;
  from?: EmailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export class EtherealMail {
  static async sendMail(mailInfos: ISendMailInfos): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        address: mailInfos.from?.email ?? "equipe@apivendas.com.br",
        name: mailInfos.from?.name ?? "Equipe API Vendas",
      },
      to: {
        address: mailInfos.to.email,
        name: mailInfos.to.name,
      },
      subject: mailInfos.subject,
      html: await mailTemplate.parse(
        mailInfos.templateData.file,
        mailInfos.templateData.variables
      ),
    });

    console.log("MessageId: " + message.messageId);
    console.log("Preview URL: " + nodemailer.getTestMessageUrl(message));
  }
}
