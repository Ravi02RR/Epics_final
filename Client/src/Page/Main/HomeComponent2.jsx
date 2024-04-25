// eslint-disable-next-line no-unused-vars
import React from 'react';
import WorldMap from "react-svg-worldmap";

const HomeComponent2 = () => {

    const data = [
        { country: "cn", value: 1389618778 }, // China
        { country: "in", value: 1311559204 }, // India
        { country: "us", value: 331883986 }, // United States
        { country: "id", value: 264935824 }, // Indonesia
        { country: "pk", value: 210797836 }, // Pakistan
        { country: "br", value: 210301591 }, // Brazil
        { country: "ng", value: 208679114 }, // Nigeria
        { country: "bd", value: 161062905 }, // Bangladesh
        { country: "ru", value: 141944641 }, // Russia
        { country: "mx", value: 127318112 }, // Mexico
    ];




    return (
        <div className=' md:p-10 p-3 '>
            <div className="mockup-browser border border-base-300">
                <div className="mockup-browser-toolbar">
                    <div className="input border border-base-300 font-bold">https://landopmi.com/our-customers</div>
                </div>

                <div className="flex justify-center bg-white">
                    <WorldMap
                        color="red"
                        strokeOpacity={20}

                        valueSuffix="people"
                        size={"xxl"}
                        data={data}
                        tooltipFunction={(geo, value) => `<strong>${geo.properties.name}</strong>: ${value}`}
                    />
                </div>
            </div>
        </div>
    );
}

export default HomeComponent2;
