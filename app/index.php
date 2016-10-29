<html>
  <head>
    <meta charset="UTF-8">
    <title>Shop - Statistics</title>
    <link rel="stylesheet" href="/../stat_app/bower_components/materialize/dist/css/materialize.css">
    <link rel="stylesheet" href="build/css/c3.css">
    <link rel="stylesheet" href="build/css/style.css">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Dosis:700">
  </head>
  <body>
    <div id="navigation"></div>
    <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>
    <div class="container col s4 offset-s2">
      <div id="dump"></div>
      <div id="main" class="non-footer">
        <!-- This is where our main React app will go -->
      </div>

    </div>
    <!-- <div id="footer"></div> -->
  </body>
  <script type="text/javascript" src="/../stat_app/bower_components/jquery/dist/jquery.js"></script>
  <script src="/../stat_app/bower_components/materialize/dist/js/materialize.js"></script>
  <script src="./build/main.js"></script>
  <script>
    $('.button-collapse').sideNav({
        menuWidth: 210 // Default is 240
      });
  </script>
</html>

