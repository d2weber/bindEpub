import { Component, h, Helmet, renderSSR } from "nano_jsx";
import type { Chapter, Options } from "../mod.ts";

type Args =
  & { chapters: Chapter[] }
  & Pick<Options, "bookTitle" | "tocTitle" | "language">;

export default ({ ...args }: Args) => {
  const { body } = Helmet.SSR(
    renderSSR(
      <App {...args} />,
    ),
  );
  return `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE html>` + body;
};

class App extends Component<Args> {
  render() {
    return (
      <html
        xmlns="http://www.w3.org/1999/xhtml"
        xmlns:epub="http://www.idpf.org/2007/ops"
        xml:lang={this.props.language}
        lang={this.props.language}
      >
        <head>
          <title>{this.props.bookTitle}</title>
          <meta charset="UTF-8" />
          <link rel="stylesheet" type="text/css" href="style.css" />
        </head>
        <body>
          <h1 class="h1">{this.props.tocTitle}</h1>
          <nav id="toc" epub:type="toc">
            <ol>
              {this.props.chapters.map((e, index) => {
                return (
                  <li class="table-of-content">
                    <a href={index + ".xhtml"}>{e.title}</a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </body>
      </html>
    );
  }
}
