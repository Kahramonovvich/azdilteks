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

const genders = ['men', 'women', 'none'];
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
        // переводы
        nameUz: '', descUz: '',
        nameRu: '', descRu: '',
        // swagger query
        price: '', newPrice: '', discount: false,
        gender: 'men',
        category: null, industry: null,
        colors: [], sizes: [],
        // body
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

    const submit = async (e) => {
        e.preventDefault();

        // двухшаговые переводы
        if (lang === 'uz') {
            if (!form.nameUz.trim() || !form.descUz.trim()) return toast.error('UZ maydonlarni to‘ldir');
            setLang('ru'); return;
        }
        if (!form.nameRu.trim() || !form.descRu.trim()) return toast.error('Заполни RU поля');

        // нормализация
        const price = onlyDigits(form.price);
        const newPrice = onlyDigits(form.newPrice);
        const colorsArr = [...asArray(form.colors)].map(getSlug).filter(Boolean);
        const sizesArr = [...asArray(form.sizes)].map(String).filter(Boolean);
        const category = getSlug(form.category);
        const industry = form.industry ? getSlug(form.industry) : '';

        // проверки
        if (!price) return toast.error('Price required');
        if (!category) return toast.error('Category required');
        if (!colorsArr.length) return toast.error('Color required');
        if (!sizesArr.length) return toast.error('Size required');
        if (form.discount && !newPrice) return toast.error('NewPrice required when Discount=true');
        if (asArray(form.images).length === 0) return toast.error('Add at least one image');

        try {
            setLoading(true);

            const fd = new FormData();

            // — query поля строго по Swagger —
            fd.append('Price', price);
            fd.append('Category', category);
            if (industry) fd.append('Industry', industry);
            fd.append('Gender', form.gender || 'none');
            fd.append('Discount', String(!!form.discount));
            fd.append('NewPrice', form.discount ? newPrice : '0');

            // Color/Size — можно несколько: повторяем ключ
            colorsArr.forEach((c) => fd.append('Color', c));
            sizesArr.forEach((s) => fd.append('Size', s));

            // TranslationsJson
            fd.append('TranslationsJson', JSON.stringify([
                { Language: 'uz', Name: form.nameUz.trim(), Description: form.descUz.trim() },
                { Language: 'ru', Name: form.nameRu.trim(), Description: form.descRu.trim() },
            ]));

            // — body: файлы —
            asArray(form.images).forEach((f) => fd.append('ImageLinks', f));

            // ВАЖНО: не задаём Content-Type — браузер поставит boundary сам
            const res = await axios.post('/api/Product/create', fd, {
                transformRequest: [(d) => d],
            });

            if (res.status >= 200 && res.status < 300) {
                toast.success('Mahsulot yaratildi');
                onSuccess?.(); // обновить список
                reset();
                onClose?.();
            } else {
                toast.error(res?.data?.message || 'Server error');
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || err?.message || 'Xatolik');
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <Modal open={open} onClose={loading ? undefined : onClose}>
            <div className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
                <form onSubmit={submit} className="space-y-4">
                    {/* header */}
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

                    {/* translations */}
                    {lang === 'uz' ? (
                        <div className="grid gap-4">
                            <TextField label="Nomi (UZ)" value={form.nameUz} onChange={(e) => setForm((p) => ({ ...p, nameUz: e.target.value }))} fullWidth />
                            <TextField label="Tavsif (UZ)" value={form.descUz} onChange={(e) => setForm((p) => ({ ...p, descUz: e.target.value }))} fullWidth multiline minRows={2} />
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            <TextField label="Название (RU)" value={form.nameRu} onChange={(e) => setForm((p) => ({ ...p, nameRu: e.target.value }))} fullWidth />
                            <TextField label="Описание (RU)" value={form.descRu} onChange={(e) => setForm((p) => ({ ...p, descRu: e.target.value }))} fullWidth multiline minRows={2} />
                        </div>
                    )}

                    {/* swagger params */}
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
                            renderInput={(params) => <TextField {...params} label="Industriya (Industry, ixtiyoriy)" />}
                        />

                        {/* Color — multiple */}
                        <Autocomplete
                            multiple
                            options={colors}
                            value={form.colors}
                            getOptionLabel={lbl}
                            isOptionEqualToValue={eq}
                            onChange={(_e, v) => setForm((p) => ({ ...p, colors: v }))}
                            renderInput={(params) => <TextField {...params} label="Rang(lar) (Color)" />}
                        />

                        {/* Size — multiple */}
                        <Autocomplete
                            multiple
                            options={sizes}
                            value={form.sizes}
                            onChange={(_e, v) => setForm((p) => ({ ...p, sizes: v }))}
                            renderInput={(params) => <TextField {...params} label="O‘lcham(lar) (Size)" />}
                        />

                        <FormControlLabel
                            control={<Checkbox checked={form.discount} onChange={(e) => setForm((p) => ({ ...p, discount: e.target.checked }))} />}
                            label="Chegirma (Discount)"
                        />

                        <TextField
                            label="Yangi narx (NewPrice)"
                            type="text"
                            value={fmt(form.newPrice)}
                            onChange={(e) => setForm((p) => ({ ...p, newPrice: onlyDigits(e.target.value) }))}
                            inputProps={{ inputMode: 'numeric' }}
                            disabled={!form.discount || lang === 'ru'}
                            required={form.discount}
                            fullWidth
                        />
                    </div>

                    {/* images */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Rasmlar (ImageLinks)</label>
                        <input type="file" multiple accept="image/*" onChange={onFiles} disabled={lang === 'ru'} />
                        {!!asArray(form.images).length && (
                            <p className="text-xs text-gray-500">Tanlandi: {asArray(form.images).length} ta fayl</p>
                        )}
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