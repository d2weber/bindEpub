import { bindEpub } from "./mod.ts";

const chapters = [
  { title: "My first chapter", text: "asdf asdf" },
  { title: "Another chapter", text: "1234 asdf" },
];
const options = {
  epubVersion: 3 as const,
  language: "en-en",
};

Deno.test({
  name: "Write a test.epub",
  async fn() {
    await bindEpub(chapters, options)
      .then((content) => Deno.writeFile("./test.epub", content));
  },
});
