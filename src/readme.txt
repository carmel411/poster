This is a client side of a story publishing site. The site is intended for parents, teachers and children in the religious community and now the site is running and its address is https://readandgrow.web.app/home.
Server Side - https://github.com/carmel411/back
Client side - https://github.com/carmel411/poster

The client side uses angular + typescript.

The site is designed for four types of users: guest, registered user, writer and administrator.
A guest can only read content on the site.
A registered user can also mark his favorites and the data is saved in the database.
A writer (who has received permission from the webmaster) can also upload new stories to the site and also has the option to edit and delete stories that he himself has uploaded.
The administrator has the ability to edit and delete any story and in addition he can manage the users and give or remove writing permission to the other users.

Each user who registers for the site produces an encrypted TOKEN using JWT. The token restored in session memory. If the user mark 'remember me' the email & password stored in local storage (but not the token, to prevent entering after password change).

Site components:
Home page, showing recent stories as well as buttons for the main categories of stories as well as a search field.
The login and registration page is divided into tabs. With password recovery option. Verification of the various fields according to needs.
A page about the number about the project.
Presentation of a list of stories - This is a page with several display options: presentation according to a specific tag, presentation according to a search for a specific phrase and presentation of stories marked as favorites (for a registered user).
A registered user is also shown a page of editing his profile, on this page you can also upload a profile picture that is reduced and converted to a string, the picture is displayed in the menu bar with the username.
A user with write permission can also access the Add Story page, as well as view any story he has uploaded an edit and delete button.
An administrator also gets access to a user management page and can delete and edit any story.