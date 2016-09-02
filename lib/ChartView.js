var React = require('react');

var Chart = function Chart(_ref) {
	var data = _ref.data;
	var hover = _ref.hover;
	var hout = _ref.hout;
	var clickInfo = _ref.clickInfo;
	var hoverInfo = _ref.hoverInfo;
	var houtInfo = _ref.houtInfo;
	return React.createElement(
		'div',
		{ className: 'chart animated fadeIn',
			style: { width: '100%', height: '100%', overflow: 'auto', overflowY: 'hidden', cursor: 'default' } },
		data.showTitle ? React.createElement(
			'div',
			{ className: 'chart-title', style: { height: '40px', lineHeight: '40px' } },
			data.title
		) : "",
		React.createElement(
			'div',
			{ className: 'chart-main' },
			React.createElement(
				'svg',
				{ className: 'chart-svg', stroke: '#ccc', style: { width: '100%', height: '100%' } },
				'/* x-axis grid lines */',
				data.showGrid ? data.xAxisPoints.map(function (item, i) {
					return React.createElement(
						'g',
						{ key: i, stroke: data.chartStyle.gridColor },
						React.createElement('line', { x1: item + "%", y1: '90%', x2: item + "%", y2: '5%' })
					);
				}) : "",
				'/* y-axis grid lines */',
				data.showGrid ? data.yAxisPoints.map(function (item, i) {
					return React.createElement(
						'g',
						{ key: i, stroke: data.chartStyle.gridColor },
						React.createElement('line', { x1: '10%', y1: item + "%", x2: '95%', y2: item + "%" })
					);
				}) : "",
				'/* axes lines */',
				React.createElement(
					'g',
					{ stroke: data.chartStyle.gridColor },
					React.createElement('line', { x1: '10%', y1: '90%', x2: '10%', y2: '5%' }),
					React.createElement('line', { x1: '10%', y1: '90.1%', x2: '95%', y2: '90.1%' })
				),
				'/* y-axis text */',
				data.values.yAxisText.map(function (yAxis, i) {
					return React.createElement(
						'g',
						{ key: i, stroke: data.chartStyle.yAxisTextColor,
							fontSize: data.chartStyle.yAxisTextSize },
						React.createElement(
							'text',
							{ alignmentBaseline: 'middle', textAnchor: 'end',
								x: '8%', y: data.yAxisPoints[i] + "%" },
							yAxis
						)
					);
				}),
				'/* x-axis text */',
				data.values.xAxisText.map(function (yAxis, i) {
					return React.createElement(
						'g',
						{ key: i, stroke: data.chartStyle.yAxisTextColor,
							fontSize: data.chartStyle.xAxisTextSize },
						React.createElement(
							'text',
							{ alignmentBaseline: 'before-edge', textAnchor: 'middle',
								y: '92%', x: data.xAxisPoints[i] + "%" },
							yAxis
						)
					);
				}),
				'//lines',
				data.showLines ? data.values.colors.map(function (item, i) {
					return React.createElement(
						'g',
						{ key: i, stroke: item, fill: item },
						data.values.lines[i].map(function (line, xi) {
							return React.createElement('line', { key: xi, className: data.keys[i] + "-lines", strokeLinecap: 'round',
								x1: data.values.lines[i][xi]['x1'] + "%",
								y1: data.values.lines[i][xi]['y1'] + "%",
								x2: data.values.lines[i][xi]['x2'] + "%",
								y2: data.values.lines[i][xi]['y2'] + "%" });
						})
					);
				}) : "",
				'//points //inner circle',
				data.showPoints ? data.values.colors.map(function (item, i) {
					return React.createElement(
						'g',
						{ key: i, stroke: item, fill: item },
						data.values.coordX[i].map(function (x, xi) {
							return React.createElement(
								'circle',
								{ key: xi, r: '3',
									className: data.keys[i] + "-points",
									value: data.values.real[i][xi],
									name: data.values.xAxisText[xi],
									title: data.keys[i],
									id: "point" + xi + "-" + data.keys[i] + "-" + data.values.real[i][xi],
									cx: data.values.coordX[i][xi] + "%", cy: data.values.coordY[i][xi] + "%" },
								React.createElement('animate', { attributeType: 'CSS', attributeName: 'cy', dur: '1s',
									from: '90%', to: data.values.coordY[i][xi] + "%" })
							);
						})
					);
				}) : "",
				'//outer circle',
				data.showPoints && data.showOuterPoints ? data.values.colors.map(function (item, i) {
					return React.createElement(
						'g',
						{ key: i, stroke: item, fill: item },
						data.values.coordX[i].map(function (x, xi) {
							return React.createElement(
								'circle',
								{ key: xi, r: '5',
									fill: 'none',
									className: data.keys[i] + "-points",
									value: data.values.real[i][xi],
									name: data.values.xAxisText[xi],
									title: data.keys[i],
									id: "point" + xi + "-" + data.keys[i] + "-" + data.values.real[i][xi],
									cx: data.values.coordX[i][xi] + "%",
									cy: data.values.coordY[i][xi] + "%" },
								React.createElement('animate', { attributeType: 'CSS', attributeName: 'cy', dur: '1s',
									from: '90%', to: data.values.coordY[i][xi] + "%" })
							);
						})
					);
				}) : "",
				'//hover rect',
				data.showPoints ? data.values.colors.map(function (item, i) {
					return React.createElement(
						'g',
						{ key: i, stroke: item, fill: item },
						data.values.coordX[i].map(function (x, xi) {
							return React.createElement(
								'rect',
								{ key: xi,
									fillOpacity: '0',
									strokeOpacity: '0',
									className: data.keys[i] + "-points",
									value: data.values.real[i][xi],
									name: data.values.xAxisText[xi],
									title: data.keys[i],
									id: "point" + xi + "-" + data.keys[i] + "-" + data.values.real[i][xi],
									onMouseOver: function onMouseOver(e) {
										return data.showHover ? hover(e) : "";
									},
									onMouseOut: function onMouseOut(e) {
										return data.showHover ? hout(e) : "";
									},
									x: data.values.coordX[i][xi] - 2 + "%",
									y: data.values.coordY[i][xi] - 4 + "%",
									width: '4%', height: '8%' },
								React.createElement('animate', { attributeType: 'CSS', attributeName: 'cy', dur: '1s',
									from: '90%', to: data.values.coordY[i][xi] + "%" })
							);
						})
					);
				}) : ""
			)
		),
		data.showInfo ? React.createElement(
			'div',
			{ className: 'chart-info', style: { height: '40px', lineHeight: '40px' } },
			data.keys.map(function (item, i) {
				return React.createElement(
					'div',
					{ key: i, style: { float: 'left', margin: '0 5px', padding: '0 5px' },
						onMouseOver: function onMouseOver(e) {
							return data.allowFilters ? hoverInfo(e) : "";
						},
						onMouseOut: function onMouseOut(e) {
							return data.allowFilters ? houtInfo(e) : "";
						},
						onClick: function onClick(e) {
							return data.allowFilters ? clickInfo(e) : "";
						},
						name: '0', id: item, className: 'chart-info-item' },
					React.createElement(
						'div',
						{ className: 'chart-info-item-icon', style: { background: data.values.colors[i],
								float: 'left', width: '16px', height: '16px', margin: '12px 6px' } },
						' '
					),
					React.createElement(
						'div',
						{ className: 'chart-info-item-text', style: { float: 'left' } },
						item
					)
				);
			})
		) : "",
		React.createElement('div', { id: 'chartHoverIndex', className: 'chart-hover-index',
			style: { display: 'none', position: 'absolute',
				borderTop: '10px solid transparent',
				borderBottom: '10px solid transparent',
				borderRight: '10px solid rgba(0,0,0,0.75)',
				top: '0', left: '0', width: '0', height: '0', zIndex: '1' } }),
		React.createElement('div', { id: 'chartHover', className: 'chart-hover', style: { display: 'none', background: 'rgba(0, 0, 0, 0.75)',
				color: '#ddd', position: 'absolute', top: '0', left: '0', width: 'auto', height: 'auto',
				padding: '5px 10px', borderRadius: '4px', zIndex: '2' } })
	);
};

Chart.propTypes = {
	data: React.PropTypes.object.isRequired,
	hover: React.PropTypes.func.isRequired,
	hout: React.PropTypes.func.isRequired,
	clickInfo: React.PropTypes.func.isRequired,
	hoverInfo: React.PropTypes.func.isRequired,
	houtInfo: React.PropTypes.func.isRequired
};

module.exports = Chart;