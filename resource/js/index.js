
var page = {
  data: {
      leftshow: false,
      pageIndex: 0,
  },
  config: {
    pages:[{
      title:"聚能搜",
      url:"./pages/search/search.html"
    },{
      title:"聚热点",
      url:"./pages/search/search.html"
    },{
      title:"吃啥？",
      url:"./pages/search/search.html"
    },],
  },

  reset: () => {
    page.data.leftshow = false;
  },

  render: () => {
    // click 
    document.body.addEventListener("click",(event) => {
      let ele = event.target;
      page.onNavBtnAction(ele)
    });
    
    // observer state
    Tool.observer(page.data,(key,newValue,obj) => {
      if (key == "leftshow") {
        page.animate(Tool.ele.id("leftContainer"),newValue)
      }
      else if (key == "pageIndex") {
        page.reloadContentData();
      }
    });
    // fill UI
    page.configLeftBtns();
    page.reloadContentData();
  },

  configLeftBtns: () => {
    var container = Tool.ele.id("leftContainer");
    var str = '<ol>';
    page.config.pages.forEach((obj,index) => {
      str = str  + `<li onclick=page.onleftBtnClick(${index}) >` + obj.title + "</li>"
    });
    str += "</ol>"
    container.innerHTML = str;
  },

  onleftBtnClick: (index) => {
    page.data.pageIndex = index;
  },

  reloadContentData: () => {
    var index = page.data.pageIndex
    var url = page.config.pages[index].url
    var iframe = Tool.ele.id("content")
    iframe.src = url
    console.log(url)
  },

  // mark: left animate
  onNavBtnAction: (btn) => {
    if (btn === Tool.ele.id("leftNavBtn")) {
      page.data.leftshow = !page.data.leftshow;
    }
    else {
      page.reset();
    }
  },

  animate(ele,isShow) {
    var tag =  ele.getAttribute("tag")
    if (tag === "1") {
      ele.className = (isShow ? "opcontianer leftshow" : "opcontianer lefthide")
    }
  },
}

window.onload = page.render;