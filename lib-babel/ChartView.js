import React, { PropTypes } from 'react'

const Chart = ( { data, hover, hout, clickInfo, hoverInfo, houtInfo } ) => (
	<div className="chart animated fadeIn" 
		style={{width:'100%',height:'100%',overflow:'auto',overflowY:'hidden',cursor:'default'}}>
		{(data.showTitle) ? 
			<div className="chart-title" style={{height: '40px',lineHeight: '40px'}}>
				{data.title}
			</div>
		: ""}
		<div className="chart-main">
			<svg className="chart-svg" stroke="#ccc" style={{width:'100%',height:'100%'}}>
				/* x-axis grid lines */
					{(data.showGrid) ? 		
						data.xAxisPoints.map( (item, i) =>
							<g key={i} stroke={data.chartStyle.gridColor}>
								<line x1={item+"%"} y1="90%" x2={item+"%"} y2="5%" />
							</g>
						)
					: ""}
				/* y-axis grid lines */	
					{(data.showGrid) ? 		
						data.yAxisPoints.map( (item, i) =>
							<g key={i} stroke={data.chartStyle.gridColor}>
								<line x1="10%" y1={item+"%"} x2="95%" y2={item+"%"} />
							</g>
						)
					: ""}
				/* axes lines */
					<g stroke={data.chartStyle.gridColor}>
						<line x1="10%" y1="90%" x2="10%" y2="5%" />
						<line x1="10%" y1="90.1%" x2="95%" y2="90.1%" />
					</g>
				/* y-axis text */
					{data.values.yAxisText.map( (yAxis, i) =>
						<g key={i} stroke={data.chartStyle.yAxisTextColor} 
							fontSize={data.chartStyle.yAxisTextSize}>
							<text alignmentBaseline="middle" textAnchor="end" 
									x="8%" y={data.yAxisPoints[i]+"%"}>
								{yAxis}
							</text>
						</g>
					)}
				/* x-axis text */
					{data.values.xAxisText.map( (yAxis, i) =>
						<g key={i} stroke={data.chartStyle.yAxisTextColor} 
							fontSize={data.chartStyle.xAxisTextSize}>
							<text alignmentBaseline="before-edge" textAnchor="middle" 
									y="92%" x={data.xAxisPoints[i]+"%"}>
								{yAxis}
							</text>
						</g>
					)}
				//lines
					{(data.showLines) ?
						data.values.colors.map( (item, i) =>
							<g key={i} stroke={item} fill={item}>
								{data.values.lines[i].map( (line, xi) =>
									<line key={xi} className={data.keys[i]+"-lines"} strokeLinecap="round"
										x1={data.values.lines[i][xi]['x1']+"%"} 
										y1={data.values.lines[i][xi]['y1']+"%"}
										x2={data.values.lines[i][xi]['x2']+"%"} 
										y2={data.values.lines[i][xi]['y2']+"%"}/>
								)}
							</g>
						)
					: ""}
				//points
					//inner circle
					{(data.showPoints) ? 
						data.values.colors.map( (item, i) =>
							<g key={i} stroke={item} fill={item}>
								{data.values.coordX[i].map( (x, xi) =>
									<circle key={xi} r="3"
										className={data.keys[i]+"-points"}
										value={data.values.real[i][xi]}
										name={data.values.xAxisText[xi]}
										title={data.keys[i]}
										id={"point"+xi+"-"+data.keys[i]+"-"+data.values.real[i][xi]}
									cx={data.values.coordX[i][xi]+"%"} cy={data.values.coordY[i][xi]+"%"}>
										<animate attributeType="CSS" attributeName="cy" dur="1s"
										from="90%" to={data.values.coordY[i][xi]+"%"} />
									</circle>
								)}
							</g>
						)
					: ""}
					//outer circle
					{(data.showPoints && data.showOuterPoints) ? 
						data.values.colors.map( (item, i) =>
							<g key={i} stroke={item} fill={item}>
								{data.values.coordX[i].map( (x, xi) =>
									<circle key={xi} r="5"
										fill="none"
										className={data.keys[i]+"-points"}
										value={data.values.real[i][xi]}
										name={data.values.xAxisText[xi]}
										title={data.keys[i]}
										id={"point"+xi+"-"+data.keys[i]+"-"+data.values.real[i][xi]}
										cx={data.values.coordX[i][xi]+"%"} 
										cy={data.values.coordY[i][xi]+"%"}>
										<animate attributeType="CSS" attributeName="cy" dur="1s"
										from="90%" to={data.values.coordY[i][xi]+"%"} />
									</circle>
								)}
							</g>
						)
					: ""}
					//hover rect
					{(data.showPoints) ? 
						data.values.colors.map( (item, i) =>
							<g key={i} stroke={item} fill={item}>
								{data.values.coordX[i].map( (x, xi) =>
									<rect key={xi} 
										fillOpacity="0"
										strokeOpacity="0"
										className={data.keys[i]+"-points"}
										value={data.values.real[i][xi]}
										name={data.values.xAxisText[xi]}
										title={data.keys[i]}
										id={"point"+xi+"-"+data.keys[i]+"-"+data.values.real[i][xi]} 
										onMouseOver={ (e) => ((data.showHover) ? hover(e) : "") }
										onMouseOut={ (e) => ((data.showHover) ? hout(e) : "") }
										x={(data.values.coordX[i][xi]-2)+"%"} 
										y={(data.values.coordY[i][xi]-4)+"%"}
										width="4%" height="8%">
										<animate attributeType="CSS" attributeName="cy" dur="1s"
										from="90%" to={data.values.coordY[i][xi]+"%"} />
									</rect>
								)}
							</g>
						)
					: ""}
			</svg>
		</div>
		{(data.showInfo) ? 
			<div className="chart-info" style={{height: '40px',lineHeight: '40px'}}>
				{data.keys.map( (item, i) =>
					<div key={i} style={{float: 'left', margin: '0 5px', padding: '0 5px'}}
					onMouseOver={ (e) => ((data.allowFilters) ? hoverInfo(e) : "") }
					onMouseOut={ (e) => ((data.allowFilters) ? houtInfo(e) : "") }
					onClick={ (e) => ((data.allowFilters) ? clickInfo(e) : "") }
					name="0" id={item} className="chart-info-item">
						<div className="chart-info-item-icon" style={{background:data.values.colors[i],
								float:'left',width:'16px',height:'16px',margin:'12px 6px'}}>
							&nbsp;
						</div>
						<div className="chart-info-item-text" style={{float:'left'}}>{item}</div>
					</div>
				)}
			</div>
		: ""}
		<div id="chartHoverIndex" className="chart-hover-index"
			style={{display:'none',position:'absolute',
borderTop:'10px solid transparent',
borderBottom:'10px solid transparent',
borderRight:'10px solid rgba(0,0,0,0.75)', 
			top:'0',left:'0',width:'0',height:'0',zIndex:'1'}}>
		</div>
		<div id="chartHover" className="chart-hover" style={{display:'none',background:'rgba(0, 0, 0, 0.75)',
			color:'#ddd',position:'absolute',top:'0',left:'0',width:'auto',height:'auto',
			padding:'5px 10px',borderRadius:'4px',zIndex:'2'}}></div>

	</div>
)

Chart.propTypes = {
	data: PropTypes.object.isRequired,
	hover: PropTypes.func.isRequired,
	hout: PropTypes.func.isRequired,
	clickInfo: PropTypes.func.isRequired,
	hoverInfo: PropTypes.func.isRequired,
	houtInfo: PropTypes.func.isRequired,
}

export default Chart