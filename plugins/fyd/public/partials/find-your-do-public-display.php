<script id="fydResults" type="text/template">
    <div id="results">
        <div id="resultsMain"></div>

            <div id="resultsMeta">
            </div> <!-- #resultsMeta -->

            <div id="resultsFilter">
            </div> <!-- #resultsFilter -->

            <div id="resultsDetail">
            </div> <!-- #resultsDetail -->

            <div id="resultsBody">
            </div> <!-- #resultsBody -->

        <div id="resultsSide"></div>
    </div>
</script>

<script id="fydPhysicianListItem" type="text/template">
    <h6 class="fyd-results__kicker"><%= specialty %><span class="fyd-results__kickersub"><%= experience %></span></h6>
    <h3 class="fyd-results__name">
        <a href="find-your-do#physicians/<%= id %>">
            <% if (prefix != '') { %><%= prefix %> <% } %>
            <%= first_name %> 
            <% if (middle_name != '') { %><%= middle_name %> <% } %>
            <%= last_name %>,
            <% if (suffix != '') { %><%= suffix %>, <% } %>
            <%= designation %>
        </a>
        <% if (aoa_cert == 1) { %><span class="fyd-results__imagecontainer"><img src=" 
            <%= fydSettings.imagePath %>/caduseus28.png" /></span>
        <% } %>
    </h3>
    <div class="fyd-results__body"><p data-lat=<%= lat %> data-lon=<%= lon %>>
        <% if (addr_2) { %><%= addr_2 %><br /><% } %>
        <%= addr_1 %><br/ >
        <%= city %>, <%= state %> <%= zip %><br />
    </p></div>
</script>

<script id="fydResultsMeta" type="text/template">
    <div class="row fyd-results__head">
        <div class="col-sm-12">
            <div><%= pagination.total %> <%= who %> near <%= city %>, <%= state %></div>
            <% if (specialty) { %>
                <div class="fyd-results__tag" id="specialtyTag"><%= specialty %>
                    <a href="<%= specialty_url %>"><span data-role="remove"></span></a>
                </div>
            </ul>
            <% } %>
        </div>
    </div>
    <div class="fyd-results__filter row">
        <div class="col-xs-12 col-sm-6">
            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-btn">
                        <button data-radius="25" class="radius-button btn  btn-<% radius == 25 ? print('info active') : print('default') %>"  type="button">25m</button>
                        <button data-radius="50" class="radius-button btn  btn-<% radius == 50 ? print('info active') : print('default') %>"  type="button">50m</button>
                        <button data-radius="100" class="radius-button btn  btn-<% radius == 100 ? print('info active') : print('default') %>" type="button">100m</button>
                        <button data-radius="250" class="radius-button btn  btn-<% radius == 250 ? print('info active') : print('default') %>" type="button">250m</button>
                    </span>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 pull-right">
            <div class="fyd-results__sort">
                <label class="fyd-results__label">Sort by</label>
                <select class="fyd-results__select">
                    <option value="distance" <% if (selected == 'distance') { print('selected'); } %>>Distance</option>
                    <option value="last_name" <% if (selected == 'last_name') { print('selected'); } %>>Name</option>
                    <option value="YearOfGraduation" <% if (selected == 'YearOfGraduation') { print('selected'); } %>>Experience</option>
                </select>
            </div>
        </div>
    </div>
</script>

<script id="fydDetail" type="text/template">
    <div class="fyd-detail__header">
        <h3 class="fyd-detail__specialty"><strong><%= specialty %></strong></h3>
        <h1 class="fyd-detail__name">
            <% if (prefix != '') { %><%= prefix %> <% } %>
            <%= first_name %> 
            <% if (middle_name != '') { %><%= middle_name %> <% } %>
            <%= last_name %>,
            <% if (suffix != '') { %><%= suffix %>, <% } %>
            <%= designation %>
        </h1>
        <h6 class="fyd-detail__meta"><%= experience %> experience&nbsp;&bull;&nbsp;<%= gender %></h6>
    </div>
    <div class="fyd-detail__body">
        <% if (aoa_cert == 1) {  %>
        <div class="fyd-detail__boardcertcontainer pull-right">
            <img src="<%= fydSettings.imagePath %>/caduseus150.png" />
        </div>
        <% } %>
        <h6 class="fyd-detail__subhead">Office location</h6>
        <h4 class="fyd_detail__info">
          <% if (addr_2 != '') { %>
             <%= addr_2 %><br />
          <% } %>
          <%= addr_1 %><br /> 
          <%= city %>, <%= state %> <%= zip %><br />
        </h4>
        <% if (phone != '' || website != '') { %>
        <h6 class="fyd-detail__subhead">Contact</h6>
        <h4 class="fyd_detail__info">
          <% if (phone != '') { %>
          <i class="fa fa-phone"></i> <%= phone %><br />
          <% } %>
          <% if (website != '') { %>
          <a href="<%= website %>" class="fyd-detail__link"><%= website %></a><br />
          <% } %>
        </h4>
        <% } %>
        <h6 class="fyd-detail__subhead">About Dr. <%= last_name %></h6>
        <ul class="fyd-detail__list">
            <% if (aoa_cert == 1) { %>
            <li class="fyd-detail__listitem">Dr. <%= last_name %> is AOA board-certified in <%= aoa_certs %>.</li>
            <% } %>
            <% if (secondary != 'BLANK') { %>
            <li class="fyd-detail__listitem">Dr. <%= last_name %> also specializes in <%= secondary %>.</li>
            <% } %>
            <% if (fellow != '') { %>
            <li class="fyd-detail__listitem">Dr. <%= last_name %> is a fellow of the <%= fellow %>.</li>
            <% } %>
            <li class="fyd-detail__listitem">Dr. <%= last_name %> graduated in <%= grad_year %> from the <%= school %>.</li>
            <% if (abms_cert == 1) { %>
            <li class="fyd-detail__listitem">Learn about Dr. <%= last_name %>'s other <a href="http://certificationmatters.org/" target="_blank">board certifications</a>.</li>
            <% } %>
            <li class="fyd-detail__listitem"><a href="https://www.google.com/#q=<%= first_name %>+<%=last_name %>+<%= city %>+<%= state %>" target="_blank">Google search</a> for Dr. <%= last_name %>.</li>
        </ul>
    </div>
    <div class="fyd-detail__note">
        Please note that all practice focus areas and specialties are self-reported.
    </div>
</script>

<script type="text/html" id="fydPagination">
    <div class="postsNavWrapper" align="center">
        <div class="postsNav buttonContainer">
            <% if (hasPrevious) { %>
            <a href="#" id="previous"><span>&lsaquo;&nbsp;</span>Previous</a>
            <% } %>
            &nbsp;&nbsp;&nbsp;
            <% if (hasNext) { %>
            <a href="#" id="next">Next<span>&nbsp;&rsaquo;</span></a>
            <% } %>
        </div>    
    </div>    
</script>

<script id="fydDetailSidebarMap" type="text/template">
    <div id="sidebar">
        <div class="sideBar_ElementHolder sideBar_MapElementHolder">
            <div class="sideBar_GoogleMapHolder">
                <div id="googleMapWrapper" class="desktop-only"><img src="http://placehold.it/600x600"></div>
            </div>
            <div class="sideBar_MapList">
                <div data-lat="<%= lat %>" data-lng="<%= lon %>" data-map_id="" class="sideBar_MapListAddress">
                    <div id="sideBar_ClickableElement_814" class="sideBar_MapAddressElement nameText">Dr. <%= last_name %>'s office</div>
                    <div class="sideBar_MapAddressElement addressText1"><%= addr_2 %></div>
                    <div class="sideBar_MapAddressElement addressText2"><%= addr_1 %></div>
                    <div class="sideBar_MapAddressElement cityStateZipText"><%= city %>, <%= state %> <%= zip %></div>
                    <div class="sideBar_MapAddressElement phoneText desktopOnly">Phone: <%= phone %></div>
                    <div class="sideBar_MapAddressElement phoneText mobileOnly"><a href="tel://<%= phone %>" class="button">Call Now</a></div>
                </div>
            </div> <!-- .sideBar_MapList -->
        </div> <!-- .sideBar_ElementHolder.sideBar_MapElementHolder -->
    </div> <!-- #sidebar -->
</script>
