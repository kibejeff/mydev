import React from 'react';
import {
	FormOutlined,
	UserOutlined,
	UsergroupAddOutlined,
	CheckCircleOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { Steps, Button, message, Form } from 'antd';
import { useState } from 'react';
import PersonalDetailsComponent from './PersonalDetails';
import EmploymentDetailsComponent from './EmploymentDetails';
import GuarantorDetailsComponent from './Guarantors';
import ConfirmDetailsComponent from './ConfirmDetails';

export default function AdditionalInfo() {
	const { Step } = Steps;

	const steps = [
		{
			title: 'Personal Details',
			// status: 'process', //wait, process, finish
			content: <PersonalDetailsComponent />,
			icon: <UserOutlined type='smile-o' />,
		},
		{
			title: 'Employment Details',
			// status: 'wait',
			content: <EmploymentDetailsComponent />,
			icon: <FormOutlined />,
		},
		{
			title: 'Guarantors',
			// status: 'wait',
			content: <GuarantorDetailsComponent />,
			icon: <UsergroupAddOutlined />,
		},
		{
			title: 'Finish',
			// status: 'wait',
			content: <ConfirmDetailsComponent />,
			icon: <CheckCircleOutlined />,
		},
	];

	const [current, setcurrent] = useState(0);
	const [form] = Form.useForm()

	function next() {
		setcurrent((current) => (current += 1));
		window.scrollTo(0, 0);
	}

	function prev() {
		setcurrent((current) => (current -= 1));
		window.scrollTo(0, 0);
	}

	const onFinish = async (data) => {
		await message.success('Processing complete!')
        // const response = await signIn("credentials",{
        //     email: data.email,
        //     password: data.password,
        //     redirect: true,
        //     callbackUrl: router.query?.callbackUrl ?? "/"
        // });
    }

	return (
		<>
			<div className='ps-my-account'>
				<div className='container'>
					<Form form={form} onFinish={onFinish}>
						<Steps current={current}>
							{steps.map((item) => (
								<Step key={item.title} title={item.title} icon={item.icon} />
							))}
						</Steps>
						<div className='steps-content'>{steps[current].content}</div>
						<div className='steps-action'>
							{current < steps.length - 1 && (
								<Button className='btn-auth mt-5' onClick={() => next()}>
									<span className='bnt-auth-text'>Next</span>
								</Button>
							)}
							{current === steps.length - 1 && (
								<Button
									className='btn-auth-submit mt-5'
									htmlType="submit" 
								>
									<span className='bnt-auth-text'>Submit</span>
								</Button>
							)}
							{current > 0 && (
								<Button
									style={{ marginLeft: 8 }}
									className='btn-auth mt-5'
									onClick={() => prev()}
								>
									<span className='bnt-auth-text'>Previous</span>
								</Button>
							)}
						</div>
					</Form>
				</div>
			</div>
		</>
	);
}
