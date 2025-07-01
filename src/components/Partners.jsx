'use client'
import ZaraIcon from '@/icons/Vector.svg'
import GuessIcon from '@/icons/Vector-1.svg'
import FilaIcon from '@/icons/Vector-2.svg'
import GucciIcon from '@/icons/Vector-3.svg'
import ChampionIcon from '@/icons/Vector-4.svg'
import ChanelIcon from '@/icons/Vector-5.svg'

const partners = [
    { icon: <ZaraIcon /> },
    { icon: <GuessIcon /> },
    { icon: <FilaIcon /> },
    { icon: <GucciIcon /> },
    { icon: <ChampionIcon /> },
    { icon: <ChanelIcon /> },
];

export default function Partners() {
    return (
        <div className="partners mt-[90px]">
            <div className="container">
                <div className="top">
                    <h3 className="text-5xl leading-[56px] text-center">
                        Xamkorlarimiz
                    </h3>
                </div>
                <div className="bottom grid grid-cols-6 gap-x-6 mt-12">
                    {partners.map((item, index) => (
                        <div key={index} className="box border rounded-2xl flex items-center justify-center py-6">
                            {item.icon}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};