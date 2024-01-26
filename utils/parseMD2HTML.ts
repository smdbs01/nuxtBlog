import { marked } from "marked";

export default async function (md: string): Promise<string> {
  const html = await marked.parse(md);
  console.log(html);

  return html;
}
