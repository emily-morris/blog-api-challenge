# Blogging platform v1

[Github](https://github.com/emily-morris/blog-api-challenge)

* Serves client that:
    + makes AJAX calls back to API endpoints to initially retrieve and display existing blog posts
    + allows users to add, update, and delete blog posts
* Uses `express.Router` to route requests for `/blog-posts` to separate modules.
* CRUD (create, read, update, delete) operations for blog posts
* Note: uses volatile, in memory storage, since we haven't studied data persistence yet in the course.