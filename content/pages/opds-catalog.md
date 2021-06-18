---
title: "OPDS & Catalog"
subtitle: ''
description: 'On other ways.'
---

## OPDS

>The Open Publication Distribution System (OPDS) catalog format is a syndication format for electronic publications based on Atom and HTTP. OPDS catalogs enable the aggregation, distribution, discovery, and acquisition of electronic publications. OPDS catalogs use existing or emergent open standards and conventions, with a priority on simplicity.
>
>The Open Publication Distribution System specification is prepared by an informal grouping of partners, combining Internet Archive, O'Reilly Media, Feedbooks, OLPC, and others.

<app-name></app-name> is also available with OPDS feed, if you have any application with OPDS feature, you can add feed of <app-name></app-name>, just add <api-link endpoint="/opds/v1.2" :refer-it-self="true"></api-link> to your application. To known more about application which can use OPDS, check [**More eBooks**](/pages/more-ebooks#opds).

### Versions

OPDS versions available

- v1.2: <api-link endpoint="/opds/v1.2" :refer-it-self="true"></api-link>

## Catalog

Most of eReader can't read OPDS feeds, so to download directly eBooks you have to use a computer and set manually eBooks on your device, etc... But **Catalog** is the solution **to download directly eBooks on your eReader without any computer**.

If you have any eReader with browser, you can use **Catalog**, it's an very simple interface for your eReader like any shop to directly search and download eBooks. You have just to put <api-link endpoint="/catalog" :refer-it-self="true"></api-link> URL into your eReader browser. To know more about download of eBooks with browser from your eReader, check [**Download eBook from eReader guide**](/guides/ereader-download-ebook-from-ereader).

### Limitations

- you will **not be able to have the series associated with an eBook** with this method because of the limitations of the EPUB format used. The only solution[^1] is to add the series with the Calibre software, as explained in this guide [**Get series on your Kobo**](/guides/ereader-series) for Kobo eReaders, with a file added on your eReader.
- you will **not be able to download a whole series or all the eBooks of an author** because it is a .zip format that is proposed and your eReader only reads the formats linked to the eBooks.

<api-button endpoint="catalog">
Discover Catalog
</api-button>

### Why ?

The eReader's web browser is not very powerful, it's can be difficult to use because the touch on an eReader is not very responsive. Therefore, the OPDS adapts to this difficulty and proposes to search directly for the desired eBook, series or author in order to limit the results and to find the eReader more easily.

## Android

*Coming soon*

[^1]: You may have noticed that the store allows you to display the series of the books you add from it but this is because as an internal program of your eReader, the store can modify the information related to an eBook and thus add the series, which Calibre can do more manually.
