export class EmailDto {
  from: string;
  tos: string[];
  ccs: string[];
  subject: string;
  bodyHtml: string;
}
