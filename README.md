# BIGIO Fullstack Dev - Take Home Challenge

## <a name="introduction"></a> Introduction :
The web application is designed to manage and showcase a collection of stories. It encompasses various features to handle the creation, editing, viewing, and searching of stories, as well as their associated chapters.

I am using Express.js and MySQL on the backend side, and React.js with TailwindCSS on the frontend side. This project is also equipped with the Quill Rich Text Editor.


## Table of Contents

- [BIGIO Fullstack Dev - Take Home Challenge](#bigio-fullstack-dev---take-home-challenge)
  - [ Introduction :](#-introduction-)
  - [Table of Contents](#table-of-contents)
  - [ Features :](#-features-)
  - [ Libraries :](#-libraries-)
  - [ Project Structure :](#-project-structure-)
  - [ Website URL :](#-website-url-)

## <a name="features"></a> Features :
- `Story List` : The Story List feature provides a centralized view of all stories, allowing users to efficiently navigate and manage their content. It includes essential details such as title, author, category, tags/keywords, and status.
  
- `Search Filter by name or author` : Users can leverage a powerful search functionality to filter stories based on either the name or the author. This ensures quick and targeted access to specific stories within the collection.
  
- `Filter Menu by Category and Status` : The application enhances user experience by incorporating a filter menu, accessible through a popup modal, allowing users to categorize and filter stories based on predefined categories and status attributes.
  
- `Add Story` : The Add Story feature empowers users to seamlessly create new stories. It includes sections for capturing general information such as title, author, synopsis, category, story cover, tags/keywords, and status. Additionally, users can dynamically add and manage chapters within a story.
  
- `Edit Story` : The Edit Story feature facilitates the modification of existing stories. Users can effortlessly update information in all fields, ensuring a flexible and user-friendly editing experience.
  
- `Delete Story` : This functionality enables users to remove stories that are no longer relevant or needed, contributing to efficient content management.
  
- `Story Detail` : The Story Detail feature offers a read-only view of a particular story, providing comprehensive details while preventing any unintended modifications. This ensures a secure and controlled viewing experience for users exploring story specifics.

## <a name="libraries"></a> Libraries :
- `Express.js`
- `MySQL`
- `React.js`
- `TailWindCSS`
- `Quill Rich Text Editor`

## <a name="project-structures"></a> Project Structure :
* `backend/config` : Js Connection to database
* `backend/controllers` : Endpoint API for CRUD
* `backend/models` : Object-Relational Mapping using Sequelize
* `backend/routes` : Routes File
* `src/Assets` : Contains icon
* `src/Components` : Navbar.jsx, Sidebar.jsx
* `src/Pages` : AddChapter.jsx, AddStory.jsx, Home.jsx

## <a name="apk-link"></a> Website URL :
Attach the link of your deployed project or youtube link here