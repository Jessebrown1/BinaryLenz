// Paste this into Extensions > Apps Script in your Google Sheet.
// Each contact form enquiry becomes one new row. Setup steps are in README.md.

const HEADERS = ["Received", "Name", "Email", "Project type", "Message"];
const MAX_LENGTH = 5000;

// A cell starting with these would run as a formula, so visitors' text is forced to plain text
function clean(value) {
  const text = String(value || "").trim().slice(0, MAX_LENGTH);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.website) return reply({ ok: true }); // hidden field only bots fill in
    if (!data.name || !data.email || !data.message) return reply({ ok: false, error: "missing fields" });

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    sheet.appendRow([new Date(), clean(data.name), clean(data.email), clean(data.type), clean(data.message)]);
    return reply({ ok: true });
  } catch (error) {
    return reply({ ok: false, error: "could not save" });
  }
}
