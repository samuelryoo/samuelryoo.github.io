// Image lightbox for project galleries. Without JavaScript the links simply open the image.
(function () {
  var links = document.querySelectorAll("a[data-lightbox]");
  if (!links.length || typeof HTMLDialogElement === "undefined") return;

  var dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.innerHTML = '<button type="button" aria-label="Close image">Close</button><img alt="">';
  document.body.appendChild(dialog);
  var img = dialog.querySelector("img");

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      var thumb = link.querySelector("img");
      img.src = link.href;
      img.alt = thumb ? thumb.alt : "";
      dialog.showModal();
    });
  });

  dialog.addEventListener("click", function (event) {
    if (event.target !== img) dialog.close();
  });
})();
