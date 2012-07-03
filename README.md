jQuery-colorstrip
=================

jQuery plugin for decorating web pages with animated strips of color.

[Click here for example](http://jotson.github.com/jquery-colorstrip/)

Use it like so:

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
    <script type="text/javascript" src='colorstrip.js'></script>

    <style type="text/css">
        #colorstrip {
            overflow: hidden;
            position: relative;
            height: 10px;
            width: 100%
        }
    </style>

    <div id="colorstrip"></div>

    <script type="text/javascript">
        jQuery(document).ready(
            function($) {
                $('#colorstrip').colorstrip(
                    {
                        minInterval: 6000,
                        maxInterval: 12000,
                        minWidth: 10,
                        maxWidth: 80,
                        opacity: 0.5,
                        colors: ['#f90', '#39c', '#c00', '#090', '#c3f', '#007', '#69f']
                    }
                );
            }
        );      
    </script>

You can also just use the defaults: `$('#colorstrip').colorstrip()`

`minWidth`, `maxWidth` in pixels controls how wide each strip can be.

`minInterval`, `maxInterval` in millseconds controls how often each strip changes its movement vector (its speed and direction).

`colors` is an array of color values that controls the quantity and color of color strips in the animation.