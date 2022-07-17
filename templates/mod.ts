import type { Chapter, Options } from "../mod.ts";
export { default as toc_xhtml } from "./toc.xhtml.tsx";
export { default as toc_ncx } from "./toc.ncx.tsx";
export { default as content_opf } from "./content.opf.tsx";

const doctypeAndHtml = (
  { epubVersion, language }: Pick<Options, "epubVersion" | "language">,
) =>
  epubVersion === 2
    ? `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="${language}">`
    : `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="${language}">`;

export function contentFile({ chapter, epubVersion, language }:
  & { chapter: Chapter }
  & Pick<Options, "epubVersion" | "language">) {
  return `<?xml version="1.0" encoding="UTF-8"?>
${doctypeAndHtml({ epubVersion, language })}
<head>
<meta charset="UTF-8" />
<title>${chapter.title}</title>
<link rel="stylesheet" type="text/css" href="style.css" />
</head>
<body>
<h1>${chapter.title}</h1>
${chapter.text}
</body>
</html>`;
}

export const containerFile = () =>
  `<?xml version="1.0" encoding="UTF-8" ?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>`;

export const styleFile = () =>
  `body { margin: 5%; text-align: justify; font-size: medium; }
code { font-family: monospace; }
h1 { text-align: left; }
h2 { text-align: left; }
h3 { text-align: left; }
h4 { text-align: left; }
h5 { text-align: left; }
h6 { text-align: left; }`;
