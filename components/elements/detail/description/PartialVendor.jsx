import React from 'react';

const PartialVendor = ({ product }) => (
	<section>
		<h4>{product?.vendor?.business_name}</h4>
		<p>
			Address: {product?.vendor?.location ?? "N/A"}
		</p>
        <p>
			Precise Location: {product?.vendor?.precise_location ?? "N/A"}
		</p>
        <p>
			Follow Up: <b>{product?.vendor?.follow_ups ?? "N/A"}</b>
		</p>
		<a href='/vendor'>More Products from {product?.vendor?.business_name ?? "N/A"}</a>

		<div className='ps-product__sharing'>
			<a className='facebook' href={product?.vendor?.facebook}>
				<i className='fa fa-facebook'></i>
			</a>
			<a className='twitter' href={product?.vendor?.twitter}>
				<i className='fa fa-twitter'></i>
			</a>
			<a className='linkedin' href={product?.vendor?.linkedin}>
				<i className='fa fa-linkedin'></i>
			</a>
			<a className='facebook' href={product?.vendor?.instagram}>
				<i className='fa fa-instagram'></i>
			</a>
		</div>
	</section>
);

export default PartialVendor;
