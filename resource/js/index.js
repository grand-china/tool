
var page = {
  data: {
      leftshow: false,
      pageIndex: 0,
  },
  config: {
    leftPages:["聚能搜","聚热门","吃啥？"],
    pageUrls: ['./pages/search/search.html']
  },
  
  reset: () => {
    page.data.leftshow = false;
  },

  render: () => {
    // click 
    document.body.addEventListener("click",(event) => {
      let ele = event.target;
      console.log(ele)
      page.onNavBtnAction(ele)
    });
    Tool.ele.id("leftContainer").addEventListener("click",(event) => {
      event.stopPropagation()
    });

    // observer state
    Tool.observer(page.data,(key,newValue,obj) => {
      if (key == "leftshow") {
        page.animate(Tool.ele.id("leftContainer"),newValue)
      }
    });
    
    // fill UI
  },

  // after request reload Ui
  reloadUI() {
    Tool.ele.queryAll("a").forEach(node => {
        node.target = "_blank";
    }); 
  },
  
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