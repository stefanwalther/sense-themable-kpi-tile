define( [
		'jquery',
		'underscore',
		'./properties',
		'./initialproperties',
		'./lib/js/extensionUtils',
		'text!./lib/partials/template.ng.html',
		'text!./lib/css/style.css',
		'text!./config/layouts.json'
	],
	function ( $, _, props, initProps, extensionUtils, ngTemplate, cssContent, layoutsText ) {
		'use strict';

		extensionUtils.addStyleToHeader( cssContent, 'swr-coloredkpitile' );
		var layouts = JSON.parse( layoutsText );

		return {

			definition: props,
			initialProperties: initProps,
			snapshot: {canTakeSnapshot: true},
			template: ngTemplate,
			controller: ['$scope', '$element', function ( $scope, $element ) {

				/**
				 * Get either the property value or the default one.
				 * @param key
				 * @returns {*}
				 */
				$scope.get = function ( key ) {

					var defaults = {
						tileBackgroundColor: '#efefef',
						"titleColor": "#fff"
					};

					switch ( $scope.layout.props.layoutMode ) {
						case "default":
							return defaults[key];
							break;
						case "custom":
							return $scope.layout.props[key];
							break;
						case "template":
							var selectedTemplate = $scope.layout.props.layoutTemplate;
							return layouts[selectedTemplate][key];
							break;
					}
				};
				$scope.setStyles = function () {

					var padding = 14;
					var elemHeight = $element.height() - padding;

					// Tile
					$scope.tileStyle = {
						backgroundColor: $scope.get( 'tileBackgroundColor' )
					};

					// KPI Title
					$scope.titleStyle = {
						color: $scope.get( 'titleColor' ),
						fontSize: Math.max( (elemHeight / 10), 14 ) + 'px'
					};

					// KPI
					$scope.kpiStyle = {
						color: $scope.get( 'kpiColor' ),
						fontSize: Math.max( (elemHeight / 4), 12 ) + 'px',
						paddingTop: Math.max( (elemHeight / 6) ) + 'px'
					};

					$scope.kpiComparisonText = {
						fontSize: Math.max( (elemHeight / 7), 11 ) + 'px'
					};

					console.log( 'height', $element.height() );
					console.log( 'kpiStyle.fontSize', $scope.kpiStyle.fontSize );

				};

				$scope.$watch( function () {
					return $element.height()
				}, function ( newHeight, oldHeight ) {
					console.log( 'newHeight', newHeight );
					$scope.setStyles();
				} );

				$scope.setStyles();

			}
			]
		}
			;

	} )
;
