import React, { useState } from 'react';
import { Slider, Checkbox } from 'antd';
import { useRouter } from 'next/router';

const WidgetShopFilterByPriceRange = () => {
    const Router = useRouter();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(120000);

    function handleChangeRange(value) {
        setMin(value[0]);
        price_lt: value[1], setMax(value[1]);

        /*  const params = {
            price_gt: value[0],
        };*/
        // Router.push(`/shop?price_gt=${value[0]}&price_lt=${value[1]}`);
        Router.push(`/price/${value[0]}&${value[1]}`);        
        /*this.props.dispatch(getProductsByPrice(params));*/
    }

    return (
        <aside className="widget widget_shop">
            <figure>
                <h4 className="widget-title">By Price</h4>
                <Slider
                    range
                    defaultValue={[0, 120000]}
                    max={120000}
                    onAfterChange={(e) => handleChangeRange(e)}
                />
                <p>
                    Price: KES {min} - KES {max}
                </p>
            </figure>
        </aside>
    );
};

export default WidgetShopFilterByPriceRange;
