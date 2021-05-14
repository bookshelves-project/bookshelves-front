---
title: "OPDS"
subtitle: ''
description: 'How to download eBooks directly on your eReader with your internal browser with Open Publication Distribution System'
---

## Usage

When you want to add an eBook to your eReader, you can plug it into your computer and add it manually or download one from the store associated with your eReader. But with Bookshelves, you have another solution: **use your eReader's web browser to directly download the eBook you want** with Bookshelves OPDS[^1]. You have just to put <api-link endpoint="/ereader" :refer-it-self="true"></api-link> URL into your eReader browser. To know more about download of eBooks with browser from your eReader, check [**Download eBook from eReader guide**](/guides/ereader-download-ebook-from-ereader).

## Limitations

Of course this has some limitations:

- you will **not be able to have the series associated with an eBook** with this method because of the limitations of the EPUB format used. The only solution is to add the series with the Calibre software, as explained in this guide [**Get series on your Kobo**](/guides/ereader-series) for Kobo eReaders, with a file added on your eReader. You may have noticed that the store allows you to display the series of the books you add from it but this is because as an internal program of your eReader, the store can modify the information related to an eBook and thus add the series, which Calibre can do more manually.
- you will **not be able to download a whole series or all the eBooks of an author** because it is a .zip format that is proposed and your eReader only reads the formats linked to the eBooks.
  
Apart from these limitations, this feature allows you to quickly retrieve an eBook with an Internet connection only.

<opds-link></opds-link>

A web browser on an eReader can be difficult to use because the touch on an eReader is not very responsive. Therefore, the OPDS adapts to this difficulty and proposes to search directly for the desired eBook, series or author in order to limit the results and to find the eReader more easily.

## Why ?

<alert type="info" title="Understanding">

This part is about development, so we talk about some langages and why Bookshelves cannot be read properly by eReaders browsers. You need to have basics about web development to understand this section.

</alert>

As mentioned earlier, an eReader's web browser is not very powerful, especially when it comes to JavaScript, a language used on the browser side to manage interactions on the page. It requires a fairly powerful machine like a smartphone to run, eReaders are not powerful machines so the battery lasts long and the price is not too high. Certainly some high-end eReaders allow more possibilities but Bookshelves offers something for everyone. That's why the Bookshelves OPDS system offers an interface managed entirely with PHP which is not a problem to be managed by an eReader because it is compiled in HTML and CSS. On the other hand, CSS is managed in a rather limited way as well so the style is more basic in order to provide an efficient experience.

[^1]: OPDS for Open Publication Distribution System, you can know more about OPDS on [Wikipedia](https://en.wikipedia.org/wiki/Open_Publication_Distribution_System) and [OPDS](https://opds.io/)
