import { connect } from 'react-redux'
import Data from '../components/Data'

const mapStateToProps = (state, ownProps) => {
	let data = {
		// element : 'data-box',
		title : "test",					//title
		xAxisValues : ["m1", "m2", "m3", "m4", "m5", "m6", "m7"],	//x-axis labels*
		yAxisPoints : 5,				//number of y-axis steps
		showGrid : true,				//show grid (hor&vert)
		showPoints : true,				//show circle points
		showOuterPoints : true,			//show circle points
		showLines : true,				//show lines between points
		showTitle : true,				//show chart title
		showInfo : true,				//show chart info
		showHover : true,				//hover on/off
		allowFilters : true,			//allow filtering of lines
		values : {						//values of chart, every object is a line*
			key1 : [1, 2, 2 ,0, 3, 4, 1],
			key2 : [2, 5, 8, -2, -5, 4 ,-5]
		},
		chartStyle : {					//chart style
			gridColor : "#ccc",
			xAxisTextColor : "#242428",
			yAxisTextColor : "#242428",
			xAxisTextSize : "10",
			yAxisTextSize : "10",
			colors : ["#e74c3c", "#3498db", "#2ecc71", "#e67e22", "#9b59b6"]	//lines colors
		}
	}
	return {
		data
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {

	}
}

const DataC = connect(
	mapStateToProps,
	mapDispatchToProps
)(Data)

export default DataC