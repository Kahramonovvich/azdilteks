'use client'
import { useGlobalContext } from "@/contexts/contexts";
import { Modal } from "@mui/material";
import CloseIcon from '@/icons/x 1.svg'
import { useMask } from "@react-input/mask";
import { toast } from "react-toastify";
import { useState } from "react";

export default function CallBackModal() {

    const { callBackModal, setCallBackModal } = useGlobalContext();

    const inputPhoneRef = useMask({
        mask: '+998 (__) ___-__-__',
        replacement: { _: /\d/ },
        showMask: true
    });
    const inputDateRef = useMask({
        mask: "dd.mm.yyyy",
        replacement: { d: /\d/, m: /\d/, y: /\d/ },
        showMask: true
    });

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('+998 (__) ___-__-__');
    const [birthDate, setBirthDate] = useState('dd.mm.yyyy');

    const handleClose = () => setCallBackModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const date = inputDateRef.current?.value;
        if (!date || date.includes('_') || !/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
            toast.warn('Tug`ilgan kuningizni kiriting!');
            return;
        };

        const phone = inputPhoneRef.current?.value;
        if (!phone || phone.includes('_')) {
            toast.warn("Telefon raqamingizni kiriting!");
            return;
        };

        setCallBackModal(false);
        toast.success("Tez orada aloqaga chiqamiz, kuting!");
    };

    return (
        <Modal
            open={callBackModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="px-4 lg:p-0"
        >
            <div className="relative w-full h-full">
                <div className="box absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[30px] lg:p-10 p-3 w-full lg:w-[456px]">
                    <div className="top flex items-center justify-between py-1.5">
                        <p className="font-bold text-2xl">
                            Bog’lanish
                        </p>
                        <button
                            onClick={handleClose}
                            className="flex items-center justify-center"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="border-t my-3"></div>
                    <form
                        className="flex flex-col gap-y-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="box flex flex-col gap-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm leading-[22px] text-[#A3A3A3]"
                            >
                                Ismingiz
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="p-4 border rounded-lg text-sm leading-[22px] text-[#A3A3A3] font-medium outline-none"
                                placeholder="Murodjon"
                                required
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                        <div className="box flex flex-col gap-y-2">
                            <label
                                htmlFor="birthDate"
                                className="text-sm leading-[22px] text-[#A3A3A3]"
                            >
                                Tug’ilgan kun
                            </label>
                            <input
                                ref={inputDateRef}
                                type='text'
                                id="birthDate"
                                className="p-4 border rounded-lg text-sm leading-[22px] text-[#A3A3A3] font-medium outline-none"
                                placeholder="Tug’ilgan kuningiz"
                                required
                                onChange={(e) => setBirthDate(e.target.value)}
                                value={birthDate}
                            />
                        </div>
                        <div className="box flex flex-col gap-y-2">
                            <label
                                htmlFor="phoneNumber"
                                className="text-sm leading-[22px] text-[#A3A3A3]"
                            >
                                Telefon raqam
                            </label>
                            <input
                                ref={inputPhoneRef}
                                type='text'
                                id="phoneNumber"
                                className="p-4 border rounded-lg text-sm leading-[22px] text-[#A3A3A3] font-medium outline-none"
                                placeholder="Telefon raqamingiz"
                                required
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                            />
                        </div>
                        <div className="btnBox flex flex-col gap-y-[18px] mt-0.5">
                            <button
                                className="rounded-3xl p-4 bg-primary-orange text-white font-medium"
                                type='submit'
                            >
                                Jo’natish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};