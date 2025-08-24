'use client';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import { colors, sizes, industry as INDUSTRY, clothesCategory as CATEGORIES } from '@/constants/constants';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const genders = ['men', 'women'];
const fmt = (n) => String(n || '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const onlyDigits = (v) => (v ?? '').toString().replace(/\D/g, '');
const getSlug = (x) => typeof x === 'string' ? x : (x?.slug ?? x?.value ?? x?.name ?? String(x));
const lbl = (o) => o?.name || o?.title || o?.ru || o?.uz || o?.nameRu || o?.slug || String(o);
const eq = (o, v) => (o?.slug || o) === (v?.slug || v);

const unpackJsony = (arr) => {
    if (Array.isArray(arr) && arr.length === 1 && typeof arr[0] === 'string') {
        try {
            const parsed = JSON.parse(arr[0]);
            if (Array.isArray(parsed)) return parsed;
        } catch { }
    }
    return Array.isArray(arr) ? arr : [];
};

export default function EditProductModal({ productId, open, onClose, onSuccess }) {

    if (!open || !productId) {
        return null;
    };

    const [lang, setLang] = useState('uz');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        language: 'uz',
        name: '',
        description: '',
        price: '',
        newPrice: '',
        discount: false,
        gender: 'men',
        category: null,
        industry: null,
        colors: [],
        sizes: [],
        oldLinks: [],
        removeMap: {},
        newImages: [],
    });

    useEffect(() => {
        if (!open || !productId) return;
        (async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/Product/${productId}?language=${lang}`);
                const colorSlugs = unpackJsony(data?.color).map(String);
                const sizeVals = unpackJsony(data?.size).map(String);

                setForm({
                    language: lang,
                    name: data?.name || '',
                    description: data?.description || '',
                    price: String(data?.price ?? ''),
                    newPrice: String(data?.newPrice ?? ''),
                    discount: !!data?.discount,
                    gender: data?.gender || 'men',
                    category: CATEGORIES.find(c => c.slug === data?.category) || null,
                    industry: data?.industry ? (INDUSTRY.find(i => i.slug === data.industry) || { slug: data.industry }) : null,
                    colors: colorSlugs,
                    sizes: sizeVals,
                    oldLinks: Array.isArray(data?.imageLinks) ? data.imageLinks : [],
                    removeMap: {},
                    newImages: [],
                });
            } catch (e) {
                console.error(e);
                toast.error('Не удалось загрузить продукт');
            } finally {
                setLoading(false);
            }
        })();
    }, [open, productId, lang]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const price = Number(onlyDigits(form.price));
        if (!Number.isFinite(price) || price <= 0) return toast.error('Price обязателен');
        if (!form.category) return toast.error('Выбери категорию');
        if (!form.colors.length) return toast.error('Выбери цвет(а)');
        if (!form.sizes.length) return toast.error('Выбери размер(ы)');
        const discount = !!form.discount;
        const newPrice = discount ? Number(onlyDigits(form.newPrice)) : 0;
        if (discount && (!Number.isFinite(newPrice) || newPrice <= 0))
            return toast.error('NewPrice обязателен при скидке');

        try {
            setSaving(true);

            const fd = new FormData();
            fd.append('Price', String(price));
            form.colors.forEach(c => fd.append('Color', c));
            form.sizes.forEach(s => fd.append('Size', s));
            fd.append('Category', getSlug(form.category));
            if (form.industry) fd.append('Industry', getSlug(form.industry));
            fd.append('Gender', form.gender || 'men');
            fd.append('Discount', String(discount));
            fd.append('NewPrice', String(newPrice));

            form.oldLinks
                .filter(u => !form.removeMap[u])
                .forEach(u => fd.append('OldLinks', u));

            form.newImages.forEach(f => fd.append('ImageLinks', f));

            fd.append('Language', form.language);
            fd.append('Name', form.name.trim());
            fd.append('Description', form.description.trim());

            const res = await axios.put(`/api/Product/${productId}`, fd, {
                transformRequest: [(d) => d],
                validateStatus: () => true,
            });

            if (res.status >= 200 && res.status < 300) {
                toast.success('Сохранено');
                onSuccess?.();
                onClose?.();
            } else {
                const msg = res?.data?.message || res?.data?.upstreamBody || `Ошибка ${res.status}`;
                toast.error(typeof msg === 'string' ? msg : 'Server error');
            };
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || err?.message || 'Xatolik');
        } finally {
            setSaving(false);
        }
    };

    const handleDialogClose = (_e, reason) => {
        if (saving) return;
        onClose?.();
    };

    if (!open) return null;

    return (
        <Dialog
            open={open}
            onClose={handleDialogClose}
            fullWidth
            maxWidth="sm"
            scroll="paper"
            PaperProps={{ sx: { borderRadius: 3, maxHeight: '90svh' } }}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle sx={{ pb: 1 }}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Mahsulotni tahrirlash</h2>
                        <div className="flex items-center gap-2">
                            <span className={`text-sm ${lang === 'uz' ? 'font-semibold' : 'text-gray-500'}`}>UZ</span>
                            <div className="h-5 w-10 rounded-full bg-gray-200 relative">
                                <button
                                    type="button"
                                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-orange-600 transition ${lang === 'ru' ? 'right-0.5' : 'left-0.5'}`}
                                    onClick={() => setLang(v => (v === 'uz' ? 'ru' : 'uz'))}
                                />
                            </div>
                            <span className={`text-sm ${lang === 'ru' ? 'font-semibold' : 'text-gray-500'}`}>RU</span>
                        </div>
                    </div>
                </DialogTitle>

                <DialogContent dividers sx={{ pt: 2 }}>
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <CircularProgress />
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField
                                    label={lang === 'uz' ? "Nomi (UZ)" : "Название (RU)"}
                                    value={form.name}
                                    onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                                    fullWidth
                                />
                                <TextField
                                    label={lang === 'uz' ? "Tavsif (UZ)" : "Описание (RU)"}
                                    value={form.description}
                                    onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
                                    fullWidth
                                    multiline
                                    minRows={1}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <TextField
                                    label="Narxi (Price)"
                                    type="text"
                                    value={fmt(form.price)}
                                    onChange={(e) => setForm(p => ({ ...p, price: onlyDigits(e.target.value) }))}
                                    inputProps={{ inputMode: 'numeric' }}
                                    required
                                    fullWidth
                                />

                                <Autocomplete
                                    options={genders}
                                    value={form.gender}
                                    onChange={(_e, v) => setForm(p => ({ ...p, gender: v || 'men' }))}
                                    renderInput={(params) => <TextField {...params} label="Gender" />}
                                />

                                <Autocomplete
                                    options={CATEGORIES}
                                    value={form.category}
                                    getOptionLabel={lbl}
                                    isOptionEqualToValue={eq}
                                    onChange={(_e, v) => setForm(p => ({ ...p, category: v }))}
                                    renderInput={(params) => <TextField {...params} label="Kategoriya (Category)" required />}
                                />

                                <Autocomplete
                                    options={INDUSTRY}
                                    value={form.industry}
                                    getOptionLabel={(o) => lang === 'ru' ? (o?.nameRu || lbl(o)) : lbl(o)}
                                    isOptionEqualToValue={eq}
                                    onChange={(_e, v) => setForm(p => ({ ...p, industry: v }))}
                                    renderInput={(params) => <TextField {...params} label="Industriya (ixtiyoriy)" />}
                                />

                                <div className="col-span-2 grid grid-cols-2 items-center gap-4">
                                    <FormControlLabel
                                        control={<Checkbox checked={form.discount} onChange={(e) => setForm(p => ({ ...p, discount: e.target.checked }))} />}
                                        label="Chegirma"
                                    />
                                    <TextField
                                        label="NewPrice"
                                        type="text"
                                        value={fmt(form.newPrice)}
                                        onChange={(e) => setForm(p => ({ ...p, newPrice: onlyDigits(e.target.value) }))}
                                        inputProps={{ inputMode: 'numeric' }}
                                        disabled={!form.discount}
                                        required={form.discount}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <div className="mb-2 text-sm text-gray-600">Rang(lar) (Color)</div>
                                    <div className="flex items-center flex-wrap gap-2">
                                        {colors.map((col) => {
                                            const selected = form.colors.includes(col.slug);
                                            return (
                                                <button
                                                    type="button"
                                                    key={col.slug}
                                                    onClick={() => {
                                                        const slug = col.slug;
                                                        setForm(p => ({
                                                            ...p,
                                                            colors: p.colors.includes(slug) ? p.colors.filter(s => s !== slug) : [...p.colors, slug],
                                                        }));
                                                    }}
                                                    title={col.slug}
                                                    style={{ backgroundColor: col.hex }}
                                                    className={`h-8 w-8 rounded-full border flex items-center justify-center transition ${selected ? 'ring-2 ring-black/70 scale-105' : 'ring-0'}`}
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
                                                onClick={() => setForm(p => ({
                                                    ...p,
                                                    sizes: p.sizes.includes(s) ? p.sizes.filter(x => x !== s) : [...p.sizes, s],
                                                }))}
                                                className={`px-3 py-1 rounded-xl transition ${form.sizes.includes(s) ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <div className="mb-2 text-sm text-gray-600">Eski rasmlar (OldLinks)</div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {form.oldLinks.map((url) => (
                                            <label key={url} className="block border rounded-lg overflow-hidden">
                                                <img src={url} alt="" className="h-28 w-full object-cover" />
                                                <div className="p-2 flex items-center gap-2 text-sm">
                                                    <Checkbox
                                                        checked={!form.removeMap[url]}
                                                        onChange={() => setForm(p => ({ ...p, removeMap: { ...p.removeMap, [url]: !p.removeMap[url] } }))}
                                                    />
                                                    <span>{form.removeMap[url] ? 'Удалить' : 'Оставить'}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <div className="mb-2 text-sm text-gray-600">Yangi rasmlar (ImageLinks)</div>
                                    <input type="file" multiple accept="image/*" onChange={(e) => {
                                        const files = Array.from(e.target.files || []);
                                        if (!files.length) return;
                                        setForm(p => ({ ...p, newImages: [...p.newImages, ...files] }));
                                    }} />
                                    {!!form.newImages.length && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {form.newImages.map((f, i) => (
                                                <div key={i} className="text-xs px-2 py-1 bg-gray-100 rounded">
                                                    {f.name}
                                                    <button type="button" className="ml-2 text-red-600" onClick={() => setForm(p => ({ ...p, newImages: p.newImages.filter((_, idx) => idx !== i) }))}>x</button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2 }}>
                    <Button variant="outlined" onClick={onClose} disabled={saving}>Отмена</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={saving}
                        sx={{ backgroundColor: '#ea580c', '&:hover': { backgroundColor: '#c2410c' } }}
                    >
                        {saving ? 'Saqlanmoqda…' : 'Saqlash'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};