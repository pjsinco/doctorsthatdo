#Find Your DO app

* Sitepoint: [A Primer on Ajax in the WordPress Frontend: Actually Doing It](http://code.tutsplus.com/tutorials/a-primer-on-ajax-in-the-wordpress-frontend-actually-doing-it--wp-27073)
* StackEx: [How to filter the_content() & include content from template](http://wordpress.stackexchange.com/questions/133866/how-to-filter-the-content-include-content-from-template)
* Blog: [Use wp_localize_script, It Is Awesome](https://pippinsplugins.com/use-wp_localize_script-it-is-awesome/)
* StackEx: [How to publish a post with empty title and empty content?](http://wordpress.stackexchange.com/questions/28021/how-to-publish-a-post-with-empty-title-and-empty-content)
* StackEx: [plugin_dir_path() vs. plugins_url()](http://wordpress.stackexchange.com/questions/94838/when-would-i-use-either-function-for-plugins)
* Blog: [A Gentle Browserify Walkthrough](http://ponyfoo.com/articles/a-gentle-browserify-walkthrough)
* Github: [backbone.paginator](https://github.com/backbone-paginator/backbone.paginator)
> A pageable, drop-in replacement for Backbone.Collection called Backbone.PageableCollection.
* Github: [browserify-handbook](https://github.com/substack/browserify-handbook#shimming)
> This document covers how to use browserify to build modular applications.
* Blog: [Modernize Your WordPress JavaScript](https://webdevstudios.com/2015/09/03/modernize-wordpress-javascript/)
* SO: [Fetch Backbone collection with search parameters](http://stackoverflow.com/questions/12315973/fetch-backbone-collection-with-search-parameters)
* SO: [When I push a new URL to Backbone.history, the query params stays?](http://stackoverflow.com/questions/15165678/when-i-push-a-new-url-to-backbone-history-the-query-params-stays)
* SO: [Backbone structure for search form and results?](http://stackoverflow.com/questions/14206259/backbone-structure-for-search-form-and-results)
* SO: [navigate route with querystring](http://stackoverflow.com/questions/11671400/navigate-route-with-querystring)
* Blog: [Using jQuery plugins with npm](http://blog.npmjs.org/post/112064849860/using-jquery-plugins-with-npm)
* SO: [Backbone.js fetch with parameters](http://stackoverflow.com/questions/6659283/backbone-js-fetch-with-parameters)
* Github: [backbone.modal](https://github.com/awkward/backbone.modal)
> A plugin for Backbone.js that simplifies creating modals for your application. 
* brfs: [fs is not defined error when readFileSync is passed a path variable #36](https://github.com/substack/brfs/issues/36)
> path.join() is now supported, assuming you var path = require('path') beforehand.
```js
var hiddensTemplate = fs.readFileSync(
    path.join(__dirname,  '..', 'templates', 'location-hiddens.handlebars'), 
    'utf8'
);
```
* Tuts+: [An Introduction to Handlebars](http://code.tutsplus.com/tutorials/an-introduction-to-handlebars--net-27761)
* Blog: [Backbone - get or fetch](http://www.bennolan.com/2011/06/10/backbone-get-or-fetch.html)
* SO: [jQuery: FadeIn/To and SlideDown new element](http://stackoverflow.com/questions/9280051/jquery-fadein-to-and-slidedown-new-element)
```
var rendered = new ItemView(item).render();
$(rendered.el).appendTo(this.$el).hide().fadeIn().slideDown();
```
* [Simple loading spinner for backbonejs](http://abandon.ie/notebook/simple-loading-spinner-for-backbonejs)
* SO: [backbone collection fetch doesn't fire reset()](http://stackoverflow.com/questions/15603107/backbone-collection-fetch-doesnt-fire-reset)
> So, to trigger a reset event, you now have to use
```js
this.collection.fetch({reset: true})
```
* Github: [backbone.layoutmanager](https://github.com/tbranyen/backbone.layoutmanager)
> A layout and template manager for Backbone applications.
* Paginator Issue: [Sort mapping and query params suggestion #115](https://github.com/backbone-paginator/backbone-pageable/issues/115)
> You can do this as well:

```js
var list = new MyCollection([], {
  queryParams: _.defaults({
    sidx: "expectedStartDate",
    sord: "asc",
    filters: JSON.stringify(allFiltersJSON)
  }, MyCollection.prototype.queryParams);
});
```
* SO: [How do you get the previous url in Javascript?](http://stackoverflow.com/questions/3528324/how-do-you-get-the-previous-url-in-javascript)
> i ended up storing the previous url in cookies for the site, document.referrer doesn't always work. ```$.cookie("previousUrl", window.location.href, {path:"/"});```
* Blog: [WordPress Theme CSS and JS Cache Busting](https://wordimpress.com/wordpress-css-and-js-cache-busting/)

#CASTOFFS
* email template line in detail:
```
<% if (email != '') { %>
<a href="mailto:<%= email %>" class="fyd-detail__link"><i class="fa fa-envelope-o"></i>  Email Dr. <%= last_name %></a><br />
<% } %>
```
* distance
```html
<span class="fyd-results__sub"><i class="fa fa-crosshairs"></i> <%= distance %> miles</span><br />
```
* ResultsMetaView template: "Who practice Anesthesiology"
```
<% if (specialty) { %>
<div class="fyd-results__subhead">Who practice <%= specialty %></div>
<% } %>
```
* Pagination
```
<ul class="pager">
    <% if (hasPrevious) { %>
    <li><a href="#" id="previous">Previous</a></li>
    <% } %>
    <% if (hasNext) { %>
    <li><a href="#" id="next">Next</a></li>
    <% } %>
</ul>
```
* thumbnail in detail view
```
<% if (! _.isUndefined(thumbnail_url) { %>
<div class="fyd-detail__profileimagecontainer pull-left">
     <img class="fyd-detail__image img-responsive" src="http://placehold.it/135x135" />
</div>
<% } %>
```
* One iteration of trailing info
<li class="fyd-detail__listitem">More about Dr. <%= last_name %>:
    <ul>
        <% if (abms_cert == 1) { %>
        <li>Other <a href="http://certificationmatters.org/" target="_blank">board certifications</a>.</li>
        <% } %>
        <li><a href="https://www.google.com/#q=<%= first_name %>+<%=last_name %>+<%= city %>+<%= state %>">Google search</a> for Dr. <%= last_name %>.</li>
    </ul>
</li>
}>

* Tags
```
<li class="fyd-results__tag" id="radiusTag"><%= radius %> miles 
    <a href="<%= radius_url %>"><span data-role="remove"></span></a>
</li> 
```

* Buttons
```
<span class="input-group-btn">
    <button data-radius="25" class="radius-button btn  btn-<% radius == 25 ? print('info active') : print('default') %>"  type="button"  <% if (minDistance >= 25) { print('disabled="disabled"') }%>>25m</button>
    <button data-radius="50" class="radius-button btn  btn-<% radius == 50 ? print('info active') : print('default') %>"  type="button"  <% if (minDistance >= 50) { print('disabled="disabled"') }%>>50m</button>
    <button data-radius="100" class="radius-button btn  btn-<% radius == 100 ? print('info active') : print('default') %>" type="button" <% if (minDistance >= 100) { print('disabled="disabled"') }%>>100m</button>
    <button data-radius="250" class="radius-button btn  btn-<% radius == 250 ? print('info active') : print('default') %>" type="button" <% if (minDistance >= 250) { print('disabled="disabled"') }%>>250m</button>
</span>
```

#TODO
* Top-level specialties should be at top of suggestion list
* Explainer message when we expand beyond 25m
* Pull in photos of BOT

#REVAMPED HERO MARKUP
```php
<div class="outer-row">
    <div id="hero-wrapper" class="hero">
        <div class="pj--image--container">
            <img class="pj--image" src="<?php echo get_field( 'hero_image' )['url']?>" />
        <div class="hero--band">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-12 hero--message">
                        <?php the_field( 'hero_message' ); ?>
                    </div>
                </div>

                <!-- ETC. -->
``` 
