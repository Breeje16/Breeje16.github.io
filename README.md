# Breeje — portable security portfolio

Standalone dark-theme HTML, CSS, JavaScript and your original logo. No backend, sign-in, package installation, build step, external fonts or hosting-specific service is required. The profile and individual article pages work without JavaScript; the audit filters and writeup index use the included JavaScript.

## Deploy to GitHub Pages

1. Back up your existing site and unzip this package.
2. Upload `index.html`, `styles.css`, `script.js`, `.nojekyll`, `assets/` and `writeups/` to the root of `main` in `Breeje16/Breeje16.github.io`. Include the hidden `.nojekyll` file. Keep `authoring/` and this README locally as publishing references.
3. In repository **Settings → Pages**, choose **Deploy from a branch**, **main**, **/(root)**, then Save. If you use an existing Actions workflow, make sure it publishes these static files instead.
4. Wait for the Pages deployment in **Actions** to succeed, then check https://breeje16.github.io/.

The package has not been pushed to your repository. `.nojekyll` disables the need for Jekyll processing; the old Markdown homepage/theme configuration is not required.

## Publish a writeup

The four sections are **Solidity**, **Rust**, **Infra**, and **ZK Writeups**. They start empty because no articles have been supplied.

1. Copy `authoring/writeup-template.html` to `writeups/your-slug.html`. Use lowercase letters, digits and single hyphens for the slug, such as `storage-layout-notes`.
2. Replace every `{{...}}` marker in the copied file:
   - `{{TITLE}}`: article title, including the browser title
   - `{{DATE}}`: publication date as `YYYY-MM-DD`
   - `{{CATEGORY}}`: exactly one of the four section names above
   - `{{CATEGORY_KEY}}`: `solidity`, `rust`, `infra`, or `zk`, respectively
   - `{{SUMMARY}}`: a short summary, also used in the page description
   - `{{SECTION_HEADING}}` and `{{ARTICLE_CONTENT}}`: your first heading and paragraph
3. Write the rest of your article using HTML paragraphs, headings, lists, links and code blocks. Use `<pre><code>...</code></pre>` for code; escape `<` as `&lt;` and `&` as `&amp;`. Put images in `assets/` and reference them as `../assets/filename.png` from an article. Add descriptive alt text.
4. Add one entry to the array in `writeups/posts.js`. For example (illustrative, not a published article):

   ```js
   window.BREEJE_WRITEUPS = [
     {
       title: "Your actual article title",
       date: "2026-10-01",
       category: "Solidity",
       summary: "Your short description of the article.",
       slug: "your-slug"
     }
   ];
   ```

   Add a comma between entries. The `slug` must match the article filename without `.html`. Use double quotes around text and escape embedded quotes as `\"`. Dates must be valid `YYYY-MM-DD` dates. Entries appear newest first within their category; homepage counts update automatically.
5. Open `index.html`, `writeups/index.html` and your new article in a browser. Check the category, summary, date, links, code and mobile layout. Make sure no `{{...}}` markers remain.
6. Commit both the article and updated `writeups/posts.js` to the publishing branch. This is the publishing step; there is no web-based editor or automatic sync.

Keep drafts outside the manifest and publishing folder until you are ready. Invalid categories, dates or slugs are excluded from the index. Article content remains ordinary HTML, so you can read or link to a published article directly without JavaScript.

## Files to edit

- `index.html`: profile copy, statistics and audit results
- `styles.css`: shared dark theme and article typography
- `script.js`: audit-result filters
- `writeups/posts.js`: publication manifest
- `writeups/index.html` and `writeups/writeups.js`: category browsing and empty states
- `writeups/<slug>.html`: each published article
- `assets/breeje-logo.png`: your unchanged original logo, also used as the favicon

Keep paths relative. The same files can run on GitHub Pages, a local folder or another static host.

GitHub's publishing instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
