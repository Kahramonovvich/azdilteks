export function formatPrice(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " so’m";
};

export const cleanPhone = (raw) => {
    if (!raw) return '';
    const digits = raw.replace(/\D/g, '');
    return digits.startsWith('998') ? `+${digits}` : `+998${digits}`;
};

export const normalizeLocal = (s = '') => {
    let digits = s.replace(/^\s*\+998/, '').replace(/\D/g, '').slice(0, 9);
    if (!digits) return '';
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2, 5)}-${digits.slice(5)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 5)}-${digits.slice(5, 7)}-${digits.slice(7, 9)}`;
};


export const normalizeSizes = (raw) => {
    if (raw == null) return [];

    if (typeof raw === 'string') {
        const t = raw.trim();
        if (t.startsWith('[') && t.endsWith(']')) {
            try { return JSON.parse(t); } catch { return []; }
        }
        return t.split(/[,\s]+/).filter(Boolean);
    };

    if (Array.isArray(raw)) {
        if (raw.length === 1 && typeof raw[0] === 'string') {
            const s = raw[0].trim();
            if (s.startsWith('[') && s.endsWith(']')) {
                try { return JSON.parse(s); } catch { /* noop */ }
            }
        }
        return raw.flat().map(String).map(s => s.trim()).filter(Boolean);
    };

    return [];
};

export const normalizeColors = (raw) => {
    if (raw == null) return [];

    if (typeof raw === 'string') {
        const t = raw.trim();
        if (t.startsWith('[') && t.endsWith(']')) {
            try { return JSON.parse(t); } catch { return []; }
        }
        return t.split(/[,\s]+/).filter(Boolean);
    };

    if (Array.isArray(raw)) {
        if (raw.length === 1 && typeof raw[0] === 'string') {
            const s = raw[0].trim();
            if (s.startsWith('[') && s.endsWith(']')) {
                try { return JSON.parse(s); } catch { /* noop */ }
            }
        }
        return raw.flat().map(String).map(s => s.trim()).filter(Boolean);
    };

    return [];
};

export const getDiscountPercent = (oldPrice, newPrice) => {
    return Math.floor(((oldPrice - newPrice) / oldPrice) * 100);
};