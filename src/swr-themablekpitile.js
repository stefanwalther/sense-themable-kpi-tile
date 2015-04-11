define( [
		'jquery',
		'underscore',
		'./properties',
		'./lib/js/extensionUtils',
		'text!./lib/partials/template.ng.html',
		'text!./lib/css/style.css',
		'text!./config/layouts.json'
	],
	function ( $, _, props, extensionUtils, ngTemplate, cssContent, layoutsText ) {
		'use strict';

		extensionUtils.addStyleToHeader( cssContent, 'swr-themablekpitile' );
		var layouts = JSON.parse( layoutsText );

		return {

			initialproperties: {
				showTitles: false
			},
			definition: props,
			snapshot: {canTakeSnapshot: true},
			template: ngTemplate,
			controller: ['$scope', '$element', '$sce', function ( $scope, $element, $sce ) {

				console.log( '$scope', $scope );

				/**
				 * Get either the property value or the default one.
				 * @param key
				 * @returns {*}
				 */
				$scope.get = function ( key ) {

					var defaults = {
						tileBackgroundColor: "#F8F8F8",
						"titleColor": "#333333",
						"comparisonPositiveColor": "#006600",
						"comparisonNegativeColor": "#CC0000",
						"comparisonNeutralColor": "#333333",
						"comparisonPositiveIcon": "&#9650;",
						"comparisonNegativeIcon": "&#9660;",
						"comparisonNeutralIcon": "&#9654;"
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

					console.log( 'setStyles >> height', $element.height() );

					var padding = 14; // 7 top and bottom
					var elemHeight = $element.height() - padding;

					// Tile
					$scope.tileStyle = {
						backgroundColor: $scope.get( 'tileBackgroundColor' )
					};

					// KPI Title
					$scope.titleStyle = {
						color: $scope.get( 'titleColor' ),
						fontSize: Math.max( (elemHeight / 6), 12 ) + 'px'
					};

					// KPI
					$scope.kpiStyle = {
						color: $scope.get( 'kpiColor' ),
						fontSize: Math.max( (elemHeight / 4), 12 ) + 'px',
						paddingTop: Math.max( (elemHeight / 10) ) + 'px'
					};

					// KPI Comparison
					$scope.kpiComparison = {
						fontSize: Math.max( (elemHeight / 6), 10 ) + 'px',
						color: getKpiComparisonColor()
					};

					// KPI Icon (not a style, but normal binding)
					setKpiIcon();

				};

				function getKpiComparisonColor () {
					if ( $scope.layout.props.kpiComparison > 0 ) {
						return $scope.get( 'comparisonPositiveColor' );
					} else if ( $scope.layout.props.kpiComparison < 0 ) {
						return $scope.get( 'comparisonNegativeColor' );
					} else {
						return $scope.get( 'comparisonNeutralColor' );
					}
				}

				function setKpiIcon () {
					console.log( 'kpiComparison', $scope.layout.props.kpiComparison );
					console.log( '$scope.layout', $scope.layout );
					if ( $scope.layout.props.kpiComparison > 0 ) {
						$scope.kpiIcon = $sce.trustAsHtml( $scope.get( 'comparisonPositiveIcon' ) );
					} else if ( $scope.layout.props.kpiComparison < 0 ) {
						$scope.kpiIcon = $sce.trustAsHtml( $scope.get( 'comparisonNegativeIcon' ) );
					} else {
						$scope.kpiIcon = $sce.trustAsHtml( $scope.get( 'comparisonNeutralIcon' ) );
					}
				}

				$scope.$watch( function () {
					return {
						h: $element.height(),
						w: $element.width()
					}
				}, function ( newVal, oldVal ) {
					if ( newVal.h !== oldVal.h || newVal.w !== oldVal.w ) {
						console.log( 'element dimensions', {newVal: newVal, oldVal: oldVal} );
						$scope.setStyles();
					}
				}, true );

				// Properties watch
				$scope.$watch( function () {
					return {
						kpiComparison: $scope.layout.props.kpiComparison,
						layoutMode: $scope.layout.props.layoutMode,
						layoutTemplate: $scope.layout.props.layoutTemplate

					}
				}, function ( newVal, oldVal ) {
					if ( (newVal.kpiComparison !== oldVal.kpiComparison) ||
						(newVal.layoutMode !== oldVal.layoutMode) ||
						(newVal.layoutTemplate !== oldVal.layoutTemplate)
					) {
						console.log( 'watch kpiComparsion', {newVal: newVal, oldVal: oldVal} );
						$scope.setStyles();
					}
				}, true );

				$scope.setStyles();

			}
			]
		}
			;

	} )
;
