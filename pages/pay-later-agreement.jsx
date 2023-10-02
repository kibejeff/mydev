import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import FooterDefault from '~/components/shared/footers/FooterDefault';

export default function PayLaterAgreement() {
	const breadCrumb = [
		{
			text: 'Home',
			url: '/',
		},
		{
			text: 'Terms and conditions',
		},
	];

	return (
		<>
			<PageContainer footer={<FooterDefault />} title='Terms and conditions'>
				<div className='ps-page--my-account'>
					<BreadCrumb breacrumb={breadCrumb} />
					<div
						style={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'column',
						}}
						className=' my-5'
					>
						<h1>Buy Now, Pay Later Installment Terms</h1>
						<div style={{ width: '70%' }}>
							<p>
								This Buy Now Pay Later Loan Agreement (“Agreement”) is between
								you and PowerPay Limited (‘Company’), the originator and issuer
								of your appliance financing plan. Use of the words “we,” “us,”
								and “our” refer to the Company or its assignees. Use of the
								words “you” and “your” refer to you as a registered owner of
								this Powerpayafrica App Account. Please read this Agreement and
								keep a copy. You acknowledge that you have read, agree with, and
								accept all terms and conditions contained in this Agreement. In
								consideration of the promises and the respective
								representations, warranties, covenants, agreements and
								conditions contained below and on the following pages, you and
								Company enter into this Agreement and agree with, and accept,
								the terms and conditions set forth herein.
							</p>
							<p>
								PAYMENT SCHEDULE - please refer to the “Confirm payment plan”
								screen on your Powerpayafrica App Account for due dates and
								amounts (“Payment Schedule”). That same Payment Schedule will
								also appear on your loan receipt in your Activity feed (your
								“Loan Receipt”). Monthly Percentage Rate (the cost of your
								credit as a monthly rate): 4% Applicable Fees: We may assess a
								late fee equivalent to 5% of an installment payment for any
								payment not received by us within 7 days of its scheduled due
								date (subject to any additional grace period required by
								applicable law). Transaction fees are to be paid by you
							</p>
							<h2>TERMS OF AGREEMENT </h2>
							<p style={{ color: 'red' }}>
								Please note that Section 22 of this Agreement includes
								provisions that govern how claims you or we may have against
								each other are resolved. These provisions may require
								arbitration for a dispute that you assert against us. The
								Agreement also includes important terms regarding your rights
								related to fees and governing law.
							</p>
							<h3>1.Promise to Pay and Disbursement Authorization </h3>
							<p>
								You agree to pay the amount deposit amount due today on your
								Payment Schedule, as well as the future payments (each, an
								“Installment Payment”) in the amounts shown in the Payment
								Schedule. We agree to disburse proceeds to the merchant
								identified on the checkout screen for this Buy Now, Pay Later
								transaction (and to be identified on your Loan Receipt). Those
								proceeds will allow you to complete a purchase. You also must
								pay any late fees you incur under this Agreement.
							</p>
							<p>
								You understand that this Agreement may be assigned without your
								permission or prior notice to you, as more fully described in
								Section 20 below. Upon an assignment, you must pay the assignee
								and perform all of your obligations to it and not the Company.
							</p>
							<p>
								You may prepay any amount due without a penalty. Any prepayment
								will be applied towards upcoming payments in the order they
								become due.{' '}
							</p>
							<h3>
								2. Authorization to Obtain Credit Report and Credit Reporting{' '}
							</h3>
							<p>
								a. You authorize us to obtain your credit reports from one or
								more credit reporting agencies for any purpose permitted by
								applicable law, including: (i) to authenticate your identity;
								(ii) to make installment credit decisions; (iii) to service your
								installment payments; (iv) to send you future marketing
								information; and/or (v) for internal analytics and credit
								modeling purposes. You understand that initially submitting
								personal information will not affect your credit score, however,
								submitting a loan application or accepting a loan may result in
								an inquiry on your credit report that may affect your credit
								score.
							</p>
							<p>
								b. We may report information about your account to credit
								bureaus. Late payments, missed payments, or other defaults on
								your account may be reflected in your credit report.
							</p>
							<p>
								c. If you believe that inaccurate information has been reported
								about your Installment Payments to a credit bureau or other
								consumer reporting agency, please send notification to the
								following address and when you write, please identify the
								specific information that you believe is incorrect and why you
								believe it is incorrect.{' '}
							</p>
							<p>
								PowerPay Limited - Attn: Powerpayafrica App Account Lending
								Program Operations 66071,00800 Nairobi Kenya{' '}
							</p>

							<h3>3. Installment Payments </h3>
							<p>
								a. If you miss a payment, your next payment must include the
								originally scheduled payment, the missed payment, any previously
								missed payment, and any late charges due as a result of a missed
								payment.
							</p>
							<p>
								b. You will take all necessary steps to ensure notifications are
								not being filtered out of the mode by which you have selected to
								receive notifications in your Powerpayafrica App Account. Your
								payment will still be due on your regularly scheduled due date
								even if you do not receive a notification from us.
							</p>
							<h3>4. Making Your Installment Payments </h3>
							<p>
								Your payment must be made in KES from a valid Kenyan source in a
								form acceptable to us. Conforming payments can be made in the
								following ways:
							</p>
							<p>
								a. MPESA payment to Paybill Number 319403 using your registered
								phone number as you account number.{' '}
							</p>
							<p style={{ color: 'red' }}>
								b. Manual Electronic Payments. You may also choose to manually
								make electronic payments through Powerpayafrica App Account. By
								choosing this method, you will be required to authorize your
								debit card to be debited for a stated amount each time you make
								a payment.
							</p>
							<h3>5. Payment Processing</h3>
							<p>
								a. You agree that we may accept and process payments without
								losing any rights.
							</p>
							<p>
								b. You agree that neither we nor any of our service providers
								are responsible if your financial institution rejects a payment
								you make. You will be responsible for any fees charged by your
								financial institution.{' '}
							</p>
							<p>
								c. You agree and authorize us to resubmit and/or collect
								returned payments electronically if you have opted to pay
								electronically
							</p>
							<p>
								d. You agree and authorize us to make electronic reversals or
								credits to any debit card you have provided in the event of an
								erroneous debit or as otherwise appropriate.{' '}
							</p>
							<p>
								e. You agree and authorize us to adjust your Payment Schedule to
								correct errors, to process returned and reversed payments, and
								to handle other issues pertaining to your account.{' '}
							</p>
							<p>
								f. Your funds may be withdrawn from your deposit account as
								early as the same day your payment is received.
							</p>
							<h3>6. How Your Payments Are Applied</h3>
							<p>
								Except as prohibited by law, payments will be applied to your
								obligation as we determine in our sole discretion.
							</p>
							<h3>7. Late Payments </h3>
							<p>
								If an Installment Payment is not paid by the due date in the
								Payment Schedule and remains unpaid for a period of seven (7)
								days after the due date (or such additional grace period
								required by applicable law), a late fee equivalent to 5% of an
								“an instalment payment” will be imposed. The terms of this
								paragraph are subject to applicable state law.
							</p>
							<h3>8. Default </h3>
							<ul>
								<p>
									a. Unless expressly prohibited by law, you will be in default
									on your loan if:
								</p>
								<ul>
									<li>You do not make your payment in full when it is due; </li>
									<li>
										Any payment you make is rejected or not paid by your Company
										or cannot be processed by your Company;{' '}
									</li>
									<li>
										You file or become the subject of a Company bankruptcy or
										insolvency proceeding;{' '}
									</li>
									<li>
										You are unable to repay your obligations, including upon
										death or legally declared incapacity;
									</li>
									<li>
										You provided inaccurate, untrue, or incomplete information,
										or you otherwise tried to defraud or provide material
										misrepresentations to us or our service providers;
									</li>
									<li>
										Your Powerpayafrica App Account is restricted, suspended, or
										terminated;
									</li>
									<li>
										You do not comply with any term of this Agreement; and/or
									</li>
								</ul>
							</ul>

							<ul>
								<p>
									b. If you are in default, we may take certain actions with
									respect to your credit without notifying you unless
									notification is required by law. For example, depending on the
									default the following actions may be taken:{' '}
								</p>
								<li>
									<ul>
										<li>
											If you are enrolled in automatic payments, your
											Powerpayafrica App Account registered debit card may be
											debited the amount of any payment not paid by the due
											date;
										</li>
										<li>
											Your ability to use any or all features on Powerpayafrica
											App Account may be suspended until you satisfy your
											outstanding loan obligation;
										</li>
										<li>
											You may be unable to obtain credit from us in the future;
											and/or{' '}
										</li>
										<li>
											Any other action to the extent not prohibited by law.{' '}
										</li>
									</ul>
								</li>
							</ul>
							<h3>9. Disputes with Merchant; Refunds </h3>
							<p>
								If you are not satisfied with the goods or services you receive
								from a merchant, you will make good faith efforts to resolve any
								issues directly with the merchant.
							</p>
							<p>
								Refunds of goods or services purchased with this loan are
								subject to the merchant’s refund policy and are not our
								responsibility. If a merchant issues a refund to us of the
								entire amount we disburse under this Agreement, then this
								Agreement will terminate and you will not be responsible to make
								any payments. If a merchant issues a refund to us of less than
								the entire amount we disburse under this Agreement, the refunded
								amount will be applied against your loan balance as appropriate
								and subject to applicable law.
							</p>
							<h3>10. Loan Documents </h3>
							<ul>
								<p>
									The following documents (“Loan Documents”) govern your loan:{' '}
								</p>
								<li>
									<ul>
										<li>
											The E-SIGN Consent provided to you when you applied for
											the loan;
										</li>
										<li>This Agreement; </li>
										<li>
											Any Credit Report Authorizations you agreed to when you
											applied for the loan;
										</li>
										<li>
											Any Automated Payment Authorization you agreed to when you
											applied for the loan;{' '}
										</li>
										<li>Any Privacy Policies you agreed to; and</li>
										<li>Any Updated Terms and Updated Payment Schedule. </li>
									</ul>
								</li>
								<p>
									Please read these carefully and keep them for future
									reference.{' '}
								</p>
							</ul>

							<h3>11. Entire Agreement </h3>

							<p>
								The Loan Documents constitute the entire agreement between you
								and us with respect to this loan. You acknowledge and agree that
								no oral representations shall vary, modify or amend the terms
								and conditions of the Loan Documents. Any failure by us to
								exercise, or delay by us in exercising, any right or remedy
								shall not operate as a waiver thereof.
							</p>

							<h3>12. Applicable Law </h3>
							<p>
								This Agreement and any dispute arising hereunder will be
								governed by Kenyan law as applied to agreements entered into and
								to be performed entirely within the territory of the Republic of
								Kenya, without regard to its choice of law or conflicts of law
								principles that would require application of law of a different
								jurisdiction.
							</p>
							<h3>13. Service Providers</h3>
							<p>
								We may retain service providers to perform on our behalf any
								actions authorized or contemplated by this Agreement. Any
								authorization or permission that you grant to us in this
								Agreement (or otherwise in connection with your loan) shall
								extend to and cover any service provider acting on our behalf or
								at our direction.
							</p>
							<p>
								Other provisions in this Agreement that expressly extend rights
								or protections under this Agreement to our service providers
								(either generally or to specific service providers) are included
								for the avoidance of doubt, and should not be interpreted to
								limit the operation or effect of the general provisions in this
								Section.{' '}
							</p>
							<h3>14. Personal Financial Information </h3>
							<ul>
								<p>
									You promise to provide personal financial information about
									you that may be requested from time to time for underwriting,
									security, and/or other purposes related to the management of
									your account. This includes, but is not limited to:
								</p>
								<li>
									<ul>
										<li>Your legal name</li>
										<li>
											A valid U.S. mailing address and residential address (if
											different);
										</li>
										<li>Your date of birth; </li>
										<li>
											Your Social Security Number or Individual Taxpayer
											Identification Number;
										</li>
										<li>Your telephone number(s); and </li>
										<li>Your employment and income information.</li>
									</ul>
								</li>
								<p>
									You promise to promptly update your personal information in
									your Powerpayafrica App Account profile, including but not
									limited to your name, street address, email address or
									telephone number. In doing so, you agree that you will not
									provide false information or signatures, electronic or
									otherwise, at any time. You may be asked for additional
									documents to verify any changes. You understand that if you
									move to a state where this product is not offered, you will be
									unable to borrow subsequent loans.{' '}
								</p>
							</ul>
							<h3>15. Age and Residency </h3>

							<p>
								By entering into this Agreement, you agree that you are at least
								18 years of age or older and of sufficient legal age to enter
								into a contract in the state where you reside and you are a
								resident of the United States when you execute this Agreement.{' '}
							</p>
							<h3>
								16. Important Information About Procedures for Opening a New
								Account
							</h3>
							<p>
								To help the government fight the funding of terrorism and money
								laundering activities, federal law requires all financial
								institutions to obtain, verify, and record information that
								identifies each person who opens an account.
							</p>

							<p>
								What this means for you: When you open an account, we will ask
								for your name, address, date of birth, and other information
								that will allow us to identify you. We may also ask to see your
								driver’s license or other identifying documents.
							</p>

							<h3>17. Communications and Contact Information</h3>
							<p>
								a. You consent to accept and receive communications from us
								including e-mail, text messages, calls, and push notifications
								to the cellular telephone number you provide when you inquire
								about a loan or update your contact information. Such
								communications may include, but are not limited to
								communications regarding applications for credit, credit
								decisions, disclosures, servicing, collections, requests for
								secondary authentication, receipts, reminders, and notifications
								regarding updates to your account or account support. Call and
								text message communications may be generated by automatic
								telephone dialing systems. Standard message and data rates
								applied by your cell phone carrier may apply to the text
								messages sent to you.
							</p>
							<p>
								b. You may opt-out of receiving promotional email communications
								by following the unsubscribe options on such emails. You may opt
								out of any promotional phone calls by informing the caller that
								you would not like to receive future promotional calls. You may
								also opt-out of text messages from us at any time by texting END
								to the number you received a text from. You acknowledge that
								opting out of receiving communications may impact your use of
								our services.{' '}
							</p>

							<h3>18. Submission of Ideas</h3>
							<p>
								You may submit comments or ideas about the loans and/or services
								you receive (“Ideas”). By submitting any Idea, you agree that
								your disclosure is gratuitous, unsolicited, and without
								restriction, that it will not place us under any fiduciary,
								confidentiality or other obligation, and that we are free to use
								the Idea without any additional compensation to you, and/or to
								disclose the Idea on a non-confidential basis or otherwise to
								anyone.{' '}
							</p>

							<p>
								You hereby grant us a perpetual, irrevocable, worldwide, fully
								paid up, non- exclusive, sub-licensable, right and license to
								use the User Content and all elements thereof, in any and all
								media formats and forms, known now or hereafter devised for any
								purpose that we choose.
							</p>

							<h3>19. Severability </h3>

							<p>
								Except as otherwise provided herein and to the extent not
								prohibited by law, if any provision of this Agreement is held to
								be invalid or unenforceable, such determination shall not affect
								the validity or enforceability of the remaining provisions of
								this Agreement. For avoidance of doubt, this provision shall not
								apply to Section 22
							</p>
							<h3>20. Assignment and Delegation </h3>

							<p>
								a. This Agreement will be binding on, and benefit, any of your
								and Company’s successors and assigns, which such assigns shall
								include, for the avoidance of doubt, any subsequent holders of
								your loan. Except as provided by applicable law, Company may
								sell, assign or transfer your loan and this Agreement in whole
								or in part without your permission and without prior notice to
								you. Any assignee or assignees, including, for the avoidance of
								doubt, any subsequent holders of this loan agreement, will take
								Company’s place under this Agreement. You must pay them and
								perform all of your obligations to them and not Company. If you
								pay Company after you are notified that your loan or this
								Agreement has been transferred, Company may return the payment
								to you, forward the payment to the assignee, or handle it in
								another way that is reasonable. you may not sell, assign,
								delegate or transfer your loan, this Agreement, or your
								obligations under this agreement to someone else without written
								permission of Company or any subsequent holder of your loan. Any
								sale, assignment or transfer of your loan by you in violation of
								this section shall be null and void.{' '}
							</p>
							<p>
								b. If this Agreement is sold, assigned or otherwise transferred,
								your rights under the law or under this Agreement are in no way
								altered or impaired.
							</p>
							<p>
								c. We may retain service providers to perform on our behalf any
								actions authorized or contemplated by this Agreement. Any
								authorization or permission that you grant to us in this
								Agreement (or otherwise in connection with your loan) shall
								extend to and cover any service provider acting on our behalf or
								at our direction.
							</p>
							<p>
								Other provisions in this Agreement that expressly extend rights
								or protections under this Agreement to our service providers
								(either generally or to specific service providers) are included
								for the avoidance of doubt, and should not be interpreted to
								limit the operation or effect of the general provisions in this
								Section.{' '}
							</p>

							<h3>21. Disputes </h3>

							<p>
								“Disputes” are defined as any claim, controversy, or dispute
								between you and us, our processors, suppliers or licensors (or
								their respective affiliates, agents, directors or employees),
								whether arising before or during the effective period of this
								Agreement, and including any claim, controversy, or dispute
								based on any conduct of you or us that occurred before the
								effective date of this Agreement, including any claims relating
								in any other aspect of your relationship with us.
							</p>
							<h3>22. Binding Individual Arbitration</h3>
							<p>
								**General. You and we agree that any and all Disputes, except
								those that are resolved informally or brought in a small claims
								court, will be arbitrated by a neutral arbitrator who has the
								power to award the same individual damages and individual relief
								that a court can. ANY ARBITRATION UNDER THESE GENERAL TERMS WILL
								ONLY BE ON AN INDIVIDUAL BASIS; CLASS ARBITRATIONS, CLASS
								ACTIONS, REPRESENTATIVE ACTIONS, AND CONSOLIDATION WITH OTHER
								ARBITRATIONS ARE NOT PERMITTED. YOU WAIVE ANY RIGHT TO
								PARTICIPATE IN A CLASS ACTION AGAINST US. If any provision of
								this arbitration agreement is found unenforceable, the
								unenforceable provision will be severed, and the remaining
								arbitration terms will be enforced (but in no case will there be
								a class or representative arbitration).
							</p>

							<p>
								Pre-Filing Requirement. Before an arbitration is commenced, you
								or we agree to attempt to avoid the costs of formal dispute
								resolution by giving each other a full and fair opportunity to
								address and resolve a Dispute informally. Both parties recognize
								that this is an important requirement, and that breach of this
								requirement would be a material breach of this Agreement. To
								provide this opportunity, before commencing any arbitration or
								suit, each party agrees to send to the other party a written
								Notice (“Notice”). Any Notice to us should be sent by certified
								mail to: PowerPay Limited, P.O.Box 66071,00800 Nairobi, Kenya.
								Any Notice sent to you will be sent to the contact information
								on file for your account. The Notice must: (i) include your
								name, ID and property serial number. (ii) provide detailed
								information sufficient to evaluate the merits of the claiming
								party’s individualized claim and for the other party to
								determine if an amicable resolution is possible; and (iii) set
								forth the specific relief sought, including whatever amount of
								money is demanded and the means by which the demanding party
								calculated the claimed damages. Both parties agree that they
								will attempt to resolve a dispute through an informal
								negotiation within sixty (30) days from the date the Notice is
								sent. After that sixty (30) day period and not before, either
								party may commence arbitration. Each party agrees that state
								courts in the City and County of San Francisco, California, or
								federal court for the Northern District of California,
								referenced below, may enter injunctive relief to enforce the
								pre-filing requirements of this paragraph, including an
								injunction to stay an arbitration that has been commenced in
								violation of this paragraph.{' '}
							</p>

							<p>
								Scope of Arbitration. If we are not able to resolve the Dispute
								by informal negotiation or, as provided below, in a small claims
								court, all Disputes will be resolved finally and exclusively by
								binding individual arbitration with a single arbitrator (the
								“Arbitrator”) administered by the Chartered Institute of
								Arbitrators(CIArb). You and the Company will have the right to
								file early or summary dispositive motions and so long as the
								claim is arbitrable under the CIArb rules. Except as set forth
								above, the Arbitrator shall be responsible for determining all
								threshold arbitrability issues, including issues.{' '}
							</p>

							<p>
								Small Claims Court. Subject to applicable jurisdictional
								requirements, either party may elect to pursue a Dispute in a
								local small claims court rather than through arbitration. If a
								party has already submitted an arbitration demand to the CIARB,
								the other party may, in its sole discretion, inform the CIARB
								that it chooses to have the Dispute heard in small claims court.
								At that time, the CIArb will close the arbitration and the
								Dispute will be heard in the appropriate small claims court,
								with no fees due from the arbitration respondent.
							</p>

							<p>
								The party initiating the arbitration (either you or Company) is
								responsible for paying the applicable filing fee. For purposes
								of this arbitration provision, references to you and we also
								include respective subsidiaries, affiliates, agents, employees,
								predecessors, successors and assigns as well as authorized users
								or beneficiaries of the Powerpayafrica App Account Services.
							</p>

							<p>
								Opt Out. You may reject this provision, in which case only a
								court may be used to resolve any Dispute. To reject this
								provision, you must send us an opt-out notice (the “Opt Out”)
								within thirty (30) days after you take out a loan or we first
								provide you with the right to reject this provision. The Opt Out
								must be mailed to PowerPay Limited, P.O.Box 66071,00800 Nairobi,
								Kenya. The Opt Out must include your name, loan account,
								property serial number, address, phone number and the email
								address(es) you used to sign up for the loan as well as the loan
								number for the loan for which you choose to Opt Out. Opting out
								will not affect any other aspect of the Agreement or your loan,
								and you will be opted out of arbitration for any subsequent (but
								not prior) Buy Now Pay Later loans you may borrow.
							</p>

							<p>
								Court Proceedings. Subject to and without waiver of the
								arbitration provisions above, you agree that any judicial
								proceedings (other than small claims actions as discussed above)
								will be brought in and you hereby consent to the exclusive
								jurisdiction and venue in the state courts in the City and
								County of Nairobi, Kenya.
							</p>
							<h3>23. Rights</h3>

							<p>
								These agreement terms give You the right to own the property at
								the end of the loan period provided you are not in default of
								all the terms of the agreement. Where t it is established that
								there is no default a property discharge form will be filled and
								signed by the Company as proof of property ownership.{' '}
							</p>

							<p>
								You must send signed and filled discharge request through phone,
								whatsapp or email
							</p>
							<h3>24. Loss or Damage</h3>
							<p>
								In the case of damage or loss of the property, You should pay
								for the property the full amount agreed upon during the signing
								of the agreement.
							</p>
							<h3>25. Carbon Title</h3>

							<p>
								You hereby releases all rights to the greenhouse gas reductions
								and/or carbon credits produced by the use of this energy product
								to Company (PowerPay Limited), as part of this rent to own
								agreement with PowerPay Limited, I agree not to sell or transfer
								the greenhouse gas reductions and/or carbon credits related to
								the use of this energy product to any other third party or to
								use those greenhouse gas reductions and/or carbon credits for
								any other use whatsoever.
							</p>

							<h3>26. Early Termination </h3>
							<p>
								Your abandonment of the property will constitute an indication
								of the intent to terminate this contract and relinquish the
								rights to keep custody and purchase the property. “Abandonment”
								is defined pursuant to the laws of this state, but in all
								circumstances will occur when You does not pay rent for 60 days
								or is not in custody of the property for one month. A month is
								30 consecutive days.
							</p>
							<p>
								Company must take custody of the property according to the laws
								of the state. Company may not cancel this contract except for 1)
								You’s failure to remit installment payments as agreed on the
								payment schedule pursuant to this agreement, 2) Your failure to
								keep custody of the property for 30 days, or 3) receipt of
								notification from You of intent to cancel the contract and lose
								custody of the property.{' '}
							</p>
							<p>
								If You terminate the agreement, You relinquish the right to have
								any monies paid in towards ownership of the property, should You
								and Company later agree to enter into a contract for sale of the
								property separate from this contract. You must also pay all
								installment payments due for the entire term of the agreement.{' '}
							</p>
							<p>
								If the Company cancels the agreement, You are entitled to all
								redress and remedies available under the laws of Kenya in which
								the property is located and this contract entered into.{' '}
							</p>

							<h3>27. Notice </h3>
							<p>
								NOTE: ANY HOLDER OF THIS CONSUMER CREDIT CONTRACT IS SUBJECT TO
								ALL CLAIMS AND DEFENSES WHICH THE DEBTOR COULD ASSERT AGAINST
								THE SELLER OF GOODS OR SERVICES OBTAINED WITH THE PROCEEDS
								HEREOF. RECOVERY HEREUNDER BY THE DEBTOR SHALL NOT EXCEED
								AMOUNTS PAID BY THE DEBTOR HEREUNDER.{' '}
							</p>

							<p style={{ backgroundColor: 'yellow' }}>
								<i>
									Executed via Electronic Signature on Execution Date, which is
									the date of your purchase as shown in your Powerpayafrica App
									Account activity feed.
								</i>
							</p>
						</div>
					</div>
				</div>
				<Newsletters layout='container' />
			</PageContainer>
		</>
	);
}
