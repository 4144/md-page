document.addEventListener("DOMContentLoaded", function() {

    //styles
    var sheet = document.createElement('style')
    var styles = 'body { padding: 20; font-family:  "Helvetica Neue", Helvetica, Arial, sans-serif;} '
    styles += 'blockquote { padding: 0 1em; color: #6a737d; border-left: 0.25em solid #dfe2e5;} '
    styles += 'code { padding: 0.2em 0.4em; background: rgba(27,31,35,0.05); border-radius: 3px;} '
    styles += 'pre > code { background: none } '
    styles += 'pre { padding: 16px; overflow: auto; line-height: 1.45; background-color: #f6f8fa; border-radius: 3px; } '
    styles += 'table { border-collapse: collapse; } '
    styles += 'td, th {  border: 1px solid #ddd; padding: 10px 13px; } '
    sheet.innerHTML = styles
    document.head.appendChild(sheet);


    //handle github wrapping in pre
    var markdown = document.body.childElementCount == 1 ? document.body.firstElementChild.textContent : document.body.textContent;

    var converter = new showdown.Converter({
        emoji: true,
        underline: true,
    })
    converter.setFlavor('github')

    converter.addExtension(function () {
        return [{
            type: 'output',
            regex: /<a\shref.+">/g,
            replace : function (text) {
                var url = text.match(/"(.*?)"/)[1]
                if(url.includes(window.location.hostname) || url[0] == '/' || url[0] == '.'){
                    return text
                }
                return '<a href="' + url + '" target="_blank">'
            }
        }]
    }, 'externalLink')


    var html = converter.makeHtml(markdown);
    document.body.innerHTML = html
    document.title = document.title || document.body.firstElementChild.innerText.trim()

    //handle hash linking
    setTimeout(function() {
        var hash = window.location.hash
        window.location.hash = ''
        window.location.hash = hash
    }, 100)
})
