import React from 'react';
import Link from 'next/link';
const Links = {
    consumerElectric: [
        {
            text: 'Air Conditioners',
            url: '/shop',
        },
        {
            text: 'Audios & Theaters',
            url: '/shop',
        },
        {
            text: 'Car Electronics',
            url: '/shop',
        },
        {
            text: 'Office Electronics',
            url: '/shop',
        },
        {
            text: 'TV Televisions',
            url: '/shop',
        },
        {
            text: 'Washing Machines',
            url: '/shop',
        },
    ],
    kitchenEquipments: [
        {
            text: 'Fridge',
            url: '/shop',
        },
        
        
        {
            text: 'Electric Cookers',
            url: '/shop',
        },
        {
            text: 'Microwave',
            url: '/shop',
        },
        {
            text: 'Airfryers',
            url: '/shop',
        },
        {
            text: 'Toasters',
            url: '/shop',
        },
        {
            text: 'Eletric Jug',
            url: '/shop',
        },

        {
            text: 'Eletric Heater',
            url: '/shop',
        },
    ],
    computerAndTechnology: [
        {
            text: 'Desktop PC',
            url: '/shop',
        },
        {
            text: 'Laptop',
            url: '/shop',
        },
        {
            text: 'Smartphones',
            url: '/shop',
        },
        {
            text: 'Tablet',
            url: '/shop',
        },
        {
            text: 'Game Controller',
            url: '/shop',
        },
        {
            text: 'Audio & Video',
            url: '/shop',
        },
        {
            text: 'Wireless Speaker',
            url: '/shop',
        },
    ],
};

export default function FooterLinks(){
    return (
        <div className="ps-footer__links">
        {/* <p>
            <strong>Consumer Electric:</strong>
            {Links.consumerElectric.map((item) => (
                <Link href={item.url} key={item.text}>
                    <a>{item.text}</a>
                </Link>
            ))}
        </p>
        <p>
            <strong>Kitchen Equipments:</strong>
            {Links.kitchenEquipments.map((item) => (
                <Link href={item.url} key={item.text}>
                    <a>{item.text}</a>
                </Link>
            ))}
        </p>

        <p>
            <strong>Computer &amp; Technologies:</strong>
            {Links.computerAndTechnology.map((item) => (
                <Link href={item.url} key={item.text}>
                    <a>{item.text}</a>
                </Link>
            ))}
        </p> */}
    </div>
    )
}

