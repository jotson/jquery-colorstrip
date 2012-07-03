/*
colorstrip.js, a plugin for jQuery

Copyright (C) 2011 John Watson <john@flagrantdisregard.com>
flagrantdisregard.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

(function($) {
    var colorstrip = new Object;
    
    var settings = {
        maxInterval: 8000, /* milliseconds */
        minInterval: 4000, /* milliseconds */
        opacity: 0.5, /* 0..1 */
        minWidth: 10, /* percent */
        maxWidth: 80, /* percent */
        colors: ['#c00', '#0c0', '#00c']
    };
    
    var strips = [];
    var timeouts = [];
    
    colorstrip.start = function() {
        var s = colorstrip.target;
        for(var i=0; i<settings.colors.length; i++) {
            var e = $('<div>');
            e.css(
                {
                    height: '100%',
                    width: '30%',
                    position: 'absolute',
                    top: 0,
                    left: Math.random()*$(s).width(),
                    opacity: settings.opacity,
                    'background-color': settings.colors[i]
                }
            );
            strips.push(e);
            colorstrip.target.append(e);
            colorstrip.animate(e);
        }
    }

    colorstrip.animate = function(e) {
        if (e == undefined) return;
        
        var s = colorstrip.target;
        var n = strips.length;
        
        var left = $(e).position().left;
        var right = $(e).position().left + $(e).width();
        $(e).stop();
        if (left > $(s).width()) {
            $(e).css({left: -$(e).width(), 'z-index': Math.random()*n});
        }
        if (right < 0) {
            $(e).css({left: $(s).width(), 'z-index': Math.random()*n});
        }
        var range = $(s).width() + $(e).width();
        var timeout = Math.random()*(settings.maxInterval-settings.minInterval)+settings.minInterval;
        
        $(e).animate(
            {
                left: Math.random()*range - $(e).width(),
                width: (Math.random()*(settings.maxWidth-settings.minWidth)+settings.minWidth) + '%'
            }, timeout, 'easeInOutSine');
        
        timeouts.push(setTimeout(function(){colorstrip.animate(e)}, timeout));
    }
    
    colorstrip.stop = function() {
        for(var i=0;i<timeouts.length;i++) {
            clearTimeout(timeouts[i]);
        }
        for(var i=0;i<strips.length;i++) {
            strips[i].stop();
        }
    }
    
    $.fn.colorstrip = function(method, options) {
        if (typeof method == 'object') {
            $.extend(settings, method);
        }
        if (typeof options == 'object') {
            $.extend(settings, options);
        }
        if (colorstrip[method]) {
            colorstrip[method]();
        } else {
            colorstrip.target = this;
            colorstrip.start();
        }
    }
})(jQuery);