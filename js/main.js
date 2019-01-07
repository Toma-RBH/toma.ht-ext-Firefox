document.addEventListener("DOMContentLoaded", openToma);

function getCurrentTab() {
    return browser.tabs.query({currentWindow: true, active:true});
}

function openToma() {
    getCurrentTab().then((tab) => {
       browser.tabs.create({url:"https://toma.ht:/#/?url="+tab[0].url});
    })
}