import { Component, h, Helmet, renderSSR } from "nano_jsx";
import type { Chapter, Options } from "../mod.ts";

type Args =
  & { chapters: Chapter[] }
  & Pick<Options, "bookTitle" | "author" | "publisher" | "language" | "uuid">;

export default ({ ...args }: Args) => {
  const { body } = Helmet.SSR(
    renderSSR(<App {...args} />),
  );
  return body;
};

class App extends Component<Args> {
  render() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const stringDate = "" + year + "-" + month + "-" + day;
    return (
      <package
        xmlns="http://www.idpf.org/2007/opf"
        version="3.0"
        unique-identifier="BookId"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:dcterms="http://purl.org/dc/terms/"
        xml:lang="en"
        xmlns:media="http://www.idpf.org/epub/vocab/overlays/#"
        prefix="ibooks: http://vocabulary.itunes.apple.com/rdf/ibooks/vocabulary-extensions-1.0/"
      >
        <metadata
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:opf="http://www.idpf.org/2007/opf"
        >
          <dc:identifier id="BookId">{this.props.uuid}</dc:identifier>
          <meta
            refines="#BookId"
            property="identifier-type"
            scheme="onix:codelist5"
          >
            22
          </meta>
          <meta property="dcterms:identifier" id="meta-identifier">BookId</meta>
          <dc:title>{this.props.bookTitle}</dc:title>
          <meta property="dcterms:title" id="meta-title">
            {this.props.bookTitle}
          </meta>
          <dc:language>{this.props.language}</dc:language>
          <meta property="dcterms:language" id="meta-language">
            {this.props.language}
          </meta>
          <meta property="dcterms:modified">
            {date.toISOString().split(".")[0] + "Z"}
          </meta>
          <dc:creator id="creator">{this.props.author}</dc:creator>
          <meta refines="#creator" property="file-as">{this.props.author}</meta>
          <meta property="dcterms:publisher">{this.props.publisher}</meta>
          <dc:publisher>{this.props.publisher}</dc:publisher>
          <meta property="dcterms:date">{stringDate}</meta>
          <dc:date>{stringDate}</dc:date>
          <meta property="dcterms:rights">All rights reserved</meta>
          <dc:rights>
            Copyright &#x00A9; {year} by {this.props.publisher}
          </dc:rights>
          <meta name="cover" content="image_cover" />
          <meta name="generator" content="epub-gen" />
          <meta property="ibooks:specified-fonts">true</meta>
        </metadata>

        <manifest>
          <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />
          <item
            id="toc"
            href="toc.xhtml"
            media-type="application/xhtml+xml"
            properties="nav"
          />
          <item id="css" href="style.css" media-type="text/css" />

          {this.props.chapters.map((e: Chapter, index: number) => {
            return (
              <item
                id={"content_" + index}
                href={index + ".xhtml"}
                media-type="application/xhtml+xml"
              />
            );
          })}
        </manifest>

        <spine toc="ncx">
          <itemref idref="toc" />
          {this.props.chapters.map((e: Chapter, index: number) => {
            return <itemref idref={"content_" + index} />;
          })}
        </spine>
        <guide>
          <reference type="text" title="Table of Content" href="toc.xhtml" />
        </guide>
      </package>
    );
  }
}
