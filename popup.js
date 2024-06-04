document.getElementById('countButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: countAbacus
        }, (results) => {
            if (results && results[0] && results[0].result !== undefined) {
                document.getElementById('result').textContent = 
                    `'Abacus' found ${results[0].result} times.`;
            }
        });
    });
});

function countAbacus() {
    const searchTerm = 'Abacus';
    const bodyText = document.body.innerText;
    const regex = new RegExp(`\\b${searchTerm}\\b`, 'gi');
    const matches = bodyText.match(regex);
    return matches ? matches.length : 0;
}
