import path from 'node:path'
import fs from 'node:fs/promises'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  ignoreTLS: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

type Body = {
  text?: string
  html?: string
}

export class Email {
  constructor(private readonly to: string, private readonly subject: string) {}

  async send({ html, text }: Body) {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: this.to,
      subject: this.subject,
      text,
      html
    })
  }

  /**
   *
   * @param template template name using i18n
   * @param tokens here you can replace tokens by raw values like: { '@token': 'my-token' } will replace "@token" for "my-token"
   * @returns the template itself
   */
  static async readTemplate(template: string, tokens?: Record<string, string>) {
    const templatePath = path.join(process.cwd(), `src/views/email/templates/${template}`)

    const file = await fs.readFile(templatePath)

    let content = file.toString()

    if (tokens) for (const token in tokens) content = content.replace(token, tokens[token])

    return content
  }
}
