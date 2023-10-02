import React from 'react';

const PartialSpecification = ({ product }) => (
	<div className='table-responsive'>
		<table className='table table-bordered ps-table ps-table--specification'>
			<tbody>
				{product?.specification ? (
					product?.specification?.map((spec) => {
						return (
							<>
								<tr>
									<td>{spec.title}</td>
									<td>{spec.value}</td>
								</tr>
							</>
						);
					})
				) : (
					<h1>Not available</h1>
				)}
			</tbody>
		</table>
	</div>
);

export default PartialSpecification;
