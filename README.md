# bindEpub

Create epub files with Deno. This is a project I created for learning purposes
and there are many issues with the resulting epub file. See [tests](mod_test.ts)
for example usage. It is heavily inspired by
[epubGen](https://github.com/cyrilis/epub-gen). The implementation refrains from
writing temporary files.

### Known issues

- Uses the nano-jsx library for xml-templating purposes, that's unfortunate
- Throws when running due to jsx namespace problem. (Tests seem to work though.)
- Produces invalid .opf file: templating is constrained to the html specification,
  where `<meta>` tags are null elements
- EPUB2 templates are missing
