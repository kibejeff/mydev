import React from 'react';
import FooterWidgets from './modules/FooterWidgets';
import FooterLinks from './modules/FooterLinks';
import FooterCopyright from './modules/FooterCopyright';

export default function FooterFullwidth(){
    return (
        <footer className="ps-footer">
            <div className="ps-container">
                <FooterWidgets />
                <FooterLinks />
                <FooterCopyright />
            </div>
        </footer>
    );
} 

