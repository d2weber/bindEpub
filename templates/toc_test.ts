import { assertStringIncludes } from "asserts";
import { toc_ncx, toc_xhtml } from "./mod.ts";

Deno.test({
  name: "Table of contents",
  async fn(t) {
    const args = {
      chapters: [],
      bookTitle: "",
      tocTitle: "",
      author: "",
      language: "",
      uuid: "",
    };
    assertStringIncludes(
      toc_xhtml({ ...args, bookTitle: "Test-title" }),
      "<title>Test-title</title>",
    );
    assertStringIncludes(
      toc_ncx({ ...args, bookTitle: "Test-title" }),
      "<docTitle><text>Test-title",
    );
    assertStringIncludes(
      toc_xhtml({ ...args, tocTitle: "Test-title" }),
      "Test-title",
    );
    assertStringIncludes(
      toc_ncx({ ...args, tocTitle: "Test-title" }),
      "<navLabel><text>Test-title",
    );

    await t.step("Chapter list", () => {
      const chapters = [
        { title: "First-chapter-title", text: "" },
        { title: "Second-chapter-title", text: "" },
      ];

      assertStringIncludes(
        toc_xhtml({ ...args, chapters }),
        "First-chapter-title",
      );
      assertStringIncludes(
        toc_xhtml({ ...args, chapters }),
        "Second-chapter-title",
      );

      assertStringIncludes(
        toc_ncx({ ...args, chapters }),
        "1. First-chapter-title",
      );
      assertStringIncludes(
        toc_ncx({ ...args, chapters }),
        "2. Second-chapter-title",
      );
    });
  },
});
