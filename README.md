# [My Portfolio project](https://gabriel-bondor.herokuapp.com/)

I wanted to avoid using Bootstrap and JQuery and create the front-end using pure CSS and vanilla JavaScript only. I also wanted to store all content in database, and display every page based on parameters in the database.

- Front-end:
  - HTML
  - CSS
  - Vanilla Javascript
- Back-end:
  - Node.js
  - Express
  - Mongoose
  - EJS

## Enviroment variables:

DB_CONNECT: MongoDB connect string  
MAILCHIMP_API_KEY  
MAILCHIMP_LIST_ID  
MAILCHIMP_SERVER_NUMBER  
GOOGLE_CLIENT_ID  
GOOGLE_CLIENT_SECRET  
GOOGLE_REFRESH_TOKEN  
GOOGLE_ACCESS_TOKEN  
EMAIL_USER: sender and recipient of the email (Google e-mail address)

## Site functionality:

- ### Database connection
  - All content is stored in database
  - DB_CONNECT environment variable stores the connection string to the MongoDB database server.
    - in my case, I'm using MongoDB Atlas.
  - The schema of the database, has to match the schemas defined in the models folder.
- ### Mailing list signup
  - MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, and MAILCHIMP_SERVER_NUMBER environment variables store the credentials to use the MailChimp API.
  - User can signup to a MailChimp mailing list.
  - Register on Mail Chimp for your own API key: https://mailchimp.com/
  - mailChimpUserKey: https://admin.mailchimp.com/account/api/
  - mailChimpListID: https://admin.mailchimp.com/lists/
  - mailChimpServerNumber: the last digits of your API key, eg: "us3"
- ### Message sending
  - User type in a contact message and send it as an email
  - The site uses Google Gmail API to send the email
    - Google API is not the easiest to use for sending emails to yourself, but I took it as a challange.
    - I used [this video](https://www.youtube.com/watch?v=JJ44WA_eV8E&ab_channel=Kif-Dev), to set up my google account: (Sry, not the best quality, but it works...)
    - [Google Developers Console](https://console.cloud.google.com/apis)
      - The domain verification was pretty straight forward, just upload a file, to the server to prove that you own the domain.
      - The oAuth verification process, is overkill considering that I only want to send a few emails to myself.
        - It asked for a "term of service" agreement that I clearly don't have.
        - It also asked for a youtube link where I explain how my site works... [Video](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
        - I didn't finish this process.
- ### Notifications
  - The site can display notification messages to communicate with the user.
- ### Switch between Light-mode and Dark-mode
  - The site has two color schemes.
  - The site automatically recognises the browser's default color scheme settings.
  - There's a button in the navbar that the user can use to switch between the two color schemes.
    - The site saves the user's last color scheme choice to the local storage, and automatically uses it during the next visit.

## Program structure

- ### Folders
  - #### views
    - EJS vievs of the pages
  - #### router
    - Express.js router
    - Connects the HTTP requests with the controller functions
  - #### controllers
    - index, introduction, projects & skills
      - are all controlled by page.js
    - page
      - uses models/page to load the content of the page from the database
      - renders the EJS view that's set in the database
    - newsletter
      - handles a POST request, and signs up the user to a mailchimp newsletter.
    - contact
      - handles a POST request, and sends an e-mail via GMAIL.
  - #### middleware
    - page.js:
      - I wanted to write a middleware for practising.
      - It loads variables that are used on every page.
        - contact details, social links.
  - #### models
    - database models:
      - pages
        - the content of every page loads from a record in the database
      - contacts
        - the contact details, that are present on every page
  - #### public/javascript
    - main
      - front-end functionality
        - Dark-mode toggler button
        - Small screen navbar toggler button
        - navbar color change on top of page
        - notifications
        - auto text typing
    - unfocus:
      - for accessible sites: https://github.com/nuclei/unfocus
