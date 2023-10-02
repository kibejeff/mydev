import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { calculateDiscount } from '~/utilities/product-helper';

export default function ModuleProductDetailSpecification({ product }) {
	const [val, setval] = useState(3);
	const loanPrice = calculateDiscount(product?.price, product?.discount);
	// let initialDeposit = ((loanPrice * 0.2) + (loanPrice * 0.05))
	let initialDeposit = (loanPrice * 0.2)
	let initialLoan = loanPrice - initialDeposit

	let monthlyInst = (((product?.interest / 100) * initialLoan * val) + initialLoan) / val

	function handleChangeHorizontal(e) {
		setval(e.target.value);
	}

	console.log();

	useEffect(() => {
		document.getElementById('myinput').oninput = function () {
			var value = ((this.value - this.min) / (this.max - this.min)) * 100;
			this.style.background =
				'linear-gradient(to right, #fcb800 0%, #fcb800 ' +
				value +
				'%, #fff ' +
				value +
				'%, white 100%)';
		};
	}, [val]);

	return (
		<div className='ps-product__specification'>
			<div className='mb-4'>
				<h1>Loan Payment Plans</h1>
				<p style={{ fontSize: '17px', marginBottom: '10px'}}>
						Deposit: <b> KES {parseFloat(initialDeposit).toFixed(2)}</b>
					</p>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<p style={{ fontSize: '17px' }}>
						Interest: <b>{product?.interest}%</b>
					</p>
					<p style={{ marginLeft: '30px', fontSize: '17px' }}>
						Installments:{' '}
						<b>
							{"KES "}
							{val == 0
								? loanPrice
								: parseFloat(monthlyInst).toFixed(2)}
							/Month
						</b>
					</p>

					<p style={{ marginLeft: '30px', fontSize: '17px' }}>
						Duration: <b>{val == 0 ? '1 Month' : val + ' Months'}</b>
					</p>
				</div>

				<input
					className='ps-product__range'
					title={val > 1 ? val + ' Months' : val + ' Month'}
					onChange={handleChangeHorizontal}
					type='range'
					name=''
					value={val}
					min='0'
					max='12'
					step='1'
					list='markers'
					id='myinput'
				/>
				<datalist id='markers'>
					<option value={0} label=''>
						0 Month
					</option>
					<option value={90}>3 Months</option>
					<option value={182}>6 Months</option>
					<option value={274}>9 Months</option>
					<option value={364}>12 Months</option>
				</datalist>
			</div>

			<p className='categories'>
				<strong> Category:</strong>
				<Link href='/shop'>
					<a>{product?.category?.category}</a>
				</Link>
			</p>
			<p className='tags'>
				<strong> Tags:</strong>
				{!product?.tags?.length ? product?.tags?.map((tag) => {
					return (
						<>
							<Link href='/shop'>
								<a className='text-capitalize'>{tag}</a>
							</Link>
						</>
					);
				})
			:
			<Link href='#'>Not available</Link>
			}
			</p>
		</div>
	);
}
