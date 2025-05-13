// Change first this part to COUNTRY-LANGUAGE
const blogLangCountry = 'be-fr';

// For normalization of the relative links include the langauge below with slashes
const langVariation = '/fr/';

// Then add here topics from the current (live) website
const menuTopics = ['astuces', 'processus', 'projets'];

// Next change this message to the one from the live website according to the language
// Find the article which has youtube video and check the message (when cookies not accepted)
// Sometimes this message could be seen on homepage if any youtube videos-just reject the cookies
const youtubeMessage =
  'Vous devez autoriser les cookies fonctionnels pour afficher cette vidéo.';

// Here add a list of the articles that needs to be normalized - changed relative links in articles
// On the current live website none of the articles are under the topic, so they need to be found and targeted
const listofCurrentArticleLinks = [
  '/be-fr/logiciel/la-realite-augmentee-pour-les-constructions-en-3d-fonctionnement-du-logiciel-complementaire-eplan-eview',
  '/be-fr/logiciel/decouvrez-notre-offre-de-services-et-formations-en-ligne',
  '/be-fr/logiciel/les-avantages-des-formations-deplan',
  '/be-fr/projets/entretien-avec-kristof-decock-eplan-certified-engineer-ce-certificat-nous-permet-de-nous-demarquer-de-la-concurrence',
  '/be-fr/tendances/3-erreurs-courantes-dans-le-processus-dingenierie',
  '/be-fr/logiciel/refroidissement-optimal-selon-la-norme-de-produits-cei-61439',
  '/be-fr/logiciel/creer-une-liste-de-pieces-efficace',
  '/be-fr/logiciel/comment-migrer-de-eplan-5-vers-eplan-electric-p8',
  '/be-fr/tendances/interface-rockwell-couplez-votre-logiciel-eplan-et-rockwell',
  '/be-fr/logiciel/suivre-une-formation-en-ligne-ou-physique-lavis-de-plusieurs-specialistes-de-terrain',
  '/be-fr/logiciel/le-defi-de-la-construction-de-panneaux-6-un-cablage-encore-plus-facile',
  '/be-fr/projets/importance-modularisation-standardisation-au-sein-de-vos-projets',
  '/be-fr/tendances/pourquoi-une-norme-electrique-est-indispensable-pour-travailler-efficacement',
  '/be-fr/logiciel/limportance-dune-bonne-gestion-des-revisions',
  '/be-fr/logiciel/changez-la-norme-dun-projet-facilement-et-en-un-rien-de-temps',
  '/be-fr/logiciel/les-avantages-des-cartouches-et-formulaires',
  '/be-fr/projets/optimisation-des-lignes-de-production-par-logiciel-dingenierie',
  '/be-fr/logiciel/centralisation-des-reponses-a-toutes-vos-questions-sur-eplan',
  '/be-fr/projets/echange-de-connaissances-et-travail-efficace-des-clients-fidele',
  '/be-fr/projets/interview-johan-de-munck-eplan-certified-engineer-la-preuve-que-je-dispose-des-connaissances-pour-bien-accompagner-mes-clients',
  '/be-fr/logiciel/quelle-infrastructure-it-est-necessaire-pour-travailler-avec-eplan',
  '/be-fr/tendances/pas-le-temps-pour-la-preparation-mecanique-de-vos-panneaux-decouvrez-le-rittal-modcenter',
  '/be-fr/tendances/ameliorer-la-cooperation-entre-lingenieur-electricien-et-lingenieur-logiciel-grace-a-une-interface-plc',
  '/be-fr/logiciel/comment-collaborer-efficacement-sur-un-important-projet-dingenierie',
  '/be-fr/tendances/determiner-le-scope-dun-projet-les-etapes-a-ne-pas-manquer',
  '/be-fr/logiciel/pourquoi-vous-avez-besoin-de-travailler-avec-un-jumeau-numerique',
  '/be-fr/projets/pourquoi-ingenierie-conceptuelle-est-si-importante',
  '/be-fr/tendances/bim-et-eplan-documentation-concluante-dans-la-technologie-du-batiment',
  '/be-fr/logiciel/combien-coute-eplan',
  '/be-fr/tendances/comment-puis-je-integrer-mon-systeme-plm-a-eplan',
  '/be-fr/logiciel/travaillez-efficacement-avec-les-navigateurs-deplan',
  '/be-fr/logiciel/pas-de-departement-de-construction-de-tableaux-electriques-les-avantages-de-la-3d',
  '/be-fr/logiciel/traduisez-votre-base-de-donnees-darticles-en-un-rien-de-temps',
  '/be-fr/projets/pourquoi-leducation-travaille-avec-eplan',
  '/be-fr/logiciel/pas-de-temps-pour-lingenierie-automatisee-plus-dexcuses',
  '/be-fr/logiciel/travaillez-plus-efficacement-avec-un-tableautier-externe',
  '/be-fr/tendances/vous-faites-de-lingenierie-a-la-frank-sinatra',
  '/be-fr/tendances/gagnez-du-temps-automatisez-le-processus-dingenierie',
  '/be-fr/logiciel/informations-pratiques-comment-se-deroule-le-nouveau-parcours-ece',
  '/be-fr/tendances/comment-eplan-et-rittal-peuvent-accelerer-vos-processus-dingenierie-et-de-production',
  '/be-fr/logiciel/modifier-un-grand-nombre-de-proprietes-connaissez-vous-cette-astuce',
  '/be-fr/logiciel/devenez-un-professionnel-eplan',
  '/be-fr/logiciel/generer-rapidement-des-schemas-avec-eplan-ebuild-free',
  '/be-fr/logiciel/quest-ce-que-leplan-education-package',
  '/be-fr/projets/cabli-reduit-de-moitie-son-temps-de-production-grace-au-principe-ikea',
  '/be-fr/logiciel/impression-facile-des-etiquettes-grace-au-systeme-eplan-phoenix',
  '/be-fr/tendances/standardisation-connaissez-vous-deja-tous-les-avantages',
  '/be-fr/logiciel/utilisation-efficace-des-profiles-et-des-goulottes-de-cablage',
  '/be-fr/logiciel/travailler-plus-efficacement-avec-les-macros-grace-aux-objets-de-code-de-reservation',
  '/be-fr/tendances/comment-savoir-si-votre-projet-est-techniquement-realisable-ou-non',
  '/be-fr/logiciel/en-tant-quingenieur-comment-puis-je-tirer-le-meilleur-parti-de-mes-listes-i-o',
  '/be-fr/tendances/comment-lier-eplan-a-votre-progiciel-de-gestion-integre-pgi-erp',
  '/be-fr/projets/actualiser-des-schemas-electrique-plus-efficace-avec-eplan',
  '/be-fr/projets/interview-massimo-vanderstraeten-eplan-certified-engineer-le-trajet-de-formation-complet-est-un-grand-atout',
  '/be-fr/logiciel/optimisez-votre-processus-de-production-developpez-votre-planche-a-clous-dans-un-environnement-3d',
  '/be-fr/logiciel/utilisation-des-macros-3d-les-questions-les-plus-frequemment-posees',
  '/be-fr/logiciel/integration-eplan-3dexperience-de-dassault-systemes',
  '/be-fr/logiciel/decouvrez-le-nouveau-eplan-data-portal',
  '/be-fr/logiciel/panel-building-challenge-5-cablage-sans-souci',
  '/be-fr/logiciel/comment-preparer-une-armoire-de-commande-terminee-et-prete-a-etre-expediee-a-100',
  '/be-fr/tendances/accelerez-le-time-to-market-de-vos-projets-dingenierie',
  '/be-fr/logiciel/construire-des-schemas-a-laide-de-macros-vous-fera-gagner-du-temps',
  '/be-fr/tendances/les-avantages-dun-couplage-entre-eplan-et-windchill',
  '/be-fr/logiciel/conseil-de-lecture-la-plateforme-eplan-2022-met-resolument-laccent-sur-lavenir-numerique',
  '/be-fr/logiciel/importation-correcte-des-composants-dans-la-gestion-des-articles',
  '/be-fr/logiciel/comment-gagner-du-temps-avec-les-references-croisees-grace-aux-cartes-api-dans-eplan',
  '/be-fr/tendances/commencer-avec-eplan-decouvrez-notre-approche-integrale',
  '/be-fr/tendances/3-conseils-pour-un-echange-de-donnees-efficace-entre-lingenierie-et-la-production',
  '/be-fr/logiciel/comment-creer-des-etiquettes-rapidement-et-efficacement-en-tant-que-fabricant-de-tableaux',
  '/be-fr/logiciel/connaissez-vous-deja-cette-nouvelle-maniere-de-personnaliser-les-proprietes',
  '/be-fr/projets/un-gain-de-temps-considerable-pour-eeg-grace-a-la-numerisation',
  '/be-fr/tendances/ameliorez-le-taux-de-reussite-de-vos-devis',
  '/be-fr/projets/pourquoi-lentreprise-giec-sengage-pleinement-dans-lingenierie-3d',
  '/be-fr/tendances/la-generation-automatique-de-schemas-une-necessite-pour-les-departements-dingenierie',
  '/be-fr/logiciel/tout-sur-la-structure-dun-projet',
  '/be-fr/logiciel/travailler-avec-des-borniers-et-des-ponts-dans-le-navigateur-deplan',
  '/be-fr/tendances/traitement-optimal-des-arrets-de-production',
  '/be-fr/logiciel/5-conseils-pour-optimiser-votre-base-de-donnees-darticles',
  '/be-fr/logiciel/collaborez-facilement-et-partout-avec-eplan-eview',
  '/be-fr/projets/une-numerisation-approfondie-permet-doptimiser-les-processus-dingenierie-dans-le-secteur-de-leau',
  '/be-fr/tendances/5-raisons-pour-lesquelles-la-cooperation-entre-les-departements-mecaniques-et-electriques-est-si-importante',
  '/be-fr/logiciel/5-webcasts-eplan-a-ne-pas-manquer',
  '/be-fr/logiciel/une-ingenierie-efficace-les-3-elements-fondamentaux',
  '/be-fr/tendances/comment-reduire-la-charge-dun-projet-avec-la-smart-customisation',
  '/be-fr/logiciel/les-5-raisons-principales-pour-lesquelles-vous-devriez-passer-a-la-conception-3d',
  '/be-fr/logiciel/un-nouveau-programme-ece-et-ecc-quest-ce-que-cela-signifie-pour-vous',
  '/be-fr/logiciel/de-quel-outil-3d-avez-vous-besoin-eplan-harness-prod-ou-eplan-pro-panel',
  '/be-fr/logiciel/les-dix-questions-les-plus-frequemment-posees-sur-les-logiciels-de-cae',
  '/be-fr/logiciel/mise-a-jour-vers-une-nouvelle-version-deplan-un-plan-par-etapes-pratique',
  '/be-fr/projets/interview-comment-technigroup-aide-les-departements-electrique-et-mecanique-a-collaborer-efficacement',
  '/be-fr/logiciel/facilitez-le-calcul-de-lechange-thermique-avec-ritherm',
  '/be-fr/tendances/3-facons-dameliorer-votre-methode-de-travail-grace-a-lingenierie-3d',
  '/be-fr/logiciel/faut-il-deplacer-larmoire-ou-linstallateur-la-3d-a-la-reponse',
  '/be-fr/logiciel/associez-des-donnees-riches-a-chaque-composant-de-votre-schema',
  '/be-fr/logiciel/dessiner-vos-schemas-plus-rapidement-passez-au-design-fonctionnel',
  '/be-fr/logiciel/panel-building-challenge-4-installation-dappareils-dans-une-armoire-electrique'
];

let changedLinks = [];

// This below is if it is needed to change the category name - sometimes clients asks for a different name
// This was added when migrating BE-NL website
const topicMappings = {
  // If categories were about to change, we could use this mapping to change them
  default: {
    astuces: 'logiciel',
    processus: 'tendances',
    projets: 'projets',
  },
  // If some of the urls are uncategorized, later we can add them here to map them to a right category
  urls: {
    '/fr/le-défi-de-la-construction-de-panneaux-6-un-câblage-encore-plus-facile':
      'logiciel',
    '/fr/combien-coute-eplan': 'logiciel',
    '/fr/travailler-plus-efficacement-avec-les-macros-grace-aux-objets-de-code-de-reservation': 'logiciel',
    '/fr/une-ingenierie-efficace-les-3-elements-fondamentaux':
      'logiciel',
    '/fr/mise-a-jour-vers-une-nouvelle-version-deplan-un-plan-par-etapes-pratique':
      'logiciel',
      '/fr/faut-il-deplacer-larmoire-ou-linstallateur-la-3d-a-la-reponse': 'logicel'
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

    // Normalize the path for comparison
    const normalizedPath = normalizeSpecialChars(pathWithoutLangVariation);

    // Try to find a matching article in the list
    const matchingArticle = listofCurrentArticleLinks.find((matchingLink) => {
      const normalizedLink = normalizeSpecialChars(matchingLink);
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

const transformLinks = (main) => {
  main.querySelectorAll('a').forEach((articleLink) => {
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
};

const createMetadataBlock = (main, document, html, params, urlStr) => {
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

    createMetadataBlock(main, document);

    // Because live websites doesn't have categories but tags - we are taking tags and trying to find the category
    // If category not there in import excel file then it will be Uncategorized - those need to be raised with the client
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
    p = normalizeDocLink(p);

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
