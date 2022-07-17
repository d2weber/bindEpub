import { Component, h, Helmet, renderSSR } from "nano_jsx";
import type { Chapter, Options } from "../mod.ts";

type Args =
  & { chapters: Chapter[] }
  & Pick<Options, "bookTitle" | "tocTitle" | "author" | "uuid">;

export default ({ ...args }: Args) => {
  const { body, head, footer, attributes } = Helmet.SSR(
    renderSSR(<App {...args} />),
  );
  return '<?xml version="1.0" encoding="UTF-8"?>' + body;
};

class App extends Component<Args> {
  render() {
    return (
      <ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
        <head>
          <meta name="dtb:uid" content={this.props.uuid} />
          <meta name="dtb:generator" content="epub-gen" />
          <meta name="dtb:depth" content="1" />
          <meta name="dtb:totalPageCount" content="0" />
          <meta name="dtb:maxPageNumber" content="0" />
        </head>
        <docTitle>
          <text>{this.props.bookTitle}</text>
        </docTitle>
        <docAuthor>
          <text>{this.props.author}</text>
        </docAuthor>
        <navMap>
          <navPoint id="toc" playOrder="0" class="chapter">
            <navLabel>
              <text>{this.props.tocTitle}</text>
            </navLabel>
            <content src="toc.xhtml" />
          </navPoint>
          {this.props.chapters.map((e, index) => {
            return (
              <navPoint
                id={"content_" + index}
                playOrder={1 + index}
                class="chapter"
              >
                <navLabel>
                  <text>
                    {(1 + index) + ". " + (e.title)}
                  </text>
                </navLabel>
                <content src={index + ".xhtml"} />
              </navPoint>
            );
          })}
        </navMap>
      </ncx>
    );
  }
}
