// For normalization of the relative links include the langauge below with slashes
const langVariation = '/nl/';

// Then add here topics from the current (live) website
const menuTopics = ['tips', 'trends', 'projecten'];

// Next change this message to the one from the live website according to the language
// Find the article which has youtube video and check the message (when cookies not accepted)
// Sometimes this message could be seen on homepage if any youtube videos-just reject the cookies
const youtubeMessage =
  'Vous devez autoriser les cookies fonctionnels pour afficher cette vidéo.';

// Configuration object for all CSS selectors and classes used in the importer
const CONFIG = {
  // Content selectors
  selectors: {
    // Main content
    main: 'body',

    // Title and headings
    title: 'h1',
    h2: 'h2',
    h3: 'h3',

    // Hero and featured content
    heroImage: '.herod',

    // Metadata
    author: '.bidpubl a',
    description: '[name="description"]',
    date: '.titleitem__date',

    // Tags and categories
    tagsWrapper: '.bidonderwerpen',
    tagsLink: 'a',

    // Content blocks
    teaserText: '.bidtekstintro',

    // Iframe and embed selectors
    iframeWrappers: {
      embed: '.hs-embed-wrapper',
      video: '.hs-video-wrapper',
      hubspot: '.hs-cta-embed__loaded',
    },

    // Images
    linkedImages: 'a > img',

    // Links
    links: 'a',
  },

  // Elements to remove
  removeSelectors: [
    '.header',
    'nav',
    'noscript',
    '.bidleestijd',
    '.bidpubl',
    '.boxes',
    '.copyright',
    '.footer',
    '.bidonderwerpen',
    '.cntcrumbs'
  ],

  // Iframe processing configuration
  iframeConfig: {
    // Regular embeds (converted to tables)
    embeds: {
      wrapperSelectors: ['.hs-embed-wrapper', '.hs-video-wrapper'],
      iframeAttributes: ['src', 'data-src', 'data-hsv-src'],
      embedType: 'Embed',
    },
    // HubSpot embeds (converted to images)
    hubspotEmbeds: {
      wrapperSelectors: ['.hs-cta-embed__loaded'],
      iframeAttributes: ['src'],
      processAsImage: true,
      imageHost: 'https://www.eplanexperience.nl',
    },
  },

  // URL and path configuration
  urls: {
    baseUrl: 'https://main--eplan-blog-eds--comwrap.hlx.page',
    blogPath: '/blog',
    proxyHost: 'http://localhost:3001',
  },

  // Table of contents configuration
  toc: {
    anchorPrefix: 'toc',
    tableLabel: 'TOC',
  },

  // Content blocks configuration
  blocks: {
    teaserText: {
      label: 'teasertext',
    },
  },
};

let changedLinks = [];

// This below is if it is needed to change the category name - sometimes clients asks for a different name
// This was added when migrating BE-NL website
const topicMappings = {
  // If categories were about to change, we could use this mapping to change them
  default: {
    tips: 'software',
    trends: 'trends',
    klantverhalen: 'projecten',
  },
  // If some of the urls are uncategorized, later we can add them here to map them to a right category
  urls: {
  },
};

const mapTopic = (topic, url) => {
  // First check if there's a specific URL mapping
  if (url && topicMappings.urls[url]) {
    return topicMappings.urls[url];
  }

  // Then check default topic mappings
  if (topicMappings.default[topic]) {
    return topicMappings.default[topic];
  }

  // Return original topic if no mapping found
  return topic;
};

const normalizeSpecialChars = (str) => {
  return str
    .normalize('NFD') // Decompose characters into base letters and diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .toLowerCase();
};

const normalizeDocLink = (href) => {
  if (!href) return ''; // Handle empty or invalid input

  return decodeURIComponent(href)
    .normalize('NFD') // Decompose characters into base letters and diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .replace(/[^a-zA-Z0-9\-./:]/g, '') // Remove special characters except allowed ones
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .toLowerCase(); // Convert to lowercase for consistency
};

const normalizeLink = (href) => {
  if (!href) return ''; // Handle empty or invalid input

  // Handle links with language variation
  if (href.startsWith(langVariation)) {
    // Remove query parameters by taking everything before '?'
    const basePath = href.split('?')[0];
    const pathWithoutLangVariation = basePath.substring(4);

    // Decode URL-encoded characters first, then normalize
    const decodedPath = decodeURIComponent(pathWithoutLangVariation);
    const normalizedPath = normalizeSpecialChars(decodedPath);

    // Try to find a matching article in the list
    // const matchingArticle = listofCurrentArticleLinks.find((matchingLink) => {
    //   // Decode and normalize the matching link as well
    //   const decodedMatchingLink = decodeURIComponent(matchingLink);
    //   const normalizedLink = normalizeSpecialChars(decodedMatchingLink);
    //   return normalizedLink.includes(normalizedPath);
    // });

    if (matchingArticle) {
      // Track the change only if we found a match
      changedLinks.push({
        original: href,
        normalized: matchingArticle,
      });
      return matchingArticle;
    }
  }

  try {
    // Try to parse the URL to detect if it's a complex URL with query parameters
    const url = new URL(href);

    // Only remove query parameters for internal links
    if (
      url.hostname === 'www.eplanexperience.nl' ||
      url.hostname === 'localhost:3001'
    ) {
      if (url.search || url.hash) {
        return href.split('?')[0];
      }
    }
    // For external URLs (like YouTube), keep the full URL with query parameters
    return href;
  } catch (e) {
    // If URL parsing fails, proceed with normalization
  }

  // For simple URLs, apply normalization
  return decodeURIComponent(href)
    .normalize('NFD') // Decompose characters into base letters and diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .replace(/[^a-zA-Z0-9\-./:]/g, '') // Remove special characters except allowed ones
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .toLowerCase(); // Convert to lowercase for consistency
};

const makeProxySrcs = (main, host) => {
  const images = main.querySelectorAll('img');
  if (images) {
    images.forEach((img) => {
      if (img.src.startsWith('/')) {
        // make absolute
        const cu = new URL(host);
        img.src = `${cu.origin}${img.src}`;
      }

      const u = new URL(img.src);

      try {
        const u = new URL(img.src);
        if (u.origin != CONFIG.urls.proxyHost) {
          u.searchParams.append('host', u.origin);
          img.src = `${CONFIG.urls.proxyHost}${u.pathname}${u.search}`;
        } else {
          img.src = `${CONFIG.urls.proxyHost}${u.pathname}`;
        }
      } catch (error) {
        console.warn(
          `Unable to make proxy src for ${img.src}: ${error.message}`
        );
      }
    });
  }
};

// Function to traverse all text nodes and replace "EPLAN" with "Eplan"
// This was added with ticket: EPL-1049
const replaceAllEplanStrings = (main) => {
  const walker = document.createTreeWalker(
    main,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeValue.includes('EPLAN')) {
      node.nodeValue = node.nodeValue.replace(/EPLAN/g, 'Eplan');
    }
  }
};

const transformLinks = (main) => {
  const links = main.querySelectorAll(CONFIG.selectors.links);
  if (links) {
    links.forEach((articleLink) => {
      const href = articleLink.getAttribute('href');
      if (href) {
        try {
          // Normalize the href link
          const normalizedHref = normalizeLink(href);
          articleLink.setAttribute('href', normalizedHref);
        } catch (error) {
          console.warn(`Unable to normalize link: ${href} - ${error.message}`);
        }
      }
    });
  }
};

const removeTables = (main) => {
  const tables = main.querySelectorAll('table');
  if (tables) {
    const tablesArray = Array.from(tables);
    tablesArray.forEach((table) => {
      unwrapTableElements(table);
    });
  }
};

const unwrapTableElements = (table) => {
  const tbodyElements = table.querySelectorAll('tbody');
  if (tbodyElements) {
    tbodyElements.forEach(function (tbody) {
      unwrapElement(tbody);
    });
  }
  const thElements = table.querySelectorAll('th');
  if (thElements) {
    thElements.forEach(function (th) {
      unwrapElement(th);
    });
  }
  const tdElements = table.querySelectorAll('td');
  if (tdElements) {
    tdElements.forEach(function (td) {
      unwrapElement(td);
    });
  }
  unwrapElement(table);
};

const unwrapElement = (element) => {
  const parent = element.parentNode;
  const tempDiv = document.createElement('div');
  while (element.firstChild) {
    tempDiv.appendChild(element.firstChild);
  }
  parent.replaceChild(tempDiv, element);
};

const convertH3ToH2 = (main) => {
  const h3Elements = main.querySelectorAll(CONFIG.selectors.h3);

  // Loop through each h3 element and change its tag to h2
  // This is to help the TOC has content
  if (h3Elements) {
    h3Elements.forEach((h3) => {
      // Change the tag name to h2
      h3.outerHTML = h3.outerHTML
        .replace(/<h3/g, '<h2')
        .replace(/<\/h3>/g, '</h2>');
    });
  }
};

const createTableOfContents = (main, document) => {
  const h2Elements = document.querySelectorAll(CONFIG.selectors.h2);

  if (h2Elements) {
    var documentRef = documentRef || document;
    const toc = documentRef.createElement('div');
    const headings = [].slice.call(main.querySelectorAll(CONFIG.selectors.h2));
    if (headings) {
      headings.forEach(function (heading, index) {
        let anchor = documentRef.createElement('a');
        anchor.setAttribute('name', CONFIG.toc.anchorPrefix + index);
        anchor.setAttribute('id', CONFIG.toc.anchorPrefix + index);

        let link = documentRef.createElement('a');
        link.setAttribute('href', '#' + CONFIG.toc.anchorPrefix + index);
        link.textContent = heading.textContent;

        let div = documentRef.createElement('div');

        // If you want to fill in TOC with h2s then uncomment bellow lines - this was legacy
        // div.setAttribute('class', heading.tagName.toLowerCase());
        // div.appendChild(link);

        toc.appendChild(div);
        heading.parentNode.insertBefore(anchor, heading);
      });
    }
    const tocCells = [[CONFIG.toc.tableLabel], [toc]];
    const tocTable = WebImporter.DOMUtils.createTable(tocCells, document);
    if (tocTable) {
      main.prepend(tocTable);
    }
  }
};

const processIframes = (main, document, options = {}) => {
  const {
    wrapperSelectors = [
      '.hs-embed-wrapper',
      '.hs-video-wrapper',
      '.hs-cta-embed__loaded',
    ],
    iframeAttributes = ['src', 'data-src', 'data-hsv-src'],
    embedType = 'Embed',
    processAsImage = false,
    imageHost = 'https://www.eplanexperience.nl',
  } = options;

  wrapperSelectors.forEach((selector) => {
    const wrappers = main.querySelectorAll(selector);
    if (wrappers) {
      wrappers.forEach((wrapper) => {
        const iframes = wrapper.querySelectorAll('iframe');
        if (iframes) {
          iframes.forEach((iframe) => {
            if (iframe) {
              let iframeSrc = null;

              // Try to get iframe source from various attributes
              for (const attr of iframeAttributes) {
                iframeSrc = iframe.getAttribute(attr);
                if (iframeSrc) break;
              }

              if (iframeSrc) {
                if (processAsImage) {
                  // Process as image (for hubspot embeds)
                  processIframeAsImage(iframe, iframeSrc, imageHost);
                } else {
                  // Process as embed table
                  const embCells = [[embedType], [iframeSrc]];
                  const embTable = WebImporter.DOMUtils.createTable(
                    embCells,
                    document
                  );
                  iframe.replaceWith(embTable);
                }
              }
            }
          });
        }
      });
    }
  });
};

const processIframeAsImage = (iframe, iframeSrc, imageHost) => {
  console.log('IFRAME', iframe);
  const iframeImage = document.createElement('img');
  
  try {
    const u = new URL(iframeSrc);
    const originalHost = u.hostname.includes('hs-sites.com')
      ? u.origin
      : imageHost;
    u.searchParams.set('host', originalHost);

    const imageUrl = `${CONFIG.urls.proxyHost}${u.pathname}${u.search}`;
    console.log('Fetching image from:', imageUrl);

    // Fetch image and convert to Base64
    fetch(imageUrl, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.blob();
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          iframeImage.setAttribute('src', reader.result);
          iframeImage.setAttribute('alt', 'Embedded Content');
          iframeImage.style.maxWidth = '100%'; // Ensure proper scaling

          // Ensure it's not wrapped in a link
          const parent = iframe.parentElement;
          if (parent.tagName === 'A') {
            parent.replaceWith(iframeImage);
          } else {
            iframe.replaceWith(iframeImage);
          }
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.warn(`Failed to load image: ${error.message}`);
      });
  } catch (error) {
    console.warn(`Unable to process iframe ${iframeSrc}: ${error.message}`);
  }
};

const processHeroImage = (main, title) => {
  const heroImage = main.querySelector(CONFIG.selectors.heroImage);
  if (heroImage) {
    let backgroundImage = heroImage.style.backgroundImage;

    if (!backgroundImage || backgroundImage === 'none') {
      const computedStyle = window.getComputedStyle(heroImage);
      backgroundImage = computedStyle.backgroundImage;
    }

    if (backgroundImage && backgroundImage !== 'none') {
      const div = document.createElement('div');
      const img = document.createElement('img');
      div.appendChild(img);

      const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (urlMatch && urlMatch[1]) {
        img.src = urlMatch[1];
        img.alt = 'Hero Image';
        makeProxySrcs(div, img.src);
      }
      title.prepend(img);
    }
  }
};

const processLinkedImages = (main) => {
  const linkedImages = main.querySelectorAll(CONFIG.selectors.linkedImages);
  if (linkedImages) {
    linkedImages.forEach((img) => {
      const link = img.parentElement;
      if (link.tagName === 'A') {
        const imageSrc = img.getAttribute('src');
        const imageAlt = img.getAttribute('alt') || '';
        const linkHref = link.getAttribute('href');
        const newParagraph = document.createElement('p');

        const newImage = document.createElement('img');
        newImage.setAttribute('src', imageSrc);
        newImage.setAttribute('alt', imageAlt);

        const newLink = document.createElement('a');
        newLink.setAttribute('href', linkHref);
        newLink.textContent = imageAlt || linkHref;

        newParagraph.append(newImage);
        newParagraph.append(newLink);

        makeProxySrcs(newParagraph, imageSrc);

        link.replaceWith(newParagraph);
      }
    });
  }
};

const removeImageWrappers = (main) => {
  const images = main.querySelectorAll('img');
  if (images) {
    images.forEach((img) => {
      const parent = img.parentElement;
      if (parent && parent.tagName === 'A' && parent.classList.contains('fancybox')) {
        // Remove the anchor tag but keep the image
        parent.replaceWith(img);
      }
    });
  }
};

const processTeaserText = (main, document) => {
  const teaserText = main.querySelector(CONFIG.selectors.teaserText);
  if (teaserText) {
    // Instead of just getting textContent, get the HTML content to preserve formatting
    const teaserContent = teaserText.innerHTML.trim();
    if (teaserContent) {
      // Create a temporary div to handle HTML content properly
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = teaserContent;

      const finalTeaserContent = tempDiv.textContent.trim();
      const teaserCells = [
        [CONFIG.blocks.teaserText.label],
        [finalTeaserContent],
      ];
      const teaserTable = WebImporter.DOMUtils.createTable(
        teaserCells,
        document
      );

      // Find the TOC table
      const tocTable = main.querySelector('table');
      if (tocTable) {
        // Insert teaser table after TOC
        tocTable.after(teaserTable);
      } else {
        // If no TOC exists, insert after title as fallback
        const title = main.querySelector(CONFIG.selectors.title);
        if (title) {
          title.after(teaserTable);
        } else {
          main.prepend(teaserTable);
        }
      }
      // Remove the original teaser element
      teaserText.remove();
    }
  }
};

const processTopicAndTags = (main) => {
  // Because live websites doesn't have categories but tags - we are taking tags and trying to find the category
  // If category not there in import excel file then it will be Uncategorized - those need to be raised with the client
  let topic = '';
  const breadcrumbs = main.querySelector('.cntcrumbs');
  topic = breadcrumbs.innerHTML;
  topic = breadcrumbs.children[0].children[1].textContent;
  // make it lowercase and remove spaces and special characters
  topic = topic.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  // let topicFromTag = '';
  // let tagsFinal = '';

  // const tagsWrapper = main.querySelector(CONFIG.selectors.tagsWrapper);
  // if (tagsWrapper) {
  //   const tags = tagsWrapper.querySelectorAll(CONFIG.selectors.tagsLink);
  //   if (tags) {
  //     const tagsArray = [];
  //     tags.forEach((tag) => {
  //       const tagName = tag.innerHTML.toLowerCase();
  //       tagsArray.push(tagName);
  //     });
  //     let topicString = tagsArray.toString();

  //     let nonePresent = tagsArray.every((str) => {
  //       if (!menuTopics.includes(str)) {
  //         return true;
  //       }
  //       topicFromTag = str;
  //       return false;
  //     });

  //     if (nonePresent) {
  //       topic = 'Uncategorized';
  //       tagsFinal = topicString;
  //     } else {
  //       topic = topicFromTag;
  //       tagsFinal = topicString;
  //     }
  //   }
  // }

  return { topic };
};

const removeDuplicateTags = (tagsArray) => {
  // Remove duplicates while preserving order
  const uniqueTags = [];
  const seen = new Set();
  
  tagsArray.forEach(tag => {
    const normalizedTag = tag.toLowerCase().trim();
    if (!seen.has(normalizedTag)) {
      seen.add(normalizedTag);
      uniqueTags.push(tag);
    }
  });
  
  return uniqueTags;
};

const createMetadataBlock = (main, document, topic, url) => {
  const meta = {};

  // Set meta description
  const desc = document.querySelector(CONFIG.selectors.description);
  if (desc) {
    meta.Description = desc.content;
  }

  // Set meta date
  const date = document.querySelector(CONFIG.selectors.date);
  if (date) {
    const [day, month, year] = date.innerHTML.split('/');
    const newDate = `${month}/${day}/${year}`;
    meta.Date = newDate;
  }

  // Set meta author
  // get author from .bidpubl inside of a tag before first comma
  const author = document.querySelector(CONFIG.selectors.author);
  if (author) {
    const authorContent = author.innerHTML;
    const authorName = authorContent.split(',')[0];
    console.log('authorName', authorName);
    meta.Author = authorName;
  }

  // Map the topic using the same logic as mapTopic function
  const mappedTopic = mapTopic(topic, url);

  // Taking all tags shown on the page and putting them in the meta
  const tagsWrapper = main.querySelector(CONFIG.selectors.tagsWrapper);
  const tagsArray = [mappedTopic]; // Always start with mapped topic
  
  if (tagsWrapper) {
    const tags = tagsWrapper.querySelectorAll(CONFIG.selectors.tagsLink);
    if (tags) {
      tags.forEach((tag) => {
        const tagName = tag.innerHTML.toLowerCase();
        tagsArray.push(tagName);
      });
    }
  }
  
  // Remove duplicate tags
  const uniqueTags = removeDuplicateTags(tagsArray);
  
  // Ensure we always have at least the topic as a tag
  if (uniqueTags.length === 0 || (uniqueTags.length === 1 && uniqueTags[0] === '')) {
    meta.Tags = mappedTopic || 'uncategorized';
  } else {
    meta.Tags = uniqueTags.join(', ');
  }

  // Render meta table
  const block = WebImporter.Blocks.getMetadataBlock(document, meta);

  main.append(block);

  return meta;
};

export default {
  preprocess: ({ document, url, html, params }) => {
    params.foundSomethingInPreprocessing = true;
  },
  transform: ({ document, params }) => {
    // Reset changedLinks array at the start of each article - this is only for import excel file
    changedLinks = [];

    const main = document.querySelector(CONFIG.selectors.main);

    // WebImporter.DOMUtils.remove(main, CONFIG.removeSelectors);

    // Remove tables from the content
    removeTables(main);

    // Convert h3 elements to h2 for TOC
    convertH3ToH2(main);

    // Create table of contents
    createTableOfContents(main, document);

    const title = document.querySelector(CONFIG.selectors.title);

    // Adding the line break and the title to separate them
    if (title) {
      main.prepend('--- ');
      main.prepend(title);
    }

    // Adding the hero image before the title
    processHeroImage(main, title);

    // Process iframes as embeds
    processIframes(main, document, CONFIG.iframeConfig.embeds);

    // Process hubspot embeds as images
    // processIframes(main, document, CONFIG.iframeConfig.hubspotEmbeds);

    // Add handling for linked images
    // processLinkedImages(main);
    // DISABLED because it is having lightbox gallery which is not supported by new blog

    // Remove anchor tags that wrap images
    removeImageWrappers(main);

    // Convert teaser text to block
    processTeaserText(main, document);

    let { topic } = processTopicAndTags(main);

    let p = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html$/, '');
    p = normalizeDocLink(p);

    createMetadataBlock(main, document, topic, p);

    WebImporter.DOMUtils.remove(document, CONFIG.removeSelectors);

    // Remove unwanted text - cookie/youtube warning because it is copying it as text
    const elementWithText = Array.from(document.querySelectorAll('*')).find(
      (el) => el.textContent.trim() === youtubeMessage
    );

    if (elementWithText) {
      elementWithText.remove();
    }

    // Replace all "EPLAN" with "Eplan"
    replaceAllEplanStrings(main);

    // !!!
    // Apply change of the category, only if REQUESTED by the client
    // !!!
    topic = mapTopic(topic, p);

    const topicWithDashes = topic.trim().replace(/\s+/g, '-');
    const articlePath = `${topicWithDashes}${p}`;

    if (topic != '') {
      p = `/${topic}/${p}`;
    } else {
      p = `/uncategorized/${p}`;
    }

    if (p.endsWith('/')) {
      p = `${p}index`;
    }

    transformLinks(main);

    const newUrl = `${CONFIG.urls.baseUrl}${CONFIG.urls.blogPath}/${articlePath}`;

    // Below is the list what is going to be shown in the Excel report, you can add more if you need
    return [
      {
        element: main,
        path: p,
        report: {
          newUrl: newUrl,
          currentCategory: topic,
          changedLinks: changedLinks.length > 0 ? changedLinks : undefined,
        },
      },
    ];
  },
};
