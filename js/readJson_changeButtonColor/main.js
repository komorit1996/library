const checkClass = document.querySelectorAll(".check");

fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(element => {
            const idName = '#' + element.id;
            const checkElement = document.querySelector(idName);
            if (checkElement) {
                if (element.crowded === "yes") {
                    checkElement.classList.add("crowded");
                }
            }
        });
    })
    .catch(error => {
        console.log('ファイルの読み込みエラー:', error);
    });

/* button event */
checkClass.forEach(element => {
    element.addEventListener("click", () => {
        const listItem = element.parentElement;
        // seminar contain parent element li

        if (listItem.classList.contains("crowded")) {
            console.log("クラス名: crowded が含まれています。");
            // crowded クラスが含まれる場合の処理
            element.innerHTML = 'fully';
            element.classList.add("red")

        } else {
            console.log("クラス名: crowded が含まれていません。");
            element.innerHTML = 'empty';
            element.classList.add("green")
        }
    });
});
