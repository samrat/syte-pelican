This is a fork of https://github.com/samrat/syte-pelican to add client side social integration.

Indeed, the Syte project originally ships with a django backed for social integration, as we do not need a server side application to work with Pelican, we have to find a way to keep the social integration client side.

This fork is quite messy, that's why I work exclusively on the `social-integration` branch.

The first commit is huge and breaks several things but I needed a clear view of what needed to be done in order to integrate the social feeds.

Changelog
---------

2012-10-03 06:42
* Removed less css during the time I'll hack on css files
* Removed requirejs temporarily, will put it back for release
* Broke responsive-ui (see issues for this)
* Add support for Github, Google+, Twitter and Instagram
* Add pygments.css for syntax highlighting
* Retrieved style.css from style.css.min
* Removed scripts.min.js to use vendor libraries (jquery, bootstrap, moment, spin, etc...) and added project related code into common.js and libs/*.js
