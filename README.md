##**react-redux-chart**

Simple chart for react-redux developing.

Just call the component:

```javascript
import Chart from 'react-redux-chart'

const MyComponent = ( { data } ) => (
	<div className="myComponent">
		<div className="chart">
			<Chart data={data} />
		</div>
	</div>
)

MyComponent.propTypes = {
	data: PropTypes.object.isRequired
}
```Simple chart for react-redux developing.

Just call the component:

```javascript
import Chart from 'react-redux-chart'

const MyComponent = ( { data } ) => (
	<div className="myComponent">
		<div className="chart">
			<Chart data={data} />
		</div>
	</div>
)

MyComponent.propTypes = {
	data: PropTypes.object.isRequired
}
```

####**Data structure**

Data passed to component has the following structure:

```javascript
let data = {
	//title
	title : "react-redux-chart",
	//x-axis labels*
	xAxisValues : ["Jan", "Feb", "Mar"],
	//number of y-axis steps
	yAxisPoints : 4,
	//show grid		
	showGrid : true,
	//show circle points
	showPoints : true,
	//show circle points
	showOuterPoints : true,
	//show lines between points
	showLines : true,
	//show chart title
	showTitle : true,
	//show chart info
	showInfo : true,
	//hover on/off
	showHover : true,
	//allow filtering of lines
	allowFilters : true,
	//values of chart*
	values : {
		'dataset1' : [1, 2, 2],
		'dataset2' : [2, 5, -5]
	},
	//chart style
	chartStyle : {
		gridColor : "#ccc",
		xAxisTextColor : "#242428",
		yAxisTextColor : "#242428",
		xAxisTextSize : "10",
		yAxisTextSize : "10",
		colors : ["#e74c3c", "#3498db", "#2ecc71", "#e67e22", "#9b59b6"]
	}
}
```
####**Default values and restrictions**

All the keys have the default values as shown above except:

**xAxisValues**: These are the values of the x-axis. It has to be an array.
**values**: These are the data of the chart. It has to be an object of arrays.

**xAxisValues** array and each dataset array of the **values** object must have the same length

**chartStyle.colors** should have one color for each dataset of the chart. If not the default would be #ccc for all the additionals

####**Mandatory fields**

Only 2 fields are mandatory

**xAxisValues** and **values**

```javascript
	let data = {
		xAxisValues : ["Jan", "Feb", "Mar"],
		values : {
			'my dataset 1' : [1, 2, 2],
			'my dataset 2' : [2, 5, -5],
			'my dataset 3' : [3, 2, 21]
		}
	}
```

####**Additional info**

The chart takes the full width and height of the div that it will be placed in.
It uses 3 divs:
- The title div at the top (can be hidden) | (40px height)
- The chart div
- The info div at the bottom (can be hidden) | (40px height)

####**Data structure**

Data passed to component has the following structure:

```javascript
let data = {
	title : "react-redux-chart",			//title
	xAxisValues : ["Jan", "Feb", "Mar"],	//x-axis labels*
	yAxisPoints : 4,						//number of y-axis steps
	showGrid : true,						//show grid
	showPoints : true,						//show circle points
	showOuterPoints : true,					//show circle points
	showLines : true,						//show lines between points
	showTitle : true,						//show chart title
	showInfo : true,						//show chart info
	showHover : true,						//hover on/off
	allowFilters : true,					//allow filtering of lines
	values : {								//values of chart*
		'dataset1' : [1, 2, 2],
		'dataset2' : [2, 5, -5]
	},
	chartStyle : {							//chart style
		gridColor : "#ccc",
		xAxisTextColor : "#242428",
		yAxisTextColor : "#242428",
		xAxisTextSize : "10",
		yAxisTextSize : "10",
		colors : ["#e74c3c", "#3498db", "#2ecc71", "#e67e22", "#9b59b6"]
	}
}
```
####**Default values and restrictions**

All the keys have the default values as shown above except:

**xAxisValues**: These are the values of the x-axis. It has to be an array.
**values**: These are the data of the chart. It has to be an object of arrays.

**xAxisValues** array and each dataset array of the **values** object must have the same length

**chartStyle.colors** should have one color for each dataset of the chart. If not the default would be #ccc for all the additionals

####**Mandatory fields**

Only 2 fields are mandatory

**xAxisValues** and **values**

```javascript
	let data = {
		xAxisValues : ["Jan", "Feb", "Mar"],
		values : {
			'my dataset 1' : [1, 2, 2],
			'my dataset 2' : [2, 5, -5],
			'my dataset 3' : [3, 2, 21]
		}
	}
```

####**Additional info**

The chart takes the full width and height of the div that it will be placed in.
It uses 3 divs:
- The title div at the top (can be hidden) | (40px height)
- The chart div
- The info div at the bottom (can be hidden) | (40px height)