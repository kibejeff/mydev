import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Form, Input } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { customUserPk, sendOtp, verifyOtp, verifyPassOtp } from '~/features/user/userSlice';
import { toast } from 'react-toastify';

export default function PassVerify() {
    const { error } = ""
    const [form] = Form.useForm()
    const router = useRouter();
    const {phoneNumber, loading} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [otpMessage, setotpMessage] = useState('')

    async function resendCode(e){
        e.preventDefault()
        await dispatch(sendPassOtp({
            username: phoneNumber
        }))
		await toast.info("Otp code has been resent. Please check your phone.")
        setotpMessage("Otp code has been resent. Please check your phone.")
    }

    const onFinish = async (data) => {
        const res = await dispatch(verifyPassOtp({
            username: phoneNumber,
            otp: data.otp,
        }))

        if (res?.payload?.success) {
			await dispatch(customUserPk(res?.payload?.user_id))
            toast.success("Account successfully verified!")
            router.push('/account/change-password');
        }else{
            toast.error("Invalid code!")
        }
    }

    useEffect(() => {
    
    }, [otpMessage])

	if (!phoneNumber) {
		router.push('/account/login')
	}

	return (
		<div className='ps-my-account'>
			<div className='container'>
				<Form form={form} onFinish={onFinish} className='ps-form--account'>
					<div className='ps-tab active' id='sign-in'>
						<div className='ps-form__content'>
                        {
                            error &&
                            <p style={{border: "2px solid red", padding: "2px"}} className='text-danger'>{error}</p>
                        }
							<h5>Verify Account</h5>

                            <p> 
                                {
                                    otpMessage ? otpMessage : "A 4 digit verification code was sent to your phone number. Please enter the code to verify this is your account."
                                } 
                            </p>
							<div className='form-group'>
								<Form.Item
									name='otp'
									rules={[
										{
											required: true,
											message: 'Please input 4 digits code',
										},
									]}
								>
									<Input 
									minLength={4}
									maxLength={4}
										className='form-control'
										type='text'
										placeholder='OTP code'
									/>
								</Form.Item>
							</div>

                            <p>Didn't receive a code? <a style={{color: 'blue'}} onClick={e => resendCode(e)} href="">Resend code</a></p>

							<div className='form-group submit'>
								<button disabled={loading} htmlType="submit" className='ps-btn ps-btn--fullwidth'>
                                {loading ? (
										<span className='bnt-auth-text loader'></span>
									) : (
										<span className='bnt-auth-text'>Submit</span>
									)}
								</button>

							</div>
						</div>
						<div className='ps-form__footer'>
						<p>
					<Link href='/account/login'>
						<a>Back to login page</a>
					</Link>
				</p>
						</div>
						
					</div>
					
				</Form>
			</div>
		</div>
	);
}
