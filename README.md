# bindEpub

Create epub files with Deno. This is a project I created for learning purposes
and there are many issues with the resulting epub file. See [tests](mod_test.ts)
for example usage. It is heavily inspired by
[epubGen](https://github.com/cyrilis/epub-gen). The implementation refrains from
writing temporary files.

### Issues

- Throws when running due to jsx namespace problem. (Tests seem to work though.)
- Produces invalid .opf file, due to the use of nano-jsx for xml-templating.
  It's constrained to the html specification, where `<meta>` tags are null
  elements.
- EPUB2 templates are missing
