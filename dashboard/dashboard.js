let blogTitle = document.getElementById("btitle");
let subTitle = document.getElementById("sub-title");
let mainConcept = document.getElementById("main-concept");
let blogImage = document.getElementById("image-file");
let imageCaption = document.getElementById("image-caption");
let blogIntro = document.getElementById("blog-intro-content");
let blogContent = document.getElementById("blogContent");
let postBlogBtn = document.getElementById("blogPost");

let container = [];
let num = 0;

postBlogBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let titles = blogTitle.value;
  let subTitles = subTitle.value;
  let subject = mainConcept.value;
  let image = blogImage.value;
  let caption = imageCaption.value;
  let Intro = blogIntro.value;
  let Content = blogContent.value;

  let blogContents = {
    Title: titles,
    subTitles: subTitles,
    subject: subject,
    image: image,
    caption: caption,
    Intro: Intro,
    Content: Content,
    id: num++,
  };

  container.push(blogContents);

  // localStorage.setItem("contents", blogContents);
  localStorage.setItem("contents", JSON.stringify(container));
});
