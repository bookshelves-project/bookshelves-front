---
title: "More eBooks"
subtitle: ''
description: 'About more eBooks projects'
---

You want to read more eBooks ? Many resources exist on Internet to read and download more eBooks.

## Free & libres libraries

- [**Framabook**](https://framabook.org) 🇫🇷
- [**Bibliothèque numérique TV5MONDE**](https://bibliothequenumerique.tv5monde.com) 🇫🇷
- [**Ebooks libres et gratuits**](https://www.ebooksgratuits.com) 🇫🇷
- [**Project Gutenberg**](https://www.gutenberg.org) 🇬🇧
- [**Feedbooks**](https://www.feedbooks.com/publicdomain?locale=en)
- [**Gallica**](https://gallica.bnf.fr/accueil/fr/content/accueil-fr?mode=desktop) 🇫🇷
- [**Open Library**](https://openlibrary.org)
- [**Manybooks**](https://manybooks.net) 🇬🇧
- [**Bibebook**](http://www.bibebook.com) 🇫🇷
- [**ÉFÉLÉ**](http://efele.net/ebooks/#presentation) 🇫🇷
- [**Bibliothèque numérique romande**](https://ebooks-bnr.com) 🇫🇷
- [**Bibliothèque électronique du Québec**](http://beq.ebooksgratuits.com) 🇫🇷
- [**Atramenta**](https://www.atramenta.net)
- [**digilibraries**](https://digilibraries.com)
- [**getfreeebooks**](https://www.getfreeebooks.com)
- [**bookyards**](https://www.bookyards.com/en/welcome)
- [**e-booksdirectory**](http://www.e-booksdirectory.com)

## Applications

📖 allow to read eBooks  
📚 allow to manage OPDS feeds  
💰 ads or premium  

### Android

- [**Aldiko**](https://play.google.com/store/apps/details?id=com.aldiko.android&hl=en&gl=US) 📖 📚 💰
- [**Moon+ Reader**](https://play.google.com/store/apps/details?id=com.flyersoft.moonreader&hl=en&gl=US) 📖 📚 💰
- [**Bookari**](https://play.google.com/store/apps/details?id=com.mantano.reader.android) 📖 📚 💰
- [**Libby**](https://play.google.com/store/apps/details?id=com.overdrive.mobile.android.libby&hl=en&gl=US) 📖
- [**Feedbooks**](https://play.google.com/store/apps/details?id=dev.jideguru.flutterEbookApp&hl=en&gl=US) 📖
  - [**GitHub**](https://github.com/JideGuru/FlutterEbookApp)

### iOS

- [**eBook Search**](https://apps.apple.com/us/app/ebook-search-download-books/id416454511) 📖
- [**KyBook**](https://apps.apple.com/app/id1348198785) 📖 📚 💰
- [**Bookari**](https://apps.apple.com/fr/app/mantano-ebook-reader/id768229929) 📖 📚 💰
- [**Libby**](https://apps.apple.com/us/app/libby-by-overdrive/id1076402606) 📖

### Windows

- [**Calibre**](https://calibre-ebook.com) 📖 📚
- [**Book Bazaar Reader**](http://www.refrelent.com) 📖 📚

### Linux

- [**Calibre**](https://calibre-ebook.com) 📖 📚

### macOS

- [**Calibre**](https://calibre-ebook.com) 📖 📚

### Tools

- [**ISBN Search**](https://isbnsearch.org): search books by their ISBN
- [**Koreader**](https://github.com/koreader/koreader): alternative for OS on eReaders **Github**
- [**Calibre Web application**](https://github.com/janeczku/calibre-web): Github for Calibre on web
- [**COPS**](https://github.com/seblucas/cops): Calibre OPDS PHP Server : web-based to serve ebooks

## Shops

- [**ePagine**](https://www.epagine.fr) 🇫🇷
- [**chapitre.com**](https://www.chapitre.com) 🇫🇷
- [**Kobo**](https://www.kobo.com/fr/fr) 🇫🇷
- [**Hall du livre**](https://halldulivre.com) 🇫🇷
- [**goodreads**](https://www.goodreads.com/ebooks) 🇬🇧

## OPDS

About OPDS from Wikipedia:

>The Open Publication Distribution System (OPDS) catalog format is a syndication format for electronic publications based on Atom and HTTP. OPDS catalogs enable the aggregation, distribution, discovery, and acquisition of electronic publications. OPDS catalogs use existing or emergent open standards and conventions, with a priority on simplicity.
>
>The Open Publication Distribution System specification is prepared by an informal grouping of partners, combining Internet Archive, O'Reilly Media, Feedbooks, OLPC, and others.

- [**OPDS**](https://opds.io): official website
- [**Kobo : reprenez le contrôle**](https://lmorel3.fr/posts/kobo-root): install *Koreader* on Kobo 🇫🇷
- [**Catalogues OPDS**](https://lecturenumenbib.wordpress.com/acquisitions/catalogues-opds/): about OPDS system 🇫🇷
- [**Framabookin**](https://framacloud.org/fr/cultiver-son-jardin/bicbucstriim.html): install your own OPDS server 🇫🇷
- [**Wikipedia**](https://en.wikipedia.org/wiki/Open_Publication_Distribution_System): to know more about OPDS
- [**Github projects**](https://github.com/search?q=OPDS&type=Repositories&s=stars): if your are developer, you can check many projects which use OPDS
  - [**OPDS Validator**](https://opds-validator.appspot.com): to check if any OPDS feed is valid

### eReader & OPDS

If you have an eReader, you can think it's an amazing idea to allow readers to get OPDS feeds on eReader. And it is, but many eReaders can't have OPDS feeds because eReaders' makers pre-install only their shops on their devices. If they allow OPDS feeds, they haven't control on what users can read and download. If you want to have an eReader with *libre* OS, you can install [**Koreader**](https://github.com/koreader/koreader). The alternative of new OS for eReader is to use eReader browser to download eBooks directly from online source, on the guide [**Download eBook from eReader**](/guides/ereader-download-ebook-from-ereader), you have an example with *<app-name></app-name> Catalog*[^1].

If you want to use <app-name></app-name> with OPDS, you can use <api-link endpoint="/opds/v1.2" :refer-it-self="true"></api-link> feed, check [OPDS & Catalog](/pages/opds-catalog) to know more about this.

### Feeds

If you have an application to read eBooks from OPDS feeds, you can add new feeds, check [**MobileRead Wiki for list of OPDS feeds**](https://wiki.mobileread.com/wiki/OPDS). You need to have any application with OPDS support and just add feeds to get books.

**This list is not exhaustive**

- [Atramenta](http://www.atramenta.net/opds/catalog.atom)
- [Ebooksgratuits.com](http://www.ebooksgratuits.com/opds)
- [Feedbooks](http://www.feedbooks.com/catalog.atom)
- [Gallica](http://gallica.bnf.fr/opds)
- [Internet Archive Catalog](http://bookserver.archive.org/catalog)
- [Project Gutenberg](http://m.gutenberg.org/ebooks/?format=opds)
- [Revues.org](http://bookserver.revues.org/)
- [YouScribe](http://opds.youscribe.com/Catalog/catalog.xml)

[^1]: if OPDS is official and libre initiative, the <app-name></app-name> Catalog is just a simple solution to allow to search eBooks with eReader browser on basic web interface for eReader without OPDS feeds, so almost all eReaders.
