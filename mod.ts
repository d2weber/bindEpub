import JSZip from "jszip";

import {
  containerFile,
  content_opf,
  contentFile,
  styleFile,
  toc_ncx,
  toc_xhtml,
} from "./templates/mod.ts";

class NotImplementedError extends Error {}

type EpubVersion = 2 | 3;
export interface Options {
  bookTitle: string;
  author: string;
  publisher: string;
  language: string;
  epubVersion: EpubVersion;
  tocTitle: string;
  uuid: string;
}
export interface Chapter {
  title: string;
  text: string;
}

// deno-lint-ignore no-empty-interface
export interface BindEpubChapter extends Chapter {}
// deno-lint-ignore no-empty-interface
export interface BindEpubOptions extends Partial<Options> {}

export async function bindEpub(
  chapters: BindEpubChapter[],
  {
    epubVersion = 3 as const,
    language = "en",
    bookTitle = "Untitled book",
    tocTitle = "Table Of Contents",
    author = "anonymous",
    publisher = "anonymous",
    uuid,
  }: BindEpubOptions,
) {
  uuid = uuid ?? crypto.randomUUID();

  const zip = new JSZip();
  zip.file("mimetype", "application/epub+zip");
  zip.file("META-INF/container.xml", containerFile());
  if (epubVersion === 2) {
    zip.file(
      "META-INF/com.apple.ibooks.display-options.xml",
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
          <display_options>
            <platform name="*">
              <option name="specified-fonts">true</option>
            </platform>
          </display_options>`,
    );
    throw new NotImplementedError(
      "EPUB2 toc and .opf templates are not yet implemented.",
    );
  }

  zip.file("OEBPS/style.css", styleFile());
  zip.file(
    "OEBPS/toc.xhtml",
    toc_xhtml({ chapters, bookTitle, tocTitle, language }),
  );
  zip.file(
    "OEBPS/toc.ncx",
    toc_ncx({ chapters, author, bookTitle, tocTitle, uuid }),
  );
  zip.file(
    "OEBPS/content.opf",
    content_opf({ chapters, bookTitle, author, publisher, language, uuid }),
  );
  chapters.forEach((chapter, index) => {
    zip.file(
      `OEBPS/${index}.xhtml`,
      contentFile({ chapter, epubVersion, language }),
    );
  });

  return await zip.generateAsync({
    type: "uint8array",
    mimeType: "application/epub+zip",
  });
}
