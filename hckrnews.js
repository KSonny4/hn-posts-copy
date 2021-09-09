// https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard
function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    // Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}


function collectCheckedCheckboxesAndCopyThemToClipboard() {
    var checkboxes = document.querySelectorAll(".hckr-checkbox-save");
    hckrnewsLinks = []
    for (var checkbox of checkboxes.values()) {
        if (checkbox.checked) {
            liElement = checkbox.parentElement
            hnLink = liElement.querySelector(".hn").getAttribute("href");
            article = liElement.querySelector(".link");
            articleLink = article.getAttribute("href");
            articleName = article.text;

            hckrnewsLinks.push(`${articleName.trim()} ${articleLink} ${hnLink}`)
        }
    }
    copyToClipboard(hckrnewsLinks.join("\n"))
}


function changeSelectedRowBackground() {
    if (this.checked)
        this.parentElement.setAttribute("style", "background-color: #c7c7bf; display:flex;");
    else
        this.parentElement.setAttribute("style", "background-color: white; display:flex;");
}

// Create "Copy links" button
var button = document.createElement('button');
button.innerHTML = "Copy links";
button.setAttribute("style", "position:fixed; left:20px; top:20px;");
button.addEventListener("click", collectCheckedCheckboxesAndCopyThemToClipboard);

// Add button to body
document.body.appendChild(button)

// To each post, append checkbox
var posts = document.querySelectorAll(".entry.row")
document.querySelectorAll(".span15").forEach(element => {
    element.style.width = "auto"
})
for (var value of posts.values()) {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "copy-checkbox";
    checkbox.className = "hckr-checkbox-save";

    checkbox.addEventListener("change", changeSelectedRowBackground);
    checkbox.setAttribute("style", "margin-right:-15px; width:30px; height:30px")
    value.setAttribute("style", "display:flex;");
    value.prepend(checkbox);
}