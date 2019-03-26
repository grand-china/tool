var page = {

    data: {
        pageIndex: -1,
        keyword: ""
    },

    config: {
        pages : [
            {
                title:"微博",
                url: "https://s.weibo.com/weibo/"
            },
            {
                title:"头条",
                url: "https://www.toutiao.com/search/?keyword=",
                mUrl: "https://m.toutiao.com/search/?keyword=",
            },
            {
                title:"百度",
                url: "https://www.baidu.com/s?wd=",
                mUrl: "",
            }
        ],
    },

    render: () => {
        page.setUpHeader()
        page.observer()
        page.onSearchAction()
    },

    setUpHeader: () => {

        var content =  `<form> 
        <input id ="searchInput" type="text" maxlength=255>
        </input>`

        content += `<div id="optionnav">`
        page.config.pages.forEach((obj,index) => {
            content += `<input type="button" 
            class="optionItem"
            onclick=page.onOptionLiAction(${index})
            value="${obj.title}">`
        })
        content += `</div>`
        content += `</form>`

        var container = Tool.ele.id("searchDiv")
        container.innerHTML =  content  
    },

    observer: () => {
        Tool.observer(page.data,(key) => {
            if (key === "pageIndex") {
                page.onSearchAction()
            }
        })
    },

    //Action
    onOptionLiAction: (index) => {
        page.data.keyword = Tool.ele.id("searchInput").value;
        if (Tool.string.isEmpty(page.data.keyword)) {
            return;
        }
        page.data.pageIndex = index;
    },

    // 去搜索
    onSearchAction: () => {
        var pageIndex = page.data.pageIndex
        var url =  page.config.pages[pageIndex].url
        var iframe = Tool.ele.id("searchContent")
        iframe.src = url + page.data.keyword
    },
}

window.onload = page.render