---
title: "Series on Kobo"
description: 'Series can not work on the fly with your Kobo, this guide explain to force your Kobo to display it.'
position: 1
category: 'Guides'
---

## About series

On Bookshelves, many EPUB files have **serie** *metadata* to display book serie and serie number. If you transfer directly EPUB files from Bookshelves on your Kobo or if you use Calibre (or other software to format EPUB files) to set serie, you can have some problem to display your eBooks by series on your Kobo.

- With a Kobo you can transfer manually EPUB files to your Kobo with USB cable from your computer, if you transfer EPUB files like this, you can find your eBooks on your Kobo but series won't work because *metadata* of Kobo have to be refreshed.
- With eBooks from Kobo shop you can download eBooks with **sync** and series will work because sync update *metadata* for eBooks from kobo shop.

If you want to refresh *metadata* for eBooks manually transfered, you will need to use Calibre software (you can transfer manually EPUB files but you will have to execute an option on Calibre), so if you haven't, [**download and install Calibre**](https://calibre-ebook.com).

![books-list](/images/guides/kobo-series/calibre-serie.webp)
*An example of EPUB file with serie and number on Calibre*

## Refresh *metadata*

Now you can transfer manually any eBooks which have a serie, transfer all the serie on your Kobo with USB cable.

![books-list](/images/guides/kobo-series/books-list.webp)
*Here an example with **L'Autre**, a books serie of Pierre Bottero transfered to my Kobo*

When EPUB are on your Kobo, you can **safely** disconnect it. Wait seconds to let Kobo to import new content and when it's done and you can see new books, you will see in **My books**, on tab *Series*, you will **not see** the serie. It's because Kobo haven't refresh *metadata*, to refresh this, you need to connect again your Kobo to your computer and open Calibre.

![books-list](/images/guides/kobo-series/calibre.webp)

And you will see **Device** entry on Calibre, and you can execute **Update cached metadata on device**, this option will refresh *metadata* and now you can safely disconnect your Kobo from your computer and you will see the serie in *Serie* tab in **My books**.

![books-list](/images/guides/kobo-series/calibre-options.webp)

You will have to do this **each time** you add a new serie to your Kobo.

## Review

For a serie of eBooks, you can have a **serie** feature, if the serie is set your Kobo could not display it.

- Connect your Kobo to your computer
- Add EPUB files to your Kobo
- Disconnect and wait importation by your Kobo
- Check if books are present
- Connect **again** your Kobo to your computer
- Open Calibre
- Click on **Device** in Calibre and execute *Update cached metadata on device*
- Disconnect your Kobo after seconds
- Check in **My books**, in *Serie* tab if serie appear

---

TODO

- kobo screenshots on tab series
