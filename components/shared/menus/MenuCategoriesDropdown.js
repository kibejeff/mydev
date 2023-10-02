import React from 'react';
import menuData from '~/public/static/data/menu.json';
import Menu from '~/components/elements/menu/Menu';

const MenuCategoriesDropdown = () => {
    return (
        <div className="menu--product-categories">
            <div className="menu__toggle">
                <i className="icon-menu"></i>
                <span>Shop by Department</span>
            </div>
            <div className="menu__content">
               <ul className="menu--dropdown">
                <li>All</li>
                <li>Washing Machines</li>
                <li>Clean Cooking</li>
                <li>Clean Mobility</li>
                <li>Refrigiration</li>
               </ul>
            </div>
        </div>
    );
};

export default MenuCategoriesDropdown;
