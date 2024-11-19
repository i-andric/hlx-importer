export default {
  preprocess: ({ document, url, html, params }) => {
    params.foundSomethingInPreprocessing = true;
  },
  transformDOM: ({ document, url, html, params }) => {

    const main = document.querySelector('main');

    WebImporter.DOMUtils.remove(main, [
      'header',
      '.header',
      'nav',
      '.nav',
      'footer',
      '.footer',
      'noscript',
      '.titleitem__readminutes',
      '.socialbar--shariff',
      '.blog_comments_section',
    ]);

    const authorName = document.querySelector('.author__name') ? document.querySelector('.author__name').innerHTML : '';
    const authorRole = document.querySelector('.author__position');
    const authorImage = document.querySelector('.author__image');
    const authorEmail = document.querySelector('.author__email') ? document.querySelector('.author__email').innerHTML : '';
    const authorLinkedin = document.querySelector('.author__social--linkedin') ? document.querySelector('.author__social--linkedin').getAttribute('href') : '';

    const authorDetail = [
      ['Metadata'],
      ['Author', authorName],
      ['Position', authorRole],
      ['Image', authorImage],
      ['E-mail', authorEmail],
      ['Linkedin', authorLinkedin],
    ];
    const authorTable = WebImporter.DOMUtils.createTable(
      authorDetail,
      document
    );

    main.prepend(authorTable);

    return main;
  },
  /**
   * Return a path that describes the document being transformed (file name, nesting...).
   * The path is then used to create the corresponding Word document.
   * @param {HTMLDocument} document The document
   * @param {string} url The url of the page imported
   * @param {string} html The raw html (the document is cleaned up during preprocessing)
   * @param {object} params Object containing some parameters given by the import process.
   * @return {string} The path
   */
  generateDocumentPath: ({
    // eslint-disable-next-line no-unused-vars
    document,
    url,
    html,
    params,
  }) => {
  
    const author = document.querySelector('.author__name').innerHTML;

    WebImporter.DOMUtils.remove(document, [
      '.content__inner',
      '.sidebar',
      '.hs_cos_wrapper'
    ]);

    let newUrl = new URL(url);
    newUrl.pathname = `/author/${author}`;
    
    const p = newUrl.pathname.replace(/\/$/, '').replace(/\.html$/, '');


    if (p.endsWith('/')) {
      p = `${p}index`;
    }
    return decodeURIComponent(p)
      .toLowerCase()
      .replace(/\.html$/, '')
      .replace(/[^a-z0-9/]/gm, '-');
  },
};
