import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { handleShipping } from '~/features/addon/addonSlice';

const ModulePaymentShipping = ({ getShippingAddress }) => {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	// const [contact, setcontact] = useState('Choose contact method');
	const [shipTo, setshipTo] = useState('Nairobi');
	const [shipPrice, setshipPrice] = useState(300);
	const [agent, setagent] = useState('');

	const handleShipToAddress = (e) => {
		setshipTo(e.target.options[e.target.options.selectedIndex].text);
		setshipPrice(e.target.value);
		getShippingAddress(
			e.target.options[e.target.options.selectedIndex].text,
			e.target.value,
			agent
		);
	};

	const handleAgent = (e) => {
		setagent(e.target.value)
		getShippingAddress(
			shipTo,
			shipPrice,
			e.target.value
		);
	};

	useEffect(() => {
		dispatch(
			handleShipping({
				shipTo: shipTo,
				shipPrice: shipPrice,
			}),
		);
	}, [shipTo, shipPrice]);

	useEffect(() => {
		dispatch(
			handleShipping({
				shipTo: 'Nairobi',
				shipPrice: shipPrice,
			}),
		);
	}, []);

	useEffect(() => {
	
	}, [agent])

	return (
		<>
			<div className='ps-block__panel'>
				{/* <figure>
					<small>Contact</small>
					<p>{contact}</p>

					<Select
						defaultValue='Contact method'
						style={{ width: 120 }}
						onChange={handleChange}
						options={[
							{ value: user?.buyer?.email, label: 'Email' },
							{
								value: user?.buyer?.phone,
								label: 'Phone',
							},
						]}
					/>
				</figure> */}
				<figure>
					<div className='form-group'>
						<Space wrap>
							<Form.Item
								label={'Agent Name (If available)'}
								name='agent'
								rules={[
									{
										required: false,
										message: 'Agent name is optional',
									},
								]}
							>
								<Input
									value={agent}
									onChange={e => handleAgent(e)}
									className='form-control'
									type='text'
									placeholder={'Enter agent name'}
									style={{ width: 400, height: 40 }}
								/>
							</Form.Item>

							<Form.Item
								name='shipping_address'
								label={'Shipping Location: ' + 'KES ' + shipPrice}
							>
								<select
									style={{
										width: 200,
										height: '40px',
									}}
									onChange={(e) => handleShipToAddress(e)}
									defaultValue='Nairobi'
									size='large'
								>
									<option value={300}>Nairobi CBD</option>
									<option value={640}>Gilgil</option>
									<option value={738}>Eldoret</option>
									<option value={807}>Kisumu Town</option>
									<option value={1071}>Homabay Town</option>
									<option value={640}>Naivasha</option>
									<option value={626}>Kiambu Town</option>
									<option value={626}>Kitengela</option>
									<option value={626}>Isinya</option>
									<option value={626}>Ruiru</option>
									<option value={626}>Kikuyu</option>
									<option value={719}>Nyeri</option>
									<option value={710}>Embu</option>
									<option value={710}>EmbuMurang'a Town</option>
								</select>
							</Form.Item>
						</Space>
					</div>
				</figure>
			</div>
			{/* <h4>Shipping Method</h4>
			<div className='ps-block__panel'>
				<figure>
					<small>International Shipping</small>
					<strong>$20.00</strong>
				</figure>
			</div> */}
		</>
	);
};

export default ModulePaymentShipping;
