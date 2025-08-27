export function formatPrice(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " so’m";
};

export const cleanPhone = (raw) => {
    if (!raw) return '';
    const digits = raw.replace(/\D/g, '');
    return digits.startsWith('998') ? `+${digits}` : `+998${digits}`;
};

export const cleanDateToISO = (raw) => {
    if (!raw) return null;
    const [dd, mm, yyyy] = raw.split('.');
    if (!dd || !mm || !yyyy) return null;
    try {
        return new Date(`${yyyy}-${mm}-${dd}`).toISOString(); // в ISO
    } catch {
        return null;
    }
};