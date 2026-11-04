# Contact form to Google Sheets

Every enquiry from the contact page is added as a new row in your sheet.

1. Create a new Google Sheet, for example "BinaryLenz Enquiries".
2. In the sheet, open **Extensions > Apps Script**.
3. Delete the sample code, paste in everything from `contact-form.gs`, and save.
4. Click **Deploy > New deployment**. Click the gear icon and choose **Web app**.
5. Set **Execute as** to **Me** and **Who has access** to **Anyone**, then click **Deploy**.
6. Approve the permissions Google asks for.
7. Copy the **Web app URL**. It ends in `/exec`.
8. In the project folder, create a file called `.env.local` containing:

   ```
   VITE_CONTACT_ENDPOINT=https://script.google.com/macros/s/YOUR_ID/exec
   ```

9. Restart `npm run dev` and send a test message.
10. On your hosting provider, add the same `VITE_CONTACT_ENDPOINT` environment variable and rebuild.

If you edit the script later, use **Deploy > Manage deployments**, edit the deployment and pick **New version**, or the live form keeps using the old code.

Until the URL is set, the form falls back to opening the visitor's email app.
