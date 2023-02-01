import fs from "fs";
import handlebars from "handlebars";

interface ITemplateVariables {
  [key: string]: string | number;
}

export class HandlebarsMailTemplate {
  async parse(file: string, variables: ITemplateVariables): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: "utf-8",
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
