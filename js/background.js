
// create a context menu
browser.contextMenus.create({
    id:"analyseWithToma",
    title:"Analysez avec Toma"
});


// add action listener
browser.contextMenus.onClicked.addListener(do_action);

function do_action(info, tab){
    const url = "https://toma.ht/#/?url="+tab.url;
    
    browser.tabs.create({
        url:url
    });

}