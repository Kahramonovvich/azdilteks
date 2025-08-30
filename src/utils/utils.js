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