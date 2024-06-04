// Ensure this script only runs on PDF documents
if (document.contentType === 'application/pdf') {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "countAbacus") {
            const searchTerm = 'Abacus';
            const bodyText = document.body.innerText;
            const regex = new RegExp(`\\b${searchTerm}\\b`, 'gi');
            const matches = bodyText.match(regex);
            sendResponse(matches ? matches.length : 0);
        }
    });
}
