'use client';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { clothesCategory, colors, industry, sizes } from '@/constants/constants';
import { X } from 'lucide-react';

const genders = ['men', 'women'];
const fmt = (n) => String(n || '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const onlyDigits = (v) => (v ?? '').toString().replace(/\D/g, '');
const asArray = (v) => Array.isArray(v) ? v : (v == null ? [] : [v]);
const getSlug = (x) => typeof x === 'string' ? x : (x?.slug ?? x?.value ?? x?.name ?? String(x));
const lbl = (o) => o?.name || o?.title || o?.ru || o?.uz || o?.slug || String(o);
const eq = (o, v) => (o?.slug || o) === (v?.slug || v);

export default function AddProductModal({ open, onClose, onSuccess }) {
    const [lang, setLang] = useState('uz');
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        nameUz: '', descUz: '',
        nameRu: '', descRu: '',
        price: '', newPrice: '', discount: false,
        gender: 'men',
        category: null, industry: null,
        colors: [], sizes: [],
        images: [],
    });

    const reset = () => {
        setForm({
            nameUz: '', descUz: '',
            nameRu: '', descRu: '',
            price: '', newPrice: '', discount: false,
            gender: 'men', category: null, industry: null,
            colors: [], sizes: [], images: [],
        });
        setLang('uz');
    };

    const onFiles = (e) => {
        const files = Array.from(e.target.files || []);
        setForm((p) => ({ ...p, images: files }));
    };

    const isColorSelected = (slug) => form.colors.some((c) => getSlug(c) === slug);
    const toggleColor = (col) => {
        const slug = getSlug(col);
        setForm((p) => ({
            ...p,
            colors: isColorSelected(slug)
                ? p.colors.filter((c) => getSlug(c) !== slug)
                : [...p.colors, col],
        }));
    };

    const isSizeSelected = (s) => form.sizes.includes(s);
    const toggleSize = (s) =>
        setForm((p) => ({
            ...p,
            sizes: isSizeSelected(s) ? p.sizes.filter((x) => x !== s) : [...p.sizes, s],
        }));

    const submit = async (e) => {
        e.preventDefault();

        if (lang === 'uz') {
            if (!form.nameUz.trim() || !form.descUz.trim()) return toast.error('UZ maydonlarni to‘ldir');
            setLang('ru');
            return;
        }
        if (!form.nameRu.trim() || !form.descRu.trim()) return toast.error('Заполни RU поля');

        const price = onlyDigits(form.price);
        const newPrice = onlyDigits(form.newPrice);
        const colorsArr = [...asArray(form.colors)].map(getSlug).filter(Boolean);
        const sizesArr = [...asArray(form.sizes)].map(String).filter(Boolean);
        const category = getSlug(form.category);
        const industry = form.industry ? getSlug(form.industry) : '';

        if (!price) return toast.error('Price required');
        if (!category) return toast.error('Category required');
        if (!colorsArr.length) return toast.error('Color required');
        if (!sizesArr.length) return toast.error('Size required');
        if (form.discount && !newPrice) return toast.error('NewPrice required when Discount=true');
        if (asArray(form.images).length === 0) return toast.error('Add at least one image');

        try {
            setLoading(true);

            const fd = new FormData();
            fd.append('Price', price);
            fd.append('Category', category);
            if (industry) fd.append('Industry', industry);
            fd.append('Gender', form.gender || 'men');
            fd.append('Discount', String(!!form.discount));
            fd.append('NewPrice', form.discount ? newPrice : '0');

            colorsArr.forEach((c) => fd.append('Color', c));
            sizesArr.forEach((s) => fd.append('Size', s));

            fd.append('TranslationsJson', JSON.stringify([
                { Language: 'uz', Name: form.nameUz.trim(), Description: form.descUz.trim(), ProductName: form.nameUz.trim(), ProductDescription: form.descUz.trim() },
                { Language: 'ru', Name: form.nameRu.trim(), Description: form.descRu.trim(), ProductName: form.nameRu.trim(), ProductDescription: form.descRu.trim() },
            ]));

            asArray(form.images).forEach((f) => fd.append('ImageLinks', f));

            const res = await axios.post('/api/Product/create', fd, { transformRequest: [(d) => d] });
            if (res.status >= 200 && res.status < 300) {
                toast.success('Mahsulot yaratildi');
                onSuccess?.();
                reset();
                onClose?.();
            } else {
                toast.error(res?.data?.message || 'Server error');
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || err?.message || 'Xatolik');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <Modal open={open} onClose={loading ? undefined : onClose}>
            <div className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
                <form onSubmit={submit} className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Yangi mahsulot</h2>
                        <div className="flex items-center gap-2">
                            <span className={`text-sm ${lang === 'uz' ? 'font-semibold' : 'text-gray-500'}`}>UZ</span>
                            <div className="h-5 w-10 rounded-full bg-gray-200 relative">
                                <button
                                    type="button"
                                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-orange-600 transition ${lang === 'ru' ? 'right-0.5' : 'left-0.5'}`}
                                    onClick={() => setLang((v) => (v === 'uz' ? 'ru' : 'uz'))}
                                />
                            </div>
                            <span className={`text-sm ${lang === 'ru' ? 'font-semibold' : 'text-gray-500'}`}>RU</span>
                        </div>
                    </div>

                    {lang === 'uz' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField label="Nomi (UZ)" value={form.nameUz} onChange={(e) => setForm((p) => ({ ...p, nameUz: e.target.value }))} fullWidth />
                            <TextField label="Tavsif (UZ)" value={form.descUz} onChange={(e) => setForm((p) => ({ ...p, descUz: e.target.value }))} fullWidth multiline minRows={1} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField label="Название (RU)" value={form.nameRu} onChange={(e) => setForm((p) => ({ ...p, nameRu: e.target.value }))} fullWidth />
                            <TextField label="Описание (RU)" value={form.descRu} onChange={(e) => setForm((p) => ({ ...p, descRu: e.target.value }))} fullWidth multiline minRows={1} />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                            label="Narxi (Price)"
                            type="text"
                            value={fmt(form.price)}
                            onChange={(e) => setForm((p) => ({ ...p, price: onlyDigits(e.target.value) }))}
                            inputProps={{ inputMode: 'numeric' }}
                            disabled={lang === 'ru'}
                            required
                            fullWidth
                        />

                        <Autocomplete
                            options={genders}
                            value={form.gender}
                            onChange={(_e, v) => setForm((p) => ({ ...p, gender: v || 'men' }))}
                            renderInput={(params) => <TextField {...params} label="Gender" />}
                        />

                        <Autocomplete
                            options={clothesCategory}
                            value={form.category}
                            getOptionLabel={lbl}
                            isOptionEqualToValue={eq}
                            onChange={(_e, v) => setForm((p) => ({ ...p, category: v }))}
                            renderInput={(params) => <TextField {...params} label="Kategoriya (Category)" required />}
                        />

                        <Autocomplete
                            options={industry}
                            value={form.industry}
                            getOptionLabel={lbl}
                            isOptionEqualToValue={eq}
                            onChange={(_e, v) => setForm((p) => ({ ...p, industry: v }))}
                            renderInput={(params) => <TextField {...params} label="Industriya (ixtiyoriy)" />}
                        />

                        <div className="col-span-2 grid grid-cols-2 items-center gap-4">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={form.discount}
                                        onChange={(e) => setForm((p) => ({ ...p, discount: e.target.checked }))}
                                    />
                                }
                                label="Chegirma"
                            />
                            <TextField
                                label="NewPrice"
                                type="text"
                                value={fmt(form.newPrice)}
                                onChange={(e) => setForm((p) => ({ ...p, newPrice: onlyDigits(e.target.value) }))}
                                inputProps={{ inputMode: 'numeric' }}
                                disabled={!form.discount || lang === 'ru'}
                                required={form.discount}
                            />
                        </div>

                        <div className="col-span-2">
                            <div className="mb-2 text-sm text-gray-600">Rang(lar) (Color)</div>
                            <div className="flex items-center flex-wrap gap-x-2 gap-y-1.5">
                                {colors.map((col) => {
                                    const selected = isColorSelected(col.slug);
                                    return (
                                        <button
                                            type="button"
                                            key={col.slug}
                                            onClick={() => toggleColor(col)}
                                            title={col.slug}
                                            style={{ backgroundColor: col.hex }}
                                            className={`h-8 w-8 rounded-full border flex items-center justify-center transition ${selected ? 'ring-2 ring-black/70 scale-105' : 'ring-0'
                                                }`}
                                        >
                                            {selected ? <X className={`w-4 h-4 ${col.slug === 'white' ? '' : 'text-white'}`} /> : null}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="col-span-2">
                            <div className="mb-2 text-sm text-gray-600">O‘lcham(lar) (Size)</div>
                            <div className="flex items-center flex-wrap gap-1.5">
                                {sizes.map((s) => (
                                    <button
                                        type="button"
                                        key={s}
                                        onClick={() => toggleSize(s)}
                                        className={`px-3 py-1 rounded-xl transition ${isSizeSelected(s) ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-2">
                            <input type="file" multiple accept="image/*" onChange={onFiles} disabled={lang === 'ru'} />
                            {!!asArray(form.images).length && (
                                <p className="text-xs text-gray-500">Tanlandi: {asArray(form.images).length} ta fayl</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outlined" onClick={onClose} disabled={loading}>Bekor qilish</Button>
                        <Button type="submit" variant="contained" disabled={loading}
                            sx={{ backgroundColor: '#ea580c', '&:hover': { backgroundColor: '#c2410c' } }}>
                            {lang === 'uz' ? 'Keyingi: RU' : (loading ? 'Yaratilmoqda…' : 'Saqlash')}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}