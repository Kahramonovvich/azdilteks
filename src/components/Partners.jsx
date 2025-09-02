'use client'
import ZaraIcon from '@/icons/Vector.svg'
import GuessIcon from '@/icons/Vector-1.svg'
import FilaIcon from '@/icons/Vector-2.svg'
import GucciIcon from '@/icons/Vector-3.svg'
import ChampionIcon from '@/icons/Vector-4.svg'
import ChanelIcon from '@/icons/Vector-5.svg'
import Marquee from "react-fast-marquee";

const partners = [
    { icon: <ZaraIcon /> },
    { icon: <GuessIcon /> },
    { icon: <FilaIcon /> },
    { icon: <GucciIcon /> },
    { icon: <ChampionIcon /> },
    { icon: <ChanelIcon /> },
];

export default function Partners({ locale }) {
    return (
        <div className="partners lg:mt-[90px] mt-5">
            <div className="container">
                <div className="top">
                    <h3 className="lg:text-5xl lg:leading-[56px] text-2xl mb-2 lg:mb-0">
                        {locale === 'uz' ? 'Xamkorlarimiz' : 'Наши партнеры'}
                    </h3>
                </div>
                <Marquee
                    speed={100}
                    gradient={false}
                    className='lg:mt-12 mt-3 lg:gap-x-6 gap-x-3'
                >
                    <div className="bottom grid grid-cols-6 lg:gap-x-6 gap-x-3">

                        {partners.map((item, index) => (
                            <div key={index} className="box border rounded-2xl flex items-center justify-center lg:py-6 p-3 lg:px-0">
                                {item.icon}
                            </div>
                        ))}
                    </div>
                </Marquee>
            </div>
        </div>
    );
};