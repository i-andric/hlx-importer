const menuTopics = [
  'tips',
  'processen',
  'projecten'
];

const listofCurrentArticleLinks = [
  '/be-nl/blog/software/slim-werken-met-de-navigators-in-eplan',
  '/be-nl/blog/software/schemas-maken-met-een-druk-op-de-knop',
  '/be-nl/blog/software/optimaal-koelen-volgens-productnorm-iec-61439',
  '/be-nl/blog/software/werk-nog-efficienter-met-macros-dankzij-tijdelijke-aanduiding-objecten',
  '/be-nl/blog/software/hoe-bespaart-u-tijd-met-kruisverwijzingen-bij-plc-kaarten-in-eplan',
  '/be-nl/blog/software/ontdek-ons-uitgebreide-aanbod-van-online-diensten-en-trainingen',
  '/be-nl/blog/software/5-tips-om-uw-artikeldatabase-te-optimaliseren',
  '/be-nl/blog/software/word-een-eplan-professional',
  '/be-nl/blog/software/geen-tijd-voor-geautomatiseerde-engineering-geen-excuses-meer',
  '/be-nl/blog/software/zo-werkt-u-efficient-samen-met-een-externe-bordenbouwer',
  '/be-nl/blog/software/wat-is-het-eplan-education-package',
  '/be-nl/blog/software/kent-u-deze-nieuwe-manier-om-eigenschappen-te-customizen-al',
  '/be-nl/blog/software/antwoord-op-al-uw-vragen-over-eplan-op-een-plek',
  '/be-nl/blog/software/de-voordelen-van-eplan-trainingen',
  '/be-nl/blog/software/hoe-u-een-afgewerkte-schakelkast-100-klaarstoomt-voor-verzending',
  '/be-nl/blog/software/integratie-eplan-3dexperience',
  '/be-nl/blog/software/vertaal-uw-artikeldatabase-in-een-handomdraai',
  '/be-nl/blog/software/geen-eigen-bordenbouwafdeling-ook-dan-biedt-3d-veel-voordelen',
  '/be-nl/blog/software/hoe-migreer-ik-van-eplan-5-naar-eplan-electric-p8',
  '/be-nl/blog/software/vijf-argumenten-waarom-schemas-bouwen-met-macros-ook-voor-u-veel-tijd-en-stress-scheelt',
  '/be-nl/blog/software/de-voordelen-van-plotkaders-en-formulieren',
  '/be-nl/blog/software/eenvoudig-labels-printen-met-de-koppeling-tussen-eplan-en-phoenix',
  '/be-nl/blog/software/hoe-haal-ik-als-engineer-meer-uit-mijn-io-lijsten',
  '/be-nl/blog/software/zo-verloopt-het-vernieuwde-ece-traject-in-de-praktijk',
  '/be-nl/blog/software/alles-over-projectstructuur',
  '/be-nl/blog/software/een-efficiente-stuklijst-samenstellen',
  '/be-nl/blog/software/de-5-belangrijkste-redenen-waarom-u-moet-overschakelen-op-3d-ontwerp',
  '/be-nl/blog/software/augmented-reality-voor-3d-ontwerp-hoe-de-eplan-eview-add-on-werkt',
  '/be-nl/blog/software/welke-3d-tool-heeft-u-nodig-eplan-harness-prod-of-eplan-pro-panel',
  '/be-nl/blog/software/optimaliseer-uw-productieproces-ontwikkel-uw-nagelbord-in-een-3d-omgeving',
  '/be-nl/blog/software/hoe-u-als-bordenbouwer-snel-en-efficient-labels-maakt',
  '/be-nl/blog/software/interview-massimo-vanderstraeten-eplan-certified-engineer-hoe-het-complete-opleidingstraject-een-grote-meerwaarde-had',
  '/be-nl/blog/software/5-eplan-webcasts-die-de-moeite-zijn-om-te-herbekijken',
  '/be-nl/blog/software/het-nut-van-een-goed-revisiebeheer',
  '/be-nl/blog/software/panel-building-challenge-5-bedraden-zonder-zorgen',
  '/be-nl/blog/software/updaten-naar-een-nieuwe-eplan-versie-een-handig-stappenplan',
  '/be-nl/blog/software/online-of-fysieke-training-volgen-de-mening-van-onze-ervaringsdeskundigen',
  '/be-nl/blog/software/project-met-meerdere-engineers-of-externen-zo-werkt-u-efficient-samen',
  '/be-nl/blog/software/werken-met-klemmenstroken-en-bruggen-in-de-eplan-navigator',
  '/be-nl/blog/software/de-tien-meest-gestelde-vragen-over-cae-software',
  '/be-nl/blog/software/hang-rijke-artikeldata-achter-elk-component-in-uw-schema',
  '/be-nl/blog/software/efficient-inzetten-van-montagerails-en-kabelgoten',
  '/be-nl/blog/software/werken-met-3d-macros-de-meest-gestelde-vragen',
  '/be-nl/blog/software/ontdek-het-nieuwe-eplan-data-portal',
  '/be-nl/blog/software/leestip-nog-sneller-richting-een-digitale-toekomst-met-het-eplan-platform-2022',
  '/be-nl/blog/trends/in-zes-stappen-naar-een-complete-integratie-van-het-engineerings-en-productieproces',
  '/be-nl/blog/projecten/interview-kristof-decock-eplan-certified-engineer-we-kunnen-ons-onderscheiden-van-onze-concurrenten',
  '/be-nl/blog/projecten/efficienter-elektrisch-engineeren-met-eplan',
  '/be-nl/blog/projecten/grote-tijdwinst-voor-eeg-dankzij-digitalisatie',
  '/be-nl/blog/software/kortere-wachttijden-bij-telefonische-support',
  '/be-nl/blog/software/een-nieuw-ece-en-ecc-traject-dit-betekent-het-voor-u',
  '/be-nl/blog/software/stap-over-op-functioneel-ontwerpen',
  '/be-nl/blog/trends/3-manieren-waarop-3d-engineering-uw-werkwijze-verbetert',
  '/be-nl/blog/projecten/als-bedrijf-omschakelen-naar-conceptuele-engineering-met-eplan',
  '/be-nl/blog/software/eigenschappen-in-bulk-bewerken-kent-u-dit-handige-trucje-al',
  '/be-nl/blog/projecten/hoe-technigroup-de-elektrische-en-mechanische-afdelingen-efficiënt-laat-samenwerken',
  '/be-nl/blog/projecten/interview-johan-de-munck-eplan-certified-engineer-bewijs-dat-ik-de-juiste-kennis-heb-om-mijn-klanten-goed-te-ondersteunen',
  '/be-nl/blog/projecten/doorgedreven-digitalisatie-leidt-tot-optimaal-engineeringsproces-binnen-de-watersector',
  '/be-nl/blog/projecten/engie-fabricom-kennis-verspreiden-en-benutten-met-eplan',
  '/be-nl/blog/projecten/optimalisatie-van-productielijnen-dankzij-engineeringsoftware',
  '/be-nl/blog/projecten/cabli-halveert-productietijd-dankzij-ikea-principe',
  '/be-nl/blog/projecten/waarom-het-onderwijs-met-eplan-werkt',
  '/be-nl/blog/projecten/werk-makkelijk-en-overal-samen-met-eplan-eview',
  '/be-nl/blog/projecten/waarom-giec-volledig-inzet-op-3d-engineering',
  '/be-nl/blog/projecten/wat-kost-eplan',
  '/be-nl/blog/projecten/kiezen-voor-structurering-en-standaardisatie-van-modules-met-eplan',
  '/be-nl/blog/trends/de-scope-van-een-project-bepalen-deze-stappen-mogen-zeker-niet-ontbreken',
  '/be-nl/blog/software/welke-it-infrastructuur-is-nodig-om-met-eplan-te-werken',
  '/be-nl/blog/trends/win-zeeen-van-tijd-automatiseer-het-engineeringsproces',
  '/be-nl/blog/trends/hoe-eplan-en-rittal-uw-engineering-en-productieproces-kunnen-stroomlijnen',
  '/be-nl/blog/trends/optimaal-omgaan-met-productiestilstanden',
  '/be-nl/blog/trends/hoe-kunt-u-downtime-van-uw-machines-of-installaties-minimaliseren',
  '/be-nl/blog/trends/3-tips-voor-efficiente-data-uitwisseling-tussen-engineering-en-productie',
  '/be-nl/blog/trends/verplaats-je-de-kast-of-de-monteur-3d-geeft-de-doorslag',
  '/be-nl/blog/trends/hoe-integreer-ik-mijn-plm-systeem-met-eplan',
  '/be-nl/blog/trends/3-veel-gemaakte-fouten-in-het-engineeringsproces',
  '/be-nl/blog/trends/3-criteria-waarmee-u-een-efficientieslag-maakt-bij-projectopstart',
  '/be-nl/blog/trends/waarom-u-met-een-digital-twin-moet-werken',
  '/be-nl/blog/trends/versnel-de-time-to-market-van-uw-engineeringprojecten',
  '/be-nl/blog/trends/verbeter-de-samenwerking-tussen-de-elektrische-en-de-software-engineer-met-een-plc-interface',
  '/be-nl/blog/trends/zo-weet-u-sneller-of-uw-projecten-technisch-haalbaar-zijn',
  '/be-nl/blog/trends/hoe-u-met-smart-customisation-de-projectdruk-vermindert',
  '/be-nl/blog/trends/efficient-engineering-de-3-bouwstenen',
  '/be-nl/blog/trends/automatische-schemageneratie-een-must-voor-toekomstgerichte-engineeringsafdelingen',
  '/be-nl/blog/trends/vergroot-de-slaagkans-van-uw-offertes',
  '/be-nl/blog/trends/doet-u-aan-frank-sinatra-engineering-eplan',
  '/be-nl/blog/trends/geen-tijd-voor-mechanische-voorbereiding-van-schakelkasten-ontdek-het-rittal-modcenter',
  '/be-nl/blog/trends/rockwell-interface-koppel-uw-software-van-eplan-en-rockwell',
  '/be-nl/blog/trends/4-tips-bij-de-overgang-van-detail-engineering-naar-productie',
  '/be-nl/blog/trends/bim-en-eplan-succesvolle-documentatie-binnen-de-gebouwtechniek',
  '/be-nl/blog/trends/maak-warmteberekening-makkelijk-met-ritherm',
  '/be-nl/blog/trends/starten-met-eplan-ontdek-onze-integrale-aanpak',
  '/be-nl/blog/trends/waarom-een-elektrische-standaard-onmisbaar-is-voor-iedereen-die-efficient-wil-werken',
  '/be-nl/blog/software/updaten-naar-een-nieuwe-eplan-versie-een-handig-stappenplan',
  '/be-nl/blog/software/van-norm-wisselen-in-een-project-zo-doet-u-dat-in-een-handomdraai',
  '/be-nl/blog/trends/detail-engineering-de-meest-invloedrijke-kost-van-uw-machine',
  '/be-nl/blog/trends/hoe-u-eplan-kunt-koppelen-aan-uw-erp-pakket',
  '/be-nl/blog/trends/correct-importeren-van-componenten-in-het-artikelbeheer',
  '/be-nl/blog/software/panel-building-challenge-6-nog-makkelijker-bedraden',
  '/be-nl/blog/software/snel-schemas-genereren-met-eplan-ebuild-free',
  '/be-nl/blog/trends/de-voordelen-van-een-koppeling-tussen-eplan-en-windchill',
  '/be-nl/blog/trends/5-redenen-waarom-de-samenwerking-tussen-mechanische-en-elektrische-engineering-zo-belangrijk-is',
  '/be-nl/blog/trends/het-belang-van-standaardisatie-kent-u-al-deze-voordelen-al',
  '/be-nl/blog/trends/panel-building-challenge-4-onderdelen-installeren-in-een-schakelkast',
  '/be-nl/blog/projecten/hoe-technigroup-de-elektrische-en-mechanische-afdelingen-efficient-laat-samenwerken',
  '/be-nl/blog/software/leestip-nog-sneller-richting-een-digitale-toekomst-met-het-eplan-platform-2022',
  '/be-nl/blog/software/ontdek-het-nieuwe-eplan-data-portal',
  '/be-nl/blog/trends/maak-warmteberekening-makkelijk-met-ritherm',
];


const youtubeMessage =
  'Om deze video te bekijken, moet u de functionele cookies accepteren.';
const blogLangCountry = 'be-nl';

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

const replaceAllEplanStrings = (main) => {
  // Function to traverse all text nodes and replace "EPLAN" with "Eplan"
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

const normalizeLink = (href) => {
  if (!href) return ''; // Handle empty or invalid input

  // Handle /nl/ links specifically
  if (href.startsWith('/nl/')) {
    console.log('href starting with /nl/', href);
    
    // Remove query parameters by taking everything before '?'
    const basePath = href.split('?')[0];
    const pathWithoutNl = basePath.substring(4); // Remove /nl/ prefix
    
    // Try to find a matching article in the list
    const matchingArticle = listofCurrentArticleLinks.find(link => {
      return link.toLowerCase().includes(pathWithoutNl.toLowerCase());
    });
    console.log('matchingArticle', matchingArticle);
    
    if (matchingArticle) {
      // If we found a match, use the entire matching path from our list
      return matchingArticle;
    } else {
      // If no match found, use 'uncategorized' as fallback
      return `/be-nl/blog/uncategorized/${pathWithoutNl}`;
    }
  }

  try {
    // Try to parse the URL to detect if it's a complex URL with query parameters
    const url = new URL(href);
    if (url.search || url.hash) {
      // For other URLs with query params, remove them
      return href.split('?')[0];
    }
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

const transformLinks = (main) => {
  main.querySelectorAll('a').forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (href) {
      try {
        // Normalize the href link
        const normalizedHref = normalizeLink(href);
        anchor.setAttribute('href', normalizedHref);
      } catch (error) {
        console.warn(`Unable to normalize link: ${href} - ${error.message}`);
      }
    }
  });
};

const createMetadataBlock = (main, document, html, params, urlStr) => {
  const meta = {};

  const desc = document.querySelector('[property="og:description"]');
  if (desc) {
    meta.Description = desc.content;
  }

  const date = document.querySelector('.titleitem__date');
  if (date) {
    const [day, month, year] = date.innerHTML.split('/');
    const newDate = `${month}/${day}/${year}`;
    meta.Date = newDate;
  }

  const author = document.querySelector('[name="author"]');
  if (author) {
    meta.Author = author.content;
  }

  // Taking all tags shown on the page and putting them in the meta
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

  const block = WebImporter.Blocks.getMetadataBlock(document, meta);

  main.append(block);

  return meta;
};

export default {
  preprocess: ({ document, url, html, params }) => {
    params.foundSomethingInPreprocessing = true;
  },
  transform: ({ document, params }) => {
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

        // If you want to fill in TOC with h2s then uncomment bellow lines
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

    if (title) {
      main.prepend('--- ');
      main.prepend(title);
    }

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
            const originalHost = u.hostname.includes('hs-sites.com') ? u.origin : 'https://blog.eplan.co.uk';
            u.searchParams.set('host', originalHost);
    
            const imageUrl = `http://localhost:3001${u.pathname}${u.search}`;
            console.log("Fetching image from:", imageUrl);
    
            // Fetch image and convert to Base64
            fetch(imageUrl, {
              mode: 'cors',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type'
              }
            })
              .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.blob();
              })
              .then(blob => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  iframeImage.setAttribute('src', reader.result);
                  iframeImage.setAttribute('alt', 'Embedded Content');
                  iframeImage.style.maxWidth = "100%"; // Ensure proper scaling
                  
                  // Ensure it's not wrapped in a link
                  const parent = iframe.parentElement;
                  console.log('parent TAG NAME: ', parent);
                  console.log('iframe image: ', iframeImage);

                  if (parent.tagName === "A") {
                    console.log('it is a');
                    parent.replaceWith(iframeImage);
                  } else {
                    console.log('it is NOT a');
                    iframe.replaceWith(iframeImage);
                  }
    
                  console.log("Image successfully embedded.", iframeImage);
                };
                reader.readAsDataURL(blob);
              })
              .catch(error => {
                console.warn(`Failed to load image: ${error.message}`);
              });
    
          } catch (error) {
            console.warn(`Unable to process iframe ${iframeSrc}: ${error.message}`);
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
        console.log('linkedImages: ', linkedImages);
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
    const teaserText = main.querySelector('#hs_cos_wrapper_blog_post_teaser_text');
    if (teaserText) {
      // Instead of just getting textContent, get the HTML content to preserve formatting
      const teaserContent = teaserText.innerHTML.trim();
      if (teaserContent) {
        // Create a temporary div to handle HTML content properly
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = teaserContent;
        
        const finalTeaserContent = tempDiv.textContent.trim();
        const teaserCells = [['teasertext'], [finalTeaserContent]];
        const teaserTable = WebImporter.DOMUtils.createTable(teaserCells, document);
        
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

    createMetadataBlock(main, document);

    let topic = '';
    let topicFromTag = '';
    let tagsFinal = '';
    const tagsWrapper = main.querySelector('.tags');
    if (tagsWrapper) {
      const tags = tagsWrapper.querySelectorAll('.tags__link');
      if (tags) {
        const tagsArray = [];
        tags.forEach((tag) => {
          const tagName = tag.innerHTML.toLowerCase();
          tagsArray.push(tagName);
        });
        let topicString = tagsArray.toString();

        let nonePresent = tagsArray.every((str) => {
          if (!menuTopics.includes(str)) {
            return true;
          }
          topicFromTag = str;
          return false;
        });

        if (nonePresent) {
          topic = 'Uncategorized';
          tagsFinal = topicString;
        } else {
          topic = topicFromTag;
          tagsFinal = topicString;
        }
      }
    }

    WebImporter.DOMUtils.remove(document, [
      '.tags',
      '.titleitem__date',
      '.pillar_page_module',
    ]);

    // Remove unwanted text - cookie/youtube warning because it is copying it as text
    const elementWithText = Array.from(document.querySelectorAll('*')).find(
      (el) => el.textContent.trim() === youtubeMessage
    );

    if (elementWithText) {
      elementWithText.remove();
    }

    // Replace all "EPLAN" with "Eplan"
    replaceAllEplanStrings(main);

    let p = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html$/, '');
    console.log('link before', p);
    p = normalizeLink(p);
    console.log('link after', p);

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

    const newUrl =
      'https://main--eplan-blog-eds--comwrap.hlx.page/' +
      blogLangCountry +
      '/blog/' +
      articlePath;

    return [
      {
        element: main,
        path: p,
        report: {
          newUrl: newUrl,
          previousTags: tagsFinal,
          currentCategory: topic,
        },
      },
    ];
  },
};
