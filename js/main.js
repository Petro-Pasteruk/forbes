document.querySelector(".burger__wrap").addEventListener("click", function () {
    if (document.querySelector(".burger").classList.contains("close")) {
        document.querySelector("body").style.overflow = "initial";
        document.querySelector("html").style.overflow = "initial";
        document.querySelector(".burger").classList.remove("close");
        document.querySelector(".nav").classList.remove("active");
    } else {
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector("html").style.overflow = "hidden";
        document.querySelector(".burger").classList.add("close");
        document.querySelector(".nav").classList.add("active");
    }
});