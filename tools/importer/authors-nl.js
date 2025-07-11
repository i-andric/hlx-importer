// Configuration object for all CSS selectors used in the author importer
const CONFIG = {
  selectors: {
    // Author information selectors
    authorName: '.cbtitel',
    authorRole: '.cbtitel',
    authorImage: '.cbfoto img',
    authorEmail: '.cbicons',
    authorLinkedin: '.cbicons',
  },
  
  // Elements to remove
  removeSelectors: [
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
    '.copyright'
  ],
  
  // Elements to remove in generateDocumentPath
  removeSelectorsPath: [
    '.content__inner',
    '.sidebar',
    '.hs_cos_wrapper',
    '.page'
  ],
};

const getAuthorName = (document) => {
  const authorNameElement = document.querySelector(CONFIG.selectors.authorName);
  if (authorNameElement) {
    const fullName = authorNameElement.textContent;
    return fullName.split(',')[0].trim();
  }
  return '';
};

const getAuthorRole = (document) => {
  const authorRoleElement = document.querySelector(CONFIG.selectors.authorRole);
  if (authorRoleElement) {
    const fullText = authorRoleElement.innerHTML;
    const parts = fullText.split(',');
    return parts.length > 1 ? parts[1].trim() : '';
  }
  return '';
};

export default {
  preprocess: ({ document, url, html, params }) => {
    params.foundSomethingInPreprocessing = true;
  },
  transformDOM: ({ document, url, html, params }) => {

    const main = document.querySelector('body');

    WebImporter.DOMUtils.remove(main, CONFIG.removeSelectors);

    const authorName = getAuthorName(document);
    const authorRole = getAuthorRole(document);
    
    const authorImage = document.querySelector(CONFIG.selectors.authorImage);
    
    
    let authorEmail = '';
    let authorLinkedin = '';
    
    const cbIcons = document.querySelector(CONFIG.selectors.authorEmail);
    if (cbIcons) {
      const iconImages = cbIcons.querySelectorAll('img');
      iconImages.forEach(img => {
        const imgSrc = img.src.toLowerCase();
        if (imgSrc.includes('linkedin')) {
          // Find the parent anchor tag for LinkedIn
          const linkedinLink = img.closest('a');
          if (linkedinLink) {
            authorLinkedin = linkedinLink.getAttribute('href') || '';
          }
        } else if (imgSrc.includes('email') || imgSrc.includes('mail')) {
          // Find the parent anchor tag for email
          const emailLink = img.closest('a');
          if (emailLink) {
            authorEmail = emailLink.getAttribute('href') || '';
          }
        }
      });
    }

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

    const author = getAuthorName(document);
    console.log('author', author);

    WebImporter.DOMUtils.remove(document, CONFIG.removeSelectorsPath);

    let newUrl = new URL(url);
    newUrl.pathname = `/author/${author}`;
    
    const p = newUrl.pathname.replace(/\/$/, '').replace(/\.html$/, '');


    if (p.endsWith('/')) {
      p = `${p}index`;
    }
    return decodeURIComponent(p)
      .replace(/\.html$/, '')
      .trim();
  },
};
