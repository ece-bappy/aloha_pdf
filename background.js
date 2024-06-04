chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: countAbacus
    });
});

function countAbacus() {
    const searchTerm = 'Abacus';
    const bodyText = document.body.innerText;
    const regex = new RegExp(`\\b${searchTerm}\\b`, 'gi');
    const matches = bodyText.match(regex);
    chrome.runtime.sendMessage({ action: 'showCount', count: matches ? matches.length : 0 });
}
