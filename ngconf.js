var bootcamp = angular.module("bootcamp", []);

bootcamp.directive('ngConf', [function () {
    return {
        restrict: "E",
        replace: true,
        template: "<canvas width='400' height='400' style='border:2px solid black;'></canvas>",
        link: function ($scope, element) {
            var context = element[0].getContext('2d');

            var isDrawing = false;

            function start(event) {
                isDrawing = true;
                context.moveTo(getX(event),getY(event));
                context.beginPath();
                event.preventDefault();
            }

            function draw(event) {
                if(isDrawing) {
                    context.lineTo(getX(event),getY(event));
                    context.stroke();
                }
                event.preventDefault();
            }

            function stop(event) {
                if(isDrawing) {
                    context.stroke();
                    context.closePath();
                    isDrawing = false;
                }
                event.preventDefault();
            }

            function getX(event) {
                if(event.type.indexOf("touch") != -1) {
                    return event.targetTouches[0].pageX - element[0].parentElement.parentElement.offsetLeft;
                }
                else {
                    return event.layerX;
                }
            }

            function getY(event) {
                if(event.type.indexOf("touch") != -1) {
                    return event.targetTouches[0].pageY - element[0].parentElement.parentElement.offsetTop;
                }
                else {
                    return event.layerY;
                }
            }

            function clear() {
                context.clearRect(0,0,element[0].width, element[0].height);
            }
            $scope.clear = clear;

            element.bind('touchstart', start);
            element.bind('touchmove', draw );
            element.bind('touchend', stop);
            element.bind('touchleave', stop);

            element.bind('mousedown', start);
            element.bind('mousemove', draw );
            element.bind('mouseup', stop);
            element.bind('mouseout', stop);
        }
    };

}]);