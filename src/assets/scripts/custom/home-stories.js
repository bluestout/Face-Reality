import $ from "jquery";

function blogTemplate(blog, index) {
  console.log(blog);
  console.log(index);
  let authorElement = "";
  let backgroundStyle = "";
  let size = "";
  if (index === 0) {
    size = " blog-stories__story--big";
  } else {
    size = " blog-stories__story--small";
  }
  if (blog._embedded.author[0] && index === 0) {
    authorElement = `<span class="blog-stories__author">${
      blog._embedded.author[0].name
    }</span>`;
  }
  if (
    blog._embedded &&
    blog._embedded["wp:featuredmedia"] &&
    blog._embedded["wp:featuredmedia"][0]
  ) {
    const blogMedia = blog._embedded["wp:featuredmedia"][0];
    if (blogMedia.media_details.sizes.large) {
      backgroundStyle = `style="background-image: url(${
        blogMedia.media_details.sizes.large
      })"`;
    } else if (blogMedia.media_details.sizes.medium_large) {
      backgroundStyle = `style="background-image: url(${
        blogMedia.media_details.sizes.medium_large
      })"`;
    } else {
      backgroundStyle = `style="background-image: url(${
        blogMedia.media_details.sizes.full
      })"`;
    }
  }

  const pattern = `
    <div class="blog-stories__story${size}">
      <div class="blog-stories__background"${backgroundStyle}></div>
      <a href="${blog.link}" class="blog-stories__link">
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

function getWpBlogs() {
  if ($("body").hasClass("template-index")) {
    $.ajax({
      url: "http://demo.wp-api.org/wp-json/wp/v2/posts?_embed",
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
