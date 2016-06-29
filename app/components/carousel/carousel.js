'use strict';

angular.module('myApp.carousel', [])

  .directive('carousel', [ function() {
    return {
      restrict: "E",
      templateUrl: "components/carousel/carousel.html" ,
      controller: 'CarouselCtrl',
      controllerAs: 'ctrl',
      link: function(scope, elem, attr){
        // set slider width
        var slidesCount = scope.ctrl.config.slides.length;
        scope.ctrl.slidesContainer.css("width", (100 * slidesCount) + '%');

        angular.element(document.querySelector('#next')).on('click touch', function(){
          scope.ctrl.next();
        });

        angular.element(document.querySelector('#continue')).on('click touch', function(){
          scope.ctrl.continue();
        });

        scope.ctrl.play();
      }
    }
  }])

  .controller('CarouselCtrl', ['$window', '$timeout', function($window, $timeout) {
    this.config = {
      autoslide: false,
      delay: 3000,
      slides: [
        {
          "country": "Poland",
          "flag": "/assets/flags/PL.svg",
          "link": "https://en.wikipedia.org/wiki/Poland"
        },
        {
          "country": "United Kingdom",
          "flag": "/assets/flags/GB.svg",
          "link": "https://en.wikipedia.org/wiki/United_Kingdom"
        },
        {
          "country": "Spain",
          "flag": "/assets/flags/EA.svg",
          "link": "https://en.wikipedia.org/wiki/Spain"
        }
      ]
    };
    this.currentSlide = 0;
    this.slidesContainer = angular.element(document.querySelector('#slides'));
    this.sliderOffset = 0;

    this.play = function() {
      if (this.config.autoslide) {
        $timeout(angular.bind(this, function(){
          this.next();
          this.play();
        }), this.config.delay);
      }
    };

    this.next = function() {
      var slideWidth = document.querySelector('.slide').offsetWidth;
      this.currentSlide = (this.config.slides.length == this.currentSlide+1) ? 0 : this.currentSlide + 1;
      this.sliderOffset = this.currentSlide * slideWidth;
      this.slidesContainer.css("transform", "translateX(-" + this.sliderOffset + "px)");
    };

    this.continue = function() {
      $window.location.href = this.config.slides[this.currentSlide].link;
    }

  }])

  .directive('slide', [ function() {
    return {
      restrict: "EA",
      templateUrl: "components/carousel/slide.html" ,
      require: '^carousel'
    }
  }])
;