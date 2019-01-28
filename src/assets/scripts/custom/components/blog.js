import $ from "jquery";

const el = {
  stories: "[data-blog-stories]",
  index: "[data-blog-index]",
  indexRecent: "[data-blog-index-recent]",
};

function handleize(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\u00C0-\u024f]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function truncateString(rawString, maxWords) {
  const strippedString = $(`<p>${rawString}</p>`)
    .text()
    .trim();
  const array = strippedString.split(" ");
  let string = array.splice(0, maxWords).join(" ");

  if (array.length > maxWords) {
    string += "...";
  }
  return string;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatShopifyDate(date) {
  if (!date || date.length !== 25) {
    return null;
  }
  const year = date.substring(0, 4);
  const month = monthNames[parseInt(date.substring(5, 7), 10) - 1];
  const day = date.substring(8, 10).replace("0", "");
  return `${month} ${day}, ${year}`;
}

function compareDate(a, b) {
  if (a.published_at < b.published_at) {
    return 1;
  }
  if (a.published_at > b.published_at) {
    return -1;
  }
  return 0;
}

function getArticleUrl(article) {
  const url =
    article && article.handle && article.blogUrl
      ? `${article.blogUrl}/${article.handle}`
      : "";
  return url;
}

function blogStoryTemplate(article, index) {
  if (!article) {
    return null;
  }

  const size =
    index === 0 ? " blog-stories__story--big" : " blog-stories__story--small";

  const img = article.image
    ? `<div class="blog-stories__background"><img src="${
        article.image.src
      }" alt="${article.image.alt}"/></div>`
    : "<div class='blog-stories__background'></div>";

  const author =
    index === 0
      ? `<span class="blog-stories__author">by ${article.author}</span>`
      : "";

  const pattern = `
    <div class="blog-stories__story${size}">
      ${img}
      <a href="${getArticleUrl(
        article,
      )}" class="blog-stories__link" target="_blank">
        <span class="blog-stories__post-info">
          <h3 class="blog-stories__post-title">${article.title}</h3>
          ${author}
        </span>
        <span class="blog-stories__icon-wrap">
          <span class="blog-stories__icon icon-arrow-right"></span>
        </span>
      </a>
    </div>`;
  return pattern;
}

function blogIndexTemplate(article) {
  if (!article) {
    return null;
  }
  const img = article.image
    ? `<div class="blog-article__image-wrap"><img class="blog-article__image" src="${
        article.image.src
      }" alt="${article.image.alt}"/></div>`
    : "";

  const excerpt =
    article.summary_html.length > 1
      ? article.summary_html
      : truncateString(article.body_html, 60);

  let tags = [];
  if (article.tags.indexOf(",") > -1) {
    tags = article.tags.split(",");
  } else if (article.tags.length > 0) {
    tags.push(article.tags);
  }

  let renderedTags = "";
  if (tags.length > 0) {
    renderedTags += "<ul class='blog-article__tags'>";
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      const comma = i < tags.length - 1 ? ", " : "";
      renderedTags += `
      <li class="blog-article__tag">
        <a class="blog-article__tag-link" href="/blogs/${
          article.blogHandle
        }/tagged/${handleize(tag)}">${tag}</a>${comma}
      </li>`;
    }
    renderedTags += "</ul>";
  }

  const pattern = `
  <div class="blog-article">
    <h3 class="blog-article__title">
      <a href="${getArticleUrl(article)}">${article.title}</a>
    </h3>

    <p class="blog-article__info">
      Posted by ${article.author} on ${formatShopifyDate(article.published_at)}
    </p>
    ${img}
    <div class="rte blog-article__content">${excerpt}</div>
    ${renderedTags}
    <p><a class="blog-read-more" href="${getArticleUrl(
      article,
    )}">Read More &rarr;</a></p>
  </div>`;
  return pattern;
}

function blogSidebarRecentTemplate(article) {
  const pattern = `
  <div class="blog-sidebar__item">
    <a href="${getArticleUrl(article)}" class="blog-sidebar__article-link">
      <span class="blog-sidebar__article-text">${article.title}</span>
      <span class="blog-sidebar__link-icon icon-angle-right"></span>
    </a>
  </div>`;
  return pattern;
}

function getRecentBlogs() {
  if (
    $("body").hasClass("template-index") ||
    $("body").hasClass("template-blog") ||
    $("body").hasClass("template-article") ||
    $("#blog").length > 0
  ) {
    $.ajax({
      type: "GET",
      url: "/pages/blog?view=blog-index.json",
      async: false,
      dataType: "html",
      success: (json) => {
        const allblogs = JSON.parse(json);
        let blogs = [];
        const allBlogsLength = allblogs.blogs.length;

        if (allBlogsLength > 0) {
          for (let i = 0; i < allBlogsLength; i++) {
            const allblog = allblogs.blogs[i];
            for (let j = 0; j < allblog.articles.length; j++) {
              const article = allblog.articles[j];
              article.blogHandle = allblog.blog_handle;
              article.blogUrl = allblog.blog_url;
              blogs.push(article);
            }
          }

          blogs = blogs.sort(compareDate);
          // is there a stories section to fill?
          if ($(el.stories).length > 0) {
            for (let i = 0; i < 5; i++) {
              $(`[data-blog-story="${i + 1}"]`).html(
                blogStoryTemplate(blogs[i], i),
              );
            }
            $(el.stories).slideDown();
          }

          // is there a blog index section to fill?
          if ($(el.index).length > 0) {
            let renderedArticles = "";
            const limit = blogs.length < 6 ? blogs.length : 6;
            for (let i = 0; i < limit; i++) {
              renderedArticles += blogIndexTemplate(blogs[i]);
            }
            $(el.index).html(renderedArticles);
          }

          // is there a recent posts sidebar to fill?
          if ($(el.indexRecent).length > 0) {
            let recentArticles = "";
            const limit = blogs.length < 10 ? blogs.length : 10;
            for (let i = 0; i < limit; i++) {
              recentArticles += blogSidebarRecentTemplate(blogs[i]);
            }
            $(el.indexRecent).html(recentArticles);
          }
        }
      },
      cache: false,
    });
  }
  return null;
}

$(document).ready(getRecentBlogs);
