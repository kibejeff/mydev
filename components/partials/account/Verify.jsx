import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Form, Input } from 'antd';
import { signIn } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp } from '~/features/user/userSlice';
import { toast } from 'react-toastify';

export default function Verify() {
    const { error } = ""
    const [form] = Form.useForm()
    const router = useRouter();
    const {phoneNumber, loading} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [otpMessage, setotpMessage] = useState('')


    async function resendCode(e){
        e.preventDefault()
        await dispatch(sendOtp({
            username: phoneNumber
        }))
        setotpMessage("Otp code has been resent. Please check your email.")
    }

    const onFinish = async (data) => {
        const res = await dispatch(verifyOtp({
            phone: phoneNumber,
            otp: data.otp,
        }))

        if (res?.payload?.success) {
            toast.success("Account successfully activated! Login to continue.")
            router.push('/account/login');
        }else{
            toast.error("Invalid code!")
        }
    }

    useEffect(() => {
    
    }, [otpMessage])

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
							<h5>Verify Your Account</h5>

                            <p> 
                                {
                                    otpMessage ? otpMessage : "A 4 digit verification code was sent to your email and phone number. Please enter the code to compelete the registration process."
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
									<Input maxLength={4}
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
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}
