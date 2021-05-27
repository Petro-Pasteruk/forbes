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

if (localStorage.getItem("index__articles") !== null) {
    let index = localStorage.getItem("index__articles");
    document.querySelectorAll(".category").forEach((category, categoryIndex) => {
        if (index == categoryIndex) {
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
    localStorage.setItem("index__articles", 0);
}

document.querySelectorAll(".nav__item").forEach((item, index) => {
    item.addEventListener("click", function () {
        localStorage.setItem("index__articles", index);
        closeMenu();
    });
});

function searchBlockClose () {
    document.querySelector("body").style.overflow = "initial";
    document.querySelector("html").style.overflow = "initial";
    document.querySelector(".search").classList.remove("visible");
}

document.querySelector(".header__search-btn").addEventListener("click", function () {
    const searchBlock = document.querySelector(".search");

    if (searchBlock.classList.contains("visible")) {
        searchBlockClose();
    } else {
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector("html").style.overflow = "hidden";
        document.querySelector(".search").classList.add("visible");
    }
});

document.querySelector(".search__close").addEventListener("click", searchBlockClose);

function searchArticles (e) {
    if (e.target.parentElement.parentElement.querySelector(".data__input")) {
        window.textLooking = e.target.parentElement.parentElement.querySelector(".data__input").value;
    } else if (e.target.parentElement.querySelector(".data__input")) {
        window.textLooking = e.target.parentElement.querySelector(".data__input").value;
    } else if (e.target.parentElement.parentElement.querySelector(".data__input")) {
        window.textLooking = e.target.parentElement.parentElement.querySelector(".data__input").value;
    }

    if (document.querySelector(".search__input")) {
        localStorage.setItem("textLooking" ,document.querySelector(".search__input").value);
    }

    if (localStorage.getItem("textLooking")) {
        window.textLooking = localStorage.getItem("textLooking");
    }

    function lookingSuitableItems (arrayItems) {
        const
            arrayTextLooking = textLooking.split(" "),
            textIndexSuitableOptions = [],
            itemsBeenTested = [];

        arrayItems.forEach((word, indexWord) => {
            let
                arrayTitleText = word.textContent.split(" "),
                counter;

            arrayTitleText.forEach((item, index) => {
                let i = 0;
                while (i < item.length) {
                    if (
                        arrayTitleText[index][i] === "." ||
                        arrayTitleText[index][i] === "«" ||
                        arrayTitleText[index][i] === "»" ||
                        arrayTitleText[index][i] === "!" ||
                        arrayTitleText[index][i] === "?" ||
                        arrayTitleText[index][i] === "," ||
                        arrayTitleText[index][i] === ":" ||
                        arrayTitleText[index][i] === ";" ||
                        arrayTitleText[index][i] === "-"
                    ) {
                        arrayTitleText[index] = (arrayTitleText[index].substr(0, i) + " " + arrayTitleText[index].substr(i + arrayTitleText[index].length)).trim();
                    } else {
                        i++;
                    }
                }
            });

            arrayTextLooking.forEach(lookingText => {
                for (let i = 0; i < arrayTitleText.length; i++) {
                    if (lookingText.trim().toLowerCase() !== arrayTitleText[i].trim().toLowerCase()) {
                        if (counter === i) {
                            textIndexSuitableOptions.forEach((item, index) => {
                                if (item) {
                                    if (arrayTextLooking.length !== item[1]) {
                                        textIndexSuitableOptions[index] = null;
                                    }
                                }
                            });
                        }
                        counter = i++;
                    } else {
                        textIndexSuitableOptions.push([indexWord, 0]);

                        textIndexSuitableOptions.forEach(item => {
                            if (item) {
                                if (item[0] === indexWord) {
                                    item[1] += 1;
                                }
                            }
                        });
                    }
                }
            });
        });

        textIndexSuitableOptions.forEach(item => {
            if (item) {
                itemsBeenTested.push(arrayItems[item[0]].parentElement.parentElement.parentElement);
            }
        });

        return itemsBeenTested;
    }

    const
        articlesDesc = lookingSuitableItems(document.querySelectorAll(".article__desc")),
        articlesTitle = lookingSuitableItems(document.querySelectorAll(".article__title"));

    let
        counter = 0,
        counterIdenticalElements = 0;

    if (articlesDesc.length > articlesTitle.length) {
        articlesDesc.forEach(itemDesc => {
            articlesTitle.forEach(itemTitle => {
                if (itemDesc !== itemTitle) {
                    counter++;
                } else {
                    counterIdenticalElements++;
                }
            });
        });
        counter = counter + articlesTitle.length - counterIdenticalElements;
    } else {
        articlesTitle.forEach(itemTitle => {
            articlesDesc.forEach(itemDesc => {
                if (itemDesc !== itemTitle) {
                    counter++;
                } else {
                    counterIdenticalElements++;
                }
            });
        });

        counter = counter + articlesDesc.length - counterIdenticalElements;
    }

    function loadResult (arrayItems) {
        arrayItems.forEach((item, index) => {
            item.classList.remove("hidden");
            item.style.marginBottom = "20px";
            if (item.querySelector(".select")) {
                item.querySelector(".select").classList.add("hidden");
            }
            if (index === 0) {
                item.style.paddingTop = "20px";
                item.style.borderTop = "none";
            }
            document.querySelector(".result").classList.add("visibility");
            if (document.querySelector(".result")) {
                localStorage.setItem("textLooking", "");
            }
        });
    }

    document.querySelectorAll(".main--article").forEach(article => { article.classList.add("hidden"); });
    document.querySelectorAll(".article").forEach(article => { article.classList.add("hidden"); });

    loadResult(articlesDesc);
    loadResult(articlesTitle);

    if (articlesDesc.length === 0 && articlesTitle.length === 0 || textLooking === "" || textLooking === " ") {
        document.querySelectorAll(".main--article").forEach(item => {
            item.classList.add("hidden");
        });
        document.querySelectorAll(".article").forEach(item => {
            item.classList.add("hidden");
        });

        document.querySelector(".result").classList.add("visibility");
        document.querySelector(".result__no-result").classList.add("visibility");
        document.querySelector(".result__text-looking").textContent = textLooking;
    } else {
        document.querySelector(".result__no-result").classList.remove("visibility");
    }

    document.querySelector(".search__input").value = "";
    document.querySelector(".search").classList.remove("visible");
    document.querySelector(".result__input").value = textLooking;
    document.querySelector("body").style.overflow = "initial";
    document.querySelector("html").style.overflow = "initial";
}

document.querySelector(".search__submit").addEventListener("click", searchArticles);
if (document.querySelector(".result__submit-btn")) {
    document.querySelector(".result__submit-btn").addEventListener("click", searchArticles);
}


if (Boolean(localStorage.getItem("textLooking"))) {
    document.querySelector(".search__submit").click();
}