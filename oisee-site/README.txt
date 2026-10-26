OISEE WEBSITE - HOSTING GUIDE

This folder is a complete, ready-to-host static website.
  index.html  - the whole site (styles, scripts, images all inside)

HOW TO PUT IT ONLINE (pick one)

1) Netlify (easiest)
   - Go to app.netlify.com/drop
   - Drag this whole "oisee-site" folder onto the page
   - You get a live link in seconds. You can add your own domain later.

2) GitHub Pages
   - Create a repository, upload index.html
   - Settings > Pages > Deploy from branch (main, root)

3) Your own web hosting (cPanel / FTP)
   - Upload index.html into the public_html folder
   - Open your domain in a browser

BEFORE SHARING WITH A CLIENT, REPLACE
  - Address, phone and email (still placeholders)
  - Sample reviews and product photos
  - The inquiry form only works with a server; connect it to your
    own email or form service before going live.

NOTES
  - The site loads its fonts from Google Fonts, so it needs an
    internet connection to show the intended fonts.
