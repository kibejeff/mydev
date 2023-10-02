import React from 'react';
import {
	EmailShareButton,
	FacebookShareButton,
	HatenaShareButton,
	InstapaperShareButton,
	LineShareButton,
	LinkedinShareButton,
	LivejournalShareButton,
	MailruShareButton,
	OKShareButton,
	PinterestShareButton,
	PocketShareButton,
	RedditShareButton,
	TelegramShareButton,
	TumblrShareButton,
	TwitterShareButton,
	ViberShareButton,
	VKShareButton,
	WhatsappShareButton,
	WorkplaceShareButton,
} from 'react-share';

import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
  } from "react-share";

const ModuleProductDetailSharing = ({ product }) => (
	<div className='ps-product__sharing'>
		<FacebookShareButton
			className='mr-3'
			url={'https://powerpayafrica.com/product/' + product?.uuid}
			quote={product?.title}
			hashtag='#powerpayAfricaProducts'
		>
			<a className='facebook' href='#'>
				<i className='fa fa-facebook'></i>
			</a>
		</FacebookShareButton>

		<TwitterShareButton
			className='mr-3'
			url={'https://powerpayafrica.com/product/' + product?.uuid}
			quote={product?.title}
			hashtag='#powerpayAfricaProducts'
		>
			<a className='twitter' href='#'>
				<i className='fa fa-twitter'></i>
			</a>
		</TwitterShareButton>

        <LinkedinShareButton
			className='mr-3'
			url={'https://powerpayafrica.com/product/' + product?.uuid}
			quote={product?.title}
			hashtag='#powerpayAfricaProducts'
		>
			<a className='linkedin' href='#'>
				<i className='fa fa-linkedin'></i>
			</a>
		</LinkedinShareButton>

        <EmailShareButton
			className='mr-3'
			url={'https://powerpayafrica.com/product/' + product?.uuid}
			quote={product?.title}
			hashtag='#powerpayAfricaProducts'
		>
			<a className='twitter' href='#'>
				<i className='fa fa-envelope'></i>
			</a>
		</EmailShareButton>

        <WhatsappShareButton
			className='mr-3'
			url={'https://powerpayafrica.com/product/' + product?.uuid}
			quote={product?.title}
			hashtag='#powerpayAfricaProducts'
		>
			<a className='facebook' href='#'>
				<i className='fa fa-whatsapp'></i>
			</a>
		</WhatsappShareButton>

        <TelegramShareButton
			className='mr-3'
			url={'https://powerpayafrica.com/product/' + product?.uuid}
			quote={product?.title}
			hashtag='#powerpayAfricaProducts'
		>
			<a className='twitter' href='#'>
				<TelegramIcon style={{marginTop: '5px'}} size={30} />
			</a>
		</TelegramShareButton>

		{/* <a className='facebook' href='#'>
			<i className='fa fa-facebook'></i>
		</a>
		<a className='twitter' href='#'>
			<i className='fa fa-twitter'></i>
		</a>
		<a className='google' href='#'>
			<i className='fa fa-google-plus'></i>
		</a>
		<a className='linkedin' href='#'>
			<i className='fa fa-linkedin'></i>
		</a>
		<a className='instagram' href='#'>
			<i className='fa fa-instagram'></i>
		</a> */}
	</div>
);

export default ModuleProductDetailSharing;
