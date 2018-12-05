import $ from "jquery";

function blogTemplate(blog, index) {
  let authorElement = "";
  let size = "";
  if (index === 0) {
    size = " blog-stories__story--big";
  } else {
    size = " blog-stories__story--small";
  }
  if (blog._embedded.author[0] && index === 0) {
    authorElement = `<span class="blog-stories__author">by ${
      blog._embedded.author[0].name
    }</span>`;
  }

  const img = extractImgFromContent(blog.content.rendered);
  let bg = "";
  if (!img) {
    bg = extractStyleFromFeaturedmedia(blog._embedded["wp:featuredmedia"]);
  }

  const pattern = `
    <div class="blog-stories__story${size}">
      <div class="blog-stories__background"${bg}>${img}</div>
      <a href="${blog.link}" class="blog-stories__link" target="_blank">
        <span class="blog-stories__post-info">
          <h3 class="blog-stories__post-title">${blog.title.rendered}</h3>
          ${authorElement}
        </span>
        <span class="blog-stories__icon-wrap">
          <span class="blog-stories__icon icon-arrow-right"></span>
        </span>
      </a>
    </div>`;
  return pattern;
}

function extractImgFromContent(content) {
  if (typeof content !== "undefined") {
    const imgStart = content.indexOf("<img");
    const imgClose = content.indexOf(">", imgStart);

    if (imgStart > -1 && imgClose > -1) {
      return content.substr(imgStart, imgClose - imgStart - 1);
    } else {
      return null;
    }
  }
  return null;
}

function extractStyleFromFeaturedmedia(content) {
  if (typeof content !== "undefined" && content.length > 0) {
    const blogMedia = content;
    try {
      if (typeof blogMedia.media_details.sizes.large !== "undefined") {
        return `style="background-image: url(${
          blogMedia.media_details.sizes.large
        })"`;
      } else if (
        typeof blogMedia.media_details.sizes.medium_large !== "undefined"
      ) {
        return `style="background-image: url(${
          blogMedia.media_details.sizes.medium_large
        })"`;
      } else {
        return `style="background-image: url(${
          blogMedia.media_details.sizes.full
        })"`;
      }
    } catch (error) {
      return null;
    }
  }
  return null;
}

function getWpBlogs() {
  if ($("body").hasClass("template-index")) {
    $.ajax({
      url: "https://facerealityacneclinic.com/wp-json/wp/v2/posts?_embed",
      type: "GET",
      dataType: "json",
      data: { per_page: 5 },
      contentType: "application/json",
      success: (results) => {
        if (results.length > 0) {
          for (let i = 0; i < results.length; i++) {
            $(`[data-blog-story="${i + 1}"]`).html(blogTemplate(results[i], i));
          }
          $("[data-blog-posts]").slideDown();
        }
      },
    });
  }
}

$(document).ready(() => {
  getWpBlogs();
});
