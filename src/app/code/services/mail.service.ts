import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MailService {
  mail: any;
  textMailOptions = {
    from: 'trigoremote@gmail.com',
    to: 'probisahosting@gmail.com,probisahosting@gmail.com',
    subject: 'Ejemplo de Email',
    text: 'Omit, Test Message '
  };
  imageMailOptions = {
    from: 'probisahosting@gmail.com',
    to: 'lmorasoft@gmail.com,probisahosting@gmail.com',
    subject: 'Test Message from',
    text: 'Omit, Test Message from ',
    attachments: [{ path: 'data:text/plain;base64,aGVsbG8gd29ybGQ=' }]
  };

  constructor(
  ) {

  }

  sendText(subject: string, text: string) {
    this.textMailOptions.subject = subject;
    this.textMailOptions.text = text;
    this.mail.sendMail(this.textMailOptions, function (error: any, info: { response: any; }) {
      if (error) {
        console.log('Error enviando Correo', error);
      } else {
        console.info("Email Sended OK", "Mail", info.response)
      }
    });
  }

  sendWithImageUri(subject: string, text: string, base64Image: string) {
    this.imageMailOptions.attachments[0].path = `${base64Image}`;
    this.imageMailOptions.subject = subject;
    this.imageMailOptions.text = text;
    try {
      this.mail.sendMail(this.imageMailOptions)
        .then(() => { console.log("ENVIADO CORREO") })
        .catch((error: any) => {
          console.log("ERROR ENVIADO EMAIL", error);
        })
    } catch (error) {

    }
  }
}
