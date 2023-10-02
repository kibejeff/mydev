import { Form, Input, Radio } from 'antd';
import { useState } from 'react';

export default function LoanCheckModule({loanCheck}) {
	const [hasLoan, sethasLoan] = useState(false);

	function handleChangeMethod(e) {
		sethasLoan(e.target.value); //e.target.value
		loanCheck(e.target.value)
	}

    let loanView;

    if (hasLoan === true) {
        loanView = (
            <>
                <Form.Item
							label='Enter Your Current Loan'
							name='current_loan'
							rules={[
								{
									required: false,
									message: 'Amount cannot be less than the initial deposit!',
								},
							]}
						>
							<Input
								min={0}
								className='form-control'
								type='number'
								placeholder='Enter Loan'
							/>
						</Form.Item>
            </>
        )
    }else if( hasLoan == false){
        loanView = (
            <p><b>You currently have no loan</b></p>
        )
    }


	return (
		<>
			<div className='ps-block--payment-method'>
                <h5>Do you have any loan?</h5>
				<div className='ps-block__header'>
					<Radio.Group onChange={(e) => handleChangeMethod(e)} value={hasLoan}>
						<Radio value={false}>No</Radio>
						<Radio value={true}>Yes</Radio>
					</Radio.Group>
				</div>
				<div className='ps-block__content'>{loanView}</div>
			</div>
		</>
	);
}
