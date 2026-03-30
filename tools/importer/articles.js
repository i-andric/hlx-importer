// Blog options (lang, topics, article paths, etc.): Import UI → Blog Options → params
// articleLinkList: canonical paths on the live site for language-prefixed link resolution

let changedLinks = [];

// topicMappings from Import UI (Blog Options): built from plain lists → params.topicMappings
//   default: tag renames (import-topic-renames), urls: path → topic (import-topic-by-path)
// params.assignedTopic: URL line forces category + single tag (overrides path-based urls map)

const mapTopic = (topic, urlPath, topicMappings, options) => {
  const def = (topicMappings && topicMappings.default) || {};
  const urls = (topicMappings && topicMappings.urls) || {};
  const skipPath = options && options.skipPathOverride;

  if (!skipPath && urlPath && urls[urlPath]) {
    return urls[urlPath];
  }

  if (def[topic]) {
    return def[topic];
  }

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

const normalizeLink = (href, langVariation, articleLinkList) => {
  if (!href) return ''; // Handle empty or invalid input
  const langPrefix = langVariation && typeof langVariation === 'string' ? langVariation : '';
  const linkList = Array.isArray(articleLinkList) ? articleLinkList : [];

  // Handle links with language variation
  if (langPrefix && href.startsWith(langPrefix)) {
    // Remove query parameters by taking everything before '?'
    const basePath = href.split('?')[0];
    const pathWithoutLangVariation = basePath.substring(langPrefix.length);

    // Decode URL-encoded characters first, then normalize
    const decodedPath = decodeURIComponent(pathWithoutLangVariation);
    const normalizedPath = normalizeSpecialChars(decodedPath);

    // Try to find a matching article in the list
    const matchingArticle = linkList.find((matchingLink) => {
      // Decode and normalize the matching link as well
      const decodedMatchingLink = decodeURIComponent(matchingLink);
      const normalizedLink = normalizeSpecialChars(decodedMatchingLink);
      return normalizedLink.includes(normalizedPath);
    });

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
    if (url.hostname === 'es.eplan.blog' || url.hostname === 'localhost:3001') {
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
  main.querySelectorAll('img').forEach((img) => {
    if (img.src.startsWith('/')) {
      // make absolute
      const cu = new URL(host);
      img.src = `${cu.origin}${img.src}`;
    }

    const u = new URL(img.src);

    try {
      const u = new URL(img.src);
      if (u.origin != 'http://localhost:3001') {
        u.searchParams.append('host', u.origin);
        img.src = `http://localhost:3001${u.pathname}${u.search}`;
      } else {
        img.src = `http://localhost:3001${u.pathname}`;
      }
    } catch (error) {
      console.warn(`Unable to make proxy src for ${img.src}: ${error.message}`);
    }
  });
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

const transformLinks = (main, langVariation, articleLinkList) => {
  main.querySelectorAll('a').forEach((articleLink) => {
    const href = articleLink.getAttribute('href');
    if (href) {
      try {
        // Normalize the href link
        const normalizedHref = normalizeLink(href, langVariation, articleLinkList);
        articleLink.setAttribute('href', normalizedHref);
      } catch (error) {
        console.warn(`Unable to normalize link: ${href} - ${error.message}`);
      }
    }
  });
};

const createMetadataBlock = (main, document, options = {}) => {
  const meta = {};

  // Set meta description
  const desc = document.querySelector('[property="og:description"]');
  if (desc) {
    meta.Description = desc.content;
  }

  // Set meta date
  const date = document.querySelector('.titleitem__date');
  if (date) {
    const [day, month, year] = date.innerHTML.split('/');
    const newDate = `${month}/${day}/${year}`;
    meta.Date = newDate;
  }

  // Set meta author
  const author = document.querySelector('[name="author"]');
  if (author) {
    meta.Author = author.content;
  }

  if (options.tagsOverride !== undefined) {
    if (options.tagsOverride !== '') {
      meta.Tags = options.tagsOverride;
    }
  } else {
    const tagsWrapper = main.querySelector('.tags');
    if (tagsWrapper) {
      const tags = tagsWrapper.querySelectorAll('.tags__link');
      if (tags) {
        const tagsArray = [];
        tags.forEach((tag) => {
          const tagName = tag.innerHTML.toLowerCase();
          tagsArray.push(tagName);
          meta.Tags = tagsArray.join(', ');
        });
      }
    }
  }

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

    const blogLangCountry = (params.blogLangCountry && String(params.blogLangCountry).trim()) || 'es-es';
    const langVariation = (params.langVariation && String(params.langVariation).trim()) || '/es/';
    const youtubeMessage = params.youtubeMessage && String(params.youtubeMessage).trim();
    const articleLinkList = Array.isArray(params.articleLinkList) ? params.articleLinkList : [];
    const topicMappings = (params.topicMappings && typeof params.topicMappings === 'object')
      ? params.topicMappings
      : { default: {}, urls: {} };

    const main = document.querySelector('main');

    WebImporter.DOMUtils.remove(main, [
      'header',
      '.header',
      'nav',
      '.nav',
      'footer',
      '.footer',
      'noscript',
      '.titleitem__author',
      '.titleitem__readminutes',
      '.socialbar--shariff',
      '.blog_comments_section',
      '.author',
    ]);

    // Remove tables from the content
    const tables = document.querySelectorAll('table');
    if (tables) {
      const tablesArray = Array.from(tables);
      tablesArray.forEach((table) => {
        unwrapTableElements(table);
      });
    }

    function unwrapTableElements(table) {
      const tbodyElements = table.querySelectorAll('tbody');
      tbodyElements.forEach(function (tbody) {
        unwrapElement(tbody);
      });
      const thElements = table.querySelectorAll('th');
      thElements.forEach(function (th) {
        unwrapElement(th);
      });
      const tdElements = table.querySelectorAll('td');
      tdElements.forEach(function (td) {
        unwrapElement(td);
      });
      unwrapElement(table);
    }

    function unwrapElement(element) {
      const parent = element.parentNode;
      const tempDiv = document.createElement('div');
      while (element.firstChild) {
        tempDiv.appendChild(element.firstChild);
      }
      parent.replaceChild(tempDiv, element);
    }

    const h3Elements = document.querySelectorAll('h3');

    // Loop through each h3 element and change its tag to h2
    // This is to help the TOC has content
    h3Elements.forEach((h3) => {
      // Change the tag name to h2
      h3.outerHTML = h3.outerHTML
        .replace(/<h3/g, '<h2')
        .replace(/<\/h3>/g, '</h2>');
    });

    const h2Elements = document.querySelectorAll('h2');

    if (h2Elements) {
      var documentRef = documentRef || document;
      const toc = documentRef.createElement('div');
      const headings = [].slice.call(main.querySelectorAll('h2'));
      headings.forEach(function (heading, index) {
        let anchor = documentRef.createElement('a');
        anchor.setAttribute('name', 'toc' + index);
        anchor.setAttribute('id', 'toc' + index);

        let link = documentRef.createElement('a');
        link.setAttribute('href', '#toc' + index);
        link.textContent = heading.textContent;

        let div = documentRef.createElement('div');

        // If you want to fill in TOC with h2s then uncomment bellow lines - this was legacy
        // div.setAttribute('class', heading.tagName.toLowerCase());
        // div.appendChild(link);

        toc.appendChild(div);
        heading.parentNode.insertBefore(anchor, heading);
      });

      const tocCells = [['TOC'], [toc]];
      const tocTable = WebImporter.DOMUtils.createTable(tocCells, document);
      main.prepend(tocTable);
    }

    const title = document.querySelector('h1');

    // Adding the line break and the title to separate them
    if (title) {
      main.prepend('--- ');
      main.prepend(title);
    }

    // Adding the hero image before the title
    const heroImage = document.querySelector('.teaserPost__imageDiv');
    if (heroImage) {
      title.prepend(heroImage);
    }

    // Add iframes as the block embed
    const embedWrappers = document.querySelectorAll('.hs-embed-wrapper');
    embedWrappers.forEach((embedWrapper) => {
      const iframes = embedWrapper.querySelectorAll('iframe');

      if (iframes) {
        iframes.forEach((iframe) => {
          // iframe.addAttribute("sandbox", "allow-scripts");
          if (iframe) {
            let iframeSrc = iframe.getAttribute('src');

            if (!iframeSrc) {
              iframeSrc = iframe.getAttribute('data-src');
            }

            if (iframeSrc) {
              const embCells = [['Embed'], [iframeSrc]];
              const embTable = WebImporter.DOMUtils.createTable(
                embCells,
                document
              );
              iframe.replaceWith(embTable);
            }
          }
        });
      }
    });

    // Get all videos
    const videos = document.querySelectorAll('.hs-video-wrapper');
    videos.forEach((video) => {
      const iframes = video.querySelectorAll('iframe');
      if (iframes) {
        iframes.forEach((iframe) => {
          if (iframe) {
            let iframeSrc = iframe.getAttribute('src');

            if (!iframeSrc) {
              iframeSrc = iframe.getAttribute('data-src');
              iframeSrc = iframe.getAttribute('data-hsv-src');
            }

            if (iframeSrc) {
              const embCells = [['Embed'], [iframeSrc]];
              const embTable = WebImporter.DOMUtils.createTable(
                embCells,
                document
              );
              iframe.replaceWith(embTable);
            }
          }
        });
      }
    });

    // Get all hubspot embeds
    const hubspotEmbeds = document.querySelectorAll('.hs-cta-embed__loaded');

    hubspotEmbeds.forEach((hubspotEmbed) => {
      const iframes = hubspotEmbed.querySelectorAll('iframe');

      iframes.forEach((iframe) => {
        if (iframe) {
          console.log('IFRAME', iframe);
          const iframeImage = document.createElement('img');
          const iframeSrc = iframe.src;
          try {
            const u = new URL(iframeSrc);
            const originalHost = u.hostname.includes('hs-sites.com')
              ? u.origin
              : 'https://blog.eplan.co.uk';
            u.searchParams.set('host', originalHost);

            const imageUrl = `http://localhost:3001${u.pathname}${u.search}`;
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
            console.warn(
              `Unable to process iframe ${iframeSrc}: ${error.message}`
            );
          }
        }
      });
    });

    // Add handling for linked images
    const linkedImages = main.querySelectorAll('a > img');
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

    // Convert teaser text to block
    const teaserText = main.querySelector(
      '#hs_cos_wrapper_blog_post_teaser_text'
    );
    if (teaserText) {
      // Instead of just getting textContent, get the HTML content to preserve formatting
      const teaserContent = teaserText.innerHTML.trim();
      if (teaserContent) {
        // Create a temporary div to handle HTML content properly
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = teaserContent;

        const finalTeaserContent = tempDiv.textContent.trim();
        const teaserCells = [['teasertext'], [finalTeaserContent]];
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
          const title = main.querySelector('h1');
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

    // menuTopics = import-topics. assignedTopic (URL line) → single tag in metadata.
    const menuTopics = Array.isArray(params.menuTopics) ? params.menuTopics : [];
    const assignedRaw = (params.assignedTopic && String(params.assignedTopic).trim()) || '';
    const assignedLower = assignedRaw.toLowerCase();

    let topic = '';
    let topicFromTag = '';
    let tagsFinal = '';
    let tagsOverride;

    const tagsWrapper = main.querySelector('.tags');
    const rawTags = [];
    if (tagsWrapper) {
      tagsWrapper.querySelectorAll('.tags__link').forEach((tag) => {
        rawTags.push(tag.innerHTML.toLowerCase());
      });
    }

    const tagsOnPageStr = rawTags.join(', ');

    if (assignedLower) {
      const canonical = menuTopics.find((m) => m.toLowerCase() === assignedLower);
      if (!canonical && menuTopics.length > 0) {
        console.warn(
          `[import] assigned topic "${assignedRaw}" is not in import-topics; using it as-is.`
        );
      }
      topic = canonical || assignedLower;
      tagsFinal = tagsOnPageStr;
      tagsOverride = topic;
    } else if (rawTags.length) {
      const nonePresent = rawTags.every((str) => {
        if (!menuTopics.includes(str)) {
          return true;
        }
        topicFromTag = str;
        return false;
      });

      if (nonePresent) {
        topic = 'Uncategorized';
        tagsFinal = tagsOnPageStr;
      } else {
        topic = topicFromTag;
        tagsFinal = tagsOnPageStr;
      }
      tagsOverride = rawTags.join(', ');
    }

    createMetadataBlock(main, document, { tagsOverride });

    WebImporter.DOMUtils.remove(document, [
      '.tags',
      '.titleitem__date',
      '.pillar_page_module',
    ]);

    // Remove cookie / YouTube consent text when it matches (exact string from live site)
    if (youtubeMessage) {
      const elementWithText = Array.from(document.querySelectorAll('*')).find(
        (el) => el.textContent.trim() === youtubeMessage
      );
      if (elementWithText) {
        elementWithText.remove();
      }
    }

    // Replace all "EPLAN" with "Eplan"
    replaceAllEplanStrings(main);

    let p = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html$/, '');
    p = normalizeDocLink(p);

    // !!!
    // Apply change of the category, only if REQUESTED by the client
    // !!!
    topic = mapTopic(topic, p, topicMappings, {
      skipPathOverride: !!assignedLower,
    });

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

    transformLinks(main, langVariation, articleLinkList);

    const newUrl =
      'https://main--eplan-blog-eds--comwrap.hlx.page/' +
      blogLangCountry +
      '/blog/' +
      articlePath;

    // Below is the list what is going to be shown in the Excel report, you can add more if you need
    return [
      {
        element: main,
        path: p,
        report: {
          newUrl: newUrl,
          previousTags: tagsFinal,
          currentCategory: topic,
          changedLinks: changedLinks.length > 0 ? changedLinks : undefined,
        },
      },
    ];
  },
};
