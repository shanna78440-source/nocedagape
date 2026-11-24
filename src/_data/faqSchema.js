import { readFileSync } from "node:fs";
export default function () {
  const faq = JSON.parse(readFileSync(new URL("./faq.json", import.meta.url)));
  return faq.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.r } }));
}
