Design:

1) The origin city list is retrieved from the json/flights.json file.

2) The destination city list is changed based on the origin city selected. The list is filtered based on the
available flights routes.

4) The list of the flights is retrieved from the json/flights_routes.json file.

5) Every time when a user performs a search, the flights list will be filtered based on the search fields provided
(the view will be redrew).

6. After a search, a price filtered will be applied on the filtered list if the refined price range is provided
(the row of the flight list will be fading in/out rather than redrawing the list).

Assumptions:
1) Since we don't have a real api server, we could not provide the flights for each single day. The search did not apply filter on the
departure date and return date. The view hard coded the departure date and return date to be the same a user entered.


Steps to run compile & run unit tests:

Run the following commands in a terminal or command prompt:

1) download & install NodeJS
Tool for managing node packages + compiling using javascript

2) npm install bower -g
Tool for managing front end packages/libraries

3) bower install
Installs packages for front end libs

3) npm install
Installs packages for backend / unit testing etc.

4) grunt
Runs the unit testing + compiling procedure.

5) node app.js
Hosts the website on the localhost:9999(compiled js)
The development environment can be accessed at localhost:9999/index-dev.html

Library & Tools:
jquey, jquery-ui, moment, require.js, select2, underscore,  nodejs, expressjs, bower, grunt, stylus, jslint,
karma, watch, and mocha
