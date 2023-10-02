import React from 'react';
import Link from 'next/link';
import { baseUrl } from '~/repositories/Repository';

const Promotion = ({ link, image }) => {
    if (image) {
        return (
            <Link href={link}>
                <a className="ps-collection">
                    <img style={{
                        objectFit: 'cover'
                    }} width="200px" height="250px" src={image} alt="brands" />
                </a>
            </Link>
        );
    } else {
        return (
            <Link href={link ? link : '/shop'}>
                <a className="ps-collection">
                    <img src="/static/img/not-found.jpg" alt="brands" />
                </a>
            </Link>
        );
    }
};

export default Promotion;
