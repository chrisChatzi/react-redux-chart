import React, { PropTypes } from 'react'
import Chart from '../../lib/ChartLogic'

const Data = ( { data } ) => (
	<div className="data">
		<div className="data-box">
			<Chart data={data} />
		</div>
	</div>
)

Data.propTypes = {
	data: PropTypes.object.isRequired
}

export default Data