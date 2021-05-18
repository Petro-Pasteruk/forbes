document.querySelectorAll(".category").forEach((item, index) => {
    if (index > 0) {
        item.querySelector(".main--article").classList.add("hidden");
        item.querySelectorAll(".article").forEach(article => {
            article.classList.add("hidden");
        });
    }
});

function closeMenu () {
    document.querySelector("body").style.overflow = "initial";
    document.querySelector("html").style.overflow = "initial";
    document.querySelector(".burger").classList.remove("close");
    document.querySelector(".nav").classList.remove("active");
}

document.querySelector(".burger__wrap").addEventListener("click", function () {
    if (document.querySelector(".burger").classList.contains("close")) {
        closeMenu();
    } else {
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector("html").style.overflow = "hidden";
        document.querySelector(".burger").classList.add("close");
        document.querySelector(".nav").classList.add("active");
    }
});

document.querySelectorAll(".nav__item").forEach((item, index) => {
    item.addEventListener("click", function () {
        document.querySelectorAll(".category").forEach((category, categoryIndex) => {
            if (index === categoryIndex) {
                document.querySelectorAll(".category").forEach(categoryTwo => {
                    categoryTwo.querySelector(".main--article").classList.add("hidden");
                    categoryTwo.querySelectorAll(".article").forEach(article => {
                        article.classList.add("hidden");
                    });
                });

                category.querySelector(".main--article").classList.remove("hidden");
                category.querySelectorAll(".article").forEach(article => {
                    article.classList.remove("hidden");
                });
            }
        });
        closeMenu();
    });
});