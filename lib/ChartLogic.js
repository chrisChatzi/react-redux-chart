import { connect } from 'react-redux'
import ChartView from './ChartView'

var parsed = {}

const mapStateToProps = (state, ownProps) => {
	var data = ownProps.data
	var parsedData = parseData(data)
	parsed = parsedData
	return {
		data: parsedData
	}
}

function parseData(data){
	//vars
	var errors = false
	var errorsLog = ""
	var colors = data.chartStyle.colors
	//checks
	if(typeof data.title === 'undefined') data.title = "react-redux-chart"
	if(typeof data.showTitle === 'undefined') data.showTitle = true
	if(typeof data.showInfo === 'undefined') data.showInfo = true
	if(typeof data.showGrid === 'undefined') data.showGrid = true
	if(typeof data.showPoints === 'undefined') data.showPoints = true
	if(typeof data.showOuterPoints === 'undefined') data.showOuterPoints = true
	if(typeof data.showLines === 'undefined') data.showLines = true
	if(typeof data.showHover === 'undefined') data.showHover = true
	if(typeof data.allowFilters === 'undefined') data.allowFilters = true
	if(!data.yAxisPoints || isNaN(data.yAxisPoints)) data.yAxisPoints = 5
	if(!data.xAxisValues || data.xAxisValues.length < 1){
		errors = true
		errorsLog += "No x-axis values passed to the chart\n"
	}
	if(typeof data.values === 'undefined'){
		errors = true
		errorsLog += "No values passed to the chart\n"
	}
	var keyCount = 0;
	for(var key in data.values){
		keyCount++
		if(data.values[key].length == 0){
			errors = true
			errorsLog += "Data array of '"+key+"' has no values\n"
		}else{
			if(data.values[key].length != data.xAxisValues.length){
				errors = true
				errorsLog += "Data array of '"+key+"' has different number of values compared to the x-axis\n"
			}
		}
	}
	if(keyCount > data.chartStyle.colors.length)
		console.warn("Colors are less than keys. Every additional key will have the default #ccc color");
	if(errors){
		throw new Error(errorsLog)
		return
	}
	//x-axis
	var xAxisPoints = []
	var xAxisStep = (95-10) / (data.xAxisValues.length - 1)
	for(var i=0; i<data.xAxisValues.length; i++) xAxisPoints.push(10 + (xAxisStep*i))
	//y-axis
	var yAxisPoints = []
	var yAxisStep = (90-5) / (data.yAxisPoints - 1)
	for(var i=0; i<data.yAxisPoints; i++) yAxisPoints.push(90 - (yAxisStep*i))
	//values
	var keys = []
	var values = {real:[], colors:[], coordX:[], coordY:[], yAxisText:[], xAxisText:[], lines:[]}
	var valuesCoordX = []
	var valuesCoordY = []
	var count = 0
	for(var item in data.values){
		keys.push(item)
		values.colors.push(colors[count])
		values.real.push(data.values[item])
		values.coordX.push([])
		values.coordY.push([])
		values.lines.push([])
		count++
	}
	var minTotal = 0;
	var maxTotal = 0;
	var stepTotal = 0;
		//get min-max
		for(var i=0; i<keys.length; i++){
			var min = 0;
			var max = 0;
			var step = 0;
			for(var j=0; j<values.real[i].length; j++){
				if(values.real[i][j] < min) min = values.real[i][j]
				if(values.real[i][j] > max) max = values.real[i][j]
				step = (max-min) / data.yAxisPoints
				stepTotal = step
				if(min < minTotal) minTotal = min
				if(max > maxTotal) maxTotal = max
			}
		}
		maxTotal += stepTotal
		//calculate coords
		for(var i=0; i<keys.length; i++){
			for(var j=0; j<values.real[i].length; j++){
				var x = 10 + (xAxisStep*j)
				var y = ((85 * (values.real[i][j] - maxTotal)) / (minTotal - maxTotal)) + 5
				values.coordX[i].push(x)
				values.coordY[i].push(y)
			}
		}
		//calculate lines
		for(var i=0; i<keys.length; i++){
			for(var j=0; j<values.real[i].length-1; j++){
				var x1 = 10 + (xAxisStep*j)
				var y1 = ((85 * (values.real[i][j] - maxTotal)) / (minTotal - maxTotal)) + 5
				var x2 = 10 + (xAxisStep*(j+1))
				var y2 = ((85 * (values.real[i][j+1] - maxTotal)) / (minTotal - maxTotal)) + 5
				values.lines[i].push({
					x1,
					y1,
					x2,
					y2
				})
			}
		}
	//y-axis text
	values.yAxisText.push(minTotal)
	var step = (maxTotal-minTotal) / (data.yAxisPoints-1)
	for(var i=1; i<yAxisPoints.length; i++)
		values.yAxisText.push( (minTotal+(step*i)).toFixed(1) )
	//x-axis text
		values.xAxisText = data.xAxisValues
	//
	var parseData = {
		title : data.title,
		showGrid : data.showGrid,
		showPoints : data.showPoints,
		showOuterPoints : data.showOuterPoints,
		showLines : data.showLines,
		showTitle : data.showTitle,
		showInfo : data.showInfo,
		showHover : data.showHover,
		allowFilters : data.allowFilters,
		xAxisPoints,
		yAxisPoints,
		keys,
		values,
		chartStyle : data.chartStyle
	}
	console.log(parseData)
	return parseData
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		hover: (e) => {
			var elem = document.getElementById(e.target.id)
			var val = elem.getAttribute("value")
			var xaxis = elem.getAttribute("name")
			var key = elem.getAttribute("title")
			elem.style.fill = "black"
			var rect = elem.getBoundingClientRect();
			var elemHover = document.getElementById("chartHover")
			var elemHoverIndex = document.getElementById("chartHoverIndex")
			elemHover.style.display = "block"
			elemHover.style.top = (rect.top+5)+"px"
			elemHover.style.left = (rect.left+20)+"px"
			elemHover.innerHTML = "<div>"+key+"</div>"
			elemHover.innerHTML += "<div>"+xaxis+" : "+val+"</div>"
			var height = elemHover.clientHeight
			elemHover.style.marginTop = -(height/2)+"px"
			elemHoverIndex.style.display = "block"
			elemHoverIndex.style.top = (rect.top-5)+"px"
			elemHoverIndex.style.left = (rect.left+10)+"px"
		},
		hout: (e) => {
			var elem = document.getElementById(e.target.id)
			elem.style.fill = ""
			var elemHover = document.getElementById("chartHover")
			elemHover.style.display = "none"
			var elemHoverIndex = document.getElementById("chartHoverIndex")
			elemHoverIndex.style.display = "none"
		},
		clickInfo: (e) => {
			var id = e.target.id
			if(!id) id = e.target.parentElement.id
			var elem = document.getElementById(id)
			var flag = elem.getAttribute("name")
			var elemLines = document.getElementsByClassName(id+"-lines")
			var elemPoints = document.getElementsByClassName(id+"-points")
			if(flag == "0"){
				elem.setAttribute("name", "1")
				elem.style.opacity = "0.5"
				for(var i=0; i<elemLines.length; i++)
					elemLines[i].style.display = "none"
				for(var i=0; i<elemPoints.length; i++)
					elemPoints[i].style.display = "none"
			}else{
				elem.setAttribute("name","0")
				elem.style.opacity = ""
				for(var i=0; i<elemLines.length; i++)
					elemLines[i].style.display = "block"
				for(var i=0; i<elemPoints.length; i++)
					elemPoints[i].style.display = "block"
			}
		},
		hoverInfo: (e) => {
			var id = e.target.id
			if(!id) id = e.target.parentElement.id
			var elem = document.getElementById(id)
			elem.style.background = "#ddd"
			elem.style.cursor = "pointer"
		},
		houtInfo: (e) => {
			var id = e.target.id
			if(!id) id = e.target.parentElement.id
			var elem = document.getElementById(id)
			elem.style.background = ""
			elem.style.cursor = ""
		}
	}
}

const Chart = connect(
	mapStateToProps,
	mapDispatchToProps
)(ChartView)

export default Chart