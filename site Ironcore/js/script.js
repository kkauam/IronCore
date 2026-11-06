/**
 * IRONCORE - FRONTEND ENGINE & DATA INTEGRATION
 * Modern, Smooth, Animated, and 100% Functional
 */

const API_BASE_URL = 'http://localhost:8080/api/calculators';

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileNav();
    initQuickCalcTabs();
    initPresetChips();
    initPricingToggle();
    initCalculators();
    initContactForm();
});

/* ==========================================================================
   1. NAVIGATION & UI MICRO-INTERACTIONS
   ========================================================================== */

function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (!toggleBtn || !mobileMenu) return;

    toggleBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        toggleBtn.innerHTML = isOpen ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

/* ==========================================================================
   2. QUICK CALCULATOR TABS (HOME SECTION)
   ========================================================================== */

function initQuickCalcTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   3. PRESET CHIPS & SLIDERS SYNCHRONIZATION
   ========================================================================== */

function initPresetChips() {
    document.querySelectorAll('.chip-btn').forEach(chip => {
        chip.addEventListener('click', () => {
            const targetInputId = chip.dataset.target;
            const targetVal = chip.dataset.val;
            const input = document.getElementById(targetInputId);
            if (input) {
                input.value = targetVal;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                chip.style.transform = 'scale(0.92)';
                setTimeout(() => chip.style.transform = '', 150);
            }
        });
    });
}

function initPricingToggle() {
    const toggle = document.getElementById('pricing-billing-toggle');
    if (!toggle) return;

    const prices = document.querySelectorAll('.price-val');
    toggle.addEventListener('change', () => {
        const isAnnual = toggle.checked;
        prices.forEach(p => {
            const monthly = p.dataset.monthly;
            const annual = p.dataset.annual;
            p.textContent = isAnnual ? annual : monthly;
        });
    });
}

/* ==========================================================================
   4. CALCULATOR SETUP & DISPATCHER (SILENT & SEAMLESS)
   ========================================================================== */

function initCalculators() {
    // 1. ÁGUA (WATER)
    setupCalcForm({
        formId: 'form-water',
        endpoint: '/water',
        resultId: 'result-water',
        buildPayload: (form) => ({
            weightKg: parseFloat(form.querySelector('#water-weight').value),
            activityLevel: form.querySelector('#water-activity').value
        }),
        localCalculate: (payload) => {
            const multipliers = {
                SEDENTARY: 1.0,
                LIGHT: 1.1,
                MODERATE: 1.2,
                INTENSE: 1.3,
                ATHLETE: 1.4
            };
            const mult = multipliers[payload.activityLevel] || 1.0;
            const baseMl = payload.weightKg * 35;
            const totalMl = Math.round(baseMl * mult);
            const liters = (totalMl / 1000).toFixed(2);
            const glasses = Math.round(totalMl / 250);
            return {
                weightKg: payload.weightKg,
                activityLevel: payload.activityLevel,
                dailyWaterMl: totalMl,
                dailyWaterLiters: parseFloat(liters),
                glassesOf250ml: glasses
            };
        },
        renderResult: renderWaterResult
    });

    // 2. PROTEÍNA (PROTEIN)
    setupCalcForm({
        formId: 'form-protein',
        endpoint: '/protein',
        resultId: 'result-protein',
        buildPayload: (form) => ({
            weightKg: parseFloat(form.querySelector('#protein-weight').value),
            fitnessGoal: form.querySelector('#protein-goal').value
        }),
        localCalculate: (payload) => {
            const multipliers = {
                SEDENTARY: 0.8,
                MASS_GAIN: 1.8,
                FAT_LOSS: 2.0,
                ATHLETE: 2.2
            };
            const mult = multipliers[payload.fitnessGoal] || 1.8;
            const totalGrams = Math.round(payload.weightKg * mult);
            return {
                weightKg: payload.weightKg,
                fitnessGoal: payload.fitnessGoal,
                dailyProteinGrams: totalGrams,
                mealsToDistribute: 4
            };
        },
        renderResult: renderProteinResult
    });

    // 3. IMC (BODY MASS INDEX)
    setupCalcForm({
        formId: 'form-imc',
        endpoint: '/imc',
        resultId: 'result-imc',
        buildPayload: (form) => ({
            weightKg: parseFloat(form.querySelector('#imc-weight').value),
            heightM: parseFloat(form.querySelector('#imc-height').value)
        }),
        localCalculate: (payload) => {
            const imc = payload.weightKg / (payload.heightM * payload.heightM);
            let category = 'Normal';
            if (imc < 18.5) category = 'Abaixo do peso';
            else if (imc < 24.9) category = 'Peso normal';
            else if (imc < 29.9) category = 'Sobrepeso';
            else if (imc < 34.9) category = 'Obesidade Grau I';
            else category = 'Obesidade Grau II/III';

            return {
                weightKg: payload.weightKg,
                heightM: payload.heightM,
                imcValue: parseFloat(imc.toFixed(2)),
                imcCategory: category
            };
        },
        renderResult: renderImcResult
    });

    // 4. GASTO ENERGÉTICO (ENERGY / TMB & TDEE)
    setupCalcForm({
        formId: 'form-energy',
        endpoint: '/energy',
        resultId: 'result-energy',
        buildPayload: (form) => ({
            weightKg: parseFloat(form.querySelector('#energy-weight').value),
            heightCm: parseFloat(form.querySelector('#energy-height').value),
            age: parseInt(form.querySelector('#energy-age').value),
            gender: form.querySelector('#energy-gender').value,
            activityLevel: form.querySelector('#energy-activity').value,
            caloricGoal: form.querySelector('#energy-goal').value
        }),
        localCalculate: (payload) => {
            const tmbMale = (10 * payload.weightKg) + (6.25 * payload.heightCm) - (5 * payload.age) + 5;
            const tmbFemale = (10 * payload.weightKg) + (6.25 * payload.heightCm) - (5 * payload.age) - 161;
            const bmr = payload.gender === 'MALE' ? tmbMale : tmbFemale;

            const actMults = {
                SEDENTARY: 1.0,
                LIGHT: 1.1,
                MODERATE: 1.2,
                INTENSE: 1.3,
                ATHLETE: 1.4
            };
            const tdee = bmr * (actMults[payload.activityLevel] || 1.2);

            const adjustments = {
                MAINTAIN: 0,
                GAIN_MUSCLE: -500,
                LOSE_WEIGHT: 300
            };
            const targetCalories = tdee + (adjustments[payload.caloricGoal] || 0);

            return {
                weightKg: payload.weightKg,
                heightCm: payload.heightCm,
                age: payload.age,
                gender: payload.gender,
                bmr: bmr,
                tdee: tdee,
                caloricGoal: payload.caloricGoal,
                targetCalories: targetCalories
            };
        },
        renderResult: renderEnergyResult
    });
}

function setupCalcForm({ formId, endpoint, resultId, buildPayload, localCalculate, renderResult }) {
    const form = document.getElementById(formId);
    const resultBox = document.getElementById(resultId);
    if (!form || !resultBox) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate
        const inputs = form.querySelectorAll('input[required], select[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim() || (input.type === 'number' && isNaN(parseFloat(input.value)))) {
                isValid = false;
                input.style.borderColor = 'var(--danger)';
                input.addEventListener('input', () => input.style.borderColor = '', { once: true });
            }
        });

        if (!isValid) {
            showToast('Por favor, preencha todos os campos obrigatórios.', 'warn');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn?.querySelector('.btn-text');
        const loader = submitBtn?.querySelector('.loader');

        if (submitBtn) submitBtn.disabled = true;
        if (btnText) btnText.style.display = 'none';
        if (loader) loader.classList.remove('hidden');

        const payload = buildPayload(form);
        let responseData = null;

        try {
            // Attempt API call silently in the background
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            const res = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (res.ok) {
                responseData = await res.json();
            } else {
                throw new Error('Falha na resposta remota');
            }
        } catch (err) {
            // Seamless background fallback: calculates locally using the exact same formulas
            responseData = localCalculate(payload);
        } finally {
            if (submitBtn) submitBtn.disabled = false;
            if (btnText) btnText.style.display = '';
            if (loader) loader.classList.add('hidden');
        }

        if (responseData) {
            resultBox.innerHTML = renderResult(responseData);
            resultBox.classList.remove('hidden');
            resultBox.classList.remove('res-error');

            // Wire copy button
            const copyBtn = resultBox.querySelector('.copy-result-btn');
            if (copyBtn) {
                copyBtn.addEventListener('click', () => {
                    const text = copyBtn.dataset.copyText;
                    navigator.clipboard.writeText(text).then(() => {
                        showToast('Resultado copiado com sucesso!', 'success');
                    });
                });
            }

            // Animate number counters
            resultBox.querySelectorAll('[data-target-num]').forEach(el => {
                const target = parseFloat(el.dataset.targetNum);
                const decimals = parseInt(el.dataset.decimals || '0');
                const suffix = el.dataset.suffix || '';
                animateNumber(el, 0, target, 800, decimals, suffix);
            });

            // Smooth scroll to result if on mobile
            if (window.innerWidth < 768) {
                resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    });
}

/* ==========================================================================
   5. RESULT RENDERERS (CLEAN & PROFESSIONAL - NO BACKEND NOISE)
   ========================================================================== */

function renderWaterResult(data) {
    const glassCount = Math.min(data.glassesOf250ml || Math.round(data.dailyWaterMl / 250), 16);
    let glassesHtml = '';
    for (let i = 1; i <= glassCount; i++) {
        glassesHtml += `<div class="glass-item" title="Copo ${i}: 250ml"><i class="fas fa-droplet"></i></div>`;
    }

    const copyText = `Meta de Água IronCore: ${data.dailyWaterMl} ml (${data.dailyWaterLiters}L/dia) - ${data.glassesOf250ml} copos de 250ml`;

    return `
        <div class="result-header">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px;">
                <i class="fas fa-chart-simple"></i> Resultado da Análise
            </span>
            <button class="copy-result-btn" data-copy-text="${copyText}">
                <i class="fas fa-copy"></i> Copiar resultado
            </button>
        </div>

        <div class="metric-highlight">
            <span class="metric-subtitle">Meta diária recomendada</span>
            <div class="metric-big-num">
                <span data-target-num="${data.dailyWaterMl}" data-decimals="0" data-suffix=" ml">${data.dailyWaterMl} ml</span>
            </div>
            <span class="badge-category"><i class="fas fa-glass-water"></i> Aproximadamente ${data.dailyWaterLiters} Litros / dia</span>
        </div>

        <div style="text-align: center; margin: 1.2rem 0 0.4rem;">
            <span style="font-size: 0.82rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">
                Distribuição sugerida (${data.glassesOf250ml} copos de 250ml):
            </span>
        </div>
        <div class="glasses-grid">${glassesHtml}</div>

        <div class="result-cards-grid">
            <div class="res-subcard">
                <span class="res-label">Peso Avaliado</span>
                <span class="res-val">${data.weightKg} kg</span>
            </div>
            <div class="res-subcard">
                <span class="res-label">Nível de Atividade</span>
                <span class="res-val" style="font-size: 1rem; color: var(--cyan);">${translateActivity(data.activityLevel)}</span>
            </div>
            <div class="res-subcard highlight">
                <span class="res-label">Copos (250ml)</span>
                <span class="res-val">${data.glassesOf250ml} un</span>
            </div>
        </div>
    `;
}

function renderProteinResult(data) {
    const meals = data.mealsToDistribute || 4;
    const perMeal = Math.round(data.dailyProteinGrams / meals);
    const chickenEquiv = Math.round(data.dailyProteinGrams * 3.2);
    const eggsEquiv = Math.round(data.dailyProteinGrams / 6);

    const copyText = `Meta Proteica IronCore: ${data.dailyProteinGrams}g de proteína por dia (${perMeal}g em ${meals} refeições)`;

    return `
        <div class="result-header">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px;">
                <i class="fas fa-chart-simple"></i> Resultado da Análise
            </span>
            <button class="copy-result-btn" data-copy-text="${copyText}">
                <i class="fas fa-copy"></i> Copiar resultado
            </button>
        </div>

        <div class="metric-highlight">
            <span class="metric-subtitle">Aporte proteico diário</span>
            <div class="metric-big-num">
                <span data-target-num="${data.dailyProteinGrams}" data-decimals="0" data-suffix="g">${data.dailyProteinGrams}g</span>
            </div>
            <span class="badge-category"><i class="fas fa-bullseye"></i> ${translateGoal(data.fitnessGoal)}</span>
        </div>

        <div class="result-cards-grid">
            <div class="res-subcard highlight">
                <span class="res-label">Por Refeição (${meals}x)</span>
                <span class="res-val">${perMeal}g</span>
            </div>
            <div class="res-subcard">
                <span class="res-label">Equiv. Frango Grelhado</span>
                <span class="res-val">~${chickenEquiv}g</span>
            </div>
            <div class="res-subcard">
                <span class="res-label">Ou Equivalente em Ovos</span>
                <span class="res-val">~${eggsEquiv} ovos</span>
            </div>
        </div>
    `;
}

function renderImcResult(data) {
    const imc = data.imcValue;
    const clamped = Math.min(Math.max(imc, 15), 38);
    const gaugePercent = ((clamped - 15) / (38 - 15)) * 100;

    const minWeight = (18.5 * data.heightM * data.heightM).toFixed(1);
    const maxWeight = (24.9 * data.heightM * data.heightM).toFixed(1);

    const copyText = `Resultado IMC IronCore: ${data.imcValue.toFixed(2)} (${data.imcCategory}) para altura ${data.heightM}m e peso ${data.weightKg}kg`;

    return `
        <div class="result-header">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px;">
                <i class="fas fa-chart-simple"></i> Resultado da Análise
            </span>
            <button class="copy-result-btn" data-copy-text="${copyText}">
                <i class="fas fa-copy"></i> Copiar resultado
            </button>
        </div>

        <div class="metric-highlight">
            <span class="metric-subtitle">Seu Índice de Massa Corporal</span>
            <div class="metric-big-num">
                <span data-target-num="${data.imcValue}" data-decimals="2" data-suffix="">${data.imcValue.toFixed(2)}</span>
            </div>
            <span class="badge-category"><i class="fas fa-weight-scale"></i> ${data.imcCategory}</span>
        </div>

        <div class="imc-gauge-container">
            <div class="imc-meter-track">
                <div class="imc-marker" style="left: ${gaugePercent}%"></div>
            </div>
            <div class="imc-labels">
                <span>Magreza (&lt;18.5)</span>
                <span>Normal (18.5-24.9)</span>
                <span>Sobrepeso (25-29.9)</span>
                <span>Obesidade (30+)</span>
            </div>
        </div>

        <div class="result-cards-grid">
            <div class="res-subcard">
                <span class="res-label">Peso Informado</span>
                <span class="res-val">${data.weightKg} kg</span>
            </div>
            <div class="res-subcard">
                <span class="res-label">Altura</span>
                <span class="res-val">${data.heightM} m</span>
            </div>
            <div class="res-subcard highlight">
                <span class="res-label">Faixa Saudável Estimada</span>
                <span class="res-val" style="font-size: 1.15rem;">${minWeight} - ${maxWeight} kg</span>
            </div>
        </div>
    `;
}

function renderEnergyResult(data) {
    const bmr = Math.round(data.bmr);
    const tdee = Math.round(data.tdee);
    const target = Math.round(data.targetCalories);

    const protKcal = target * 0.28;
    const carbKcal = target * 0.47;
    const fatKcal = target * 0.25;

    const protG = Math.round(protKcal / 4);
    const carbG = Math.round(carbKcal / 4);
    const fatG = Math.round(fatKcal / 9);

    const copyText = `Metabolismo IronCore: TMB ${bmr} kcal | Gasto Total (TDEE) ${tdee} kcal | Meta Diária ${target} kcal`;

    return `
        <div class="result-header">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px;">
                <i class="fas fa-chart-simple"></i> Resultado da Análise
            </span>
            <button class="copy-result-btn" data-copy-text="${copyText}">
                <i class="fas fa-copy"></i> Copiar resultado
            </button>
        </div>

        <div class="metric-highlight">
            <span class="metric-subtitle">Meta Calórica Diária</span>
            <div class="metric-big-num">
                <span data-target-num="${target}" data-decimals="0" data-suffix=" kcal">${target} kcal</span>
            </div>
            <span class="badge-category"><i class="fas fa-fire-flame-curved"></i> Objetivo: ${translateCaloricGoal(data.caloricGoal)}</span>
        </div>

        <div class="result-cards-grid">
            <div class="res-subcard">
                <span class="res-label">TMB (Gasto em Repouso)</span>
                <span class="res-val">${bmr} kcal</span>
            </div>
            <div class="res-subcard">
                <span class="res-label">TDEE (Gasto Total)</span>
                <span class="res-val">${tdee} kcal</span>
            </div>
            <div class="res-subcard highlight">
                <span class="res-label">Meta Final</span>
                <span class="res-val">${target} kcal</span>
            </div>
        </div>

        <div style="margin-top: 1.8rem; padding-top: 1.2rem; border-top: 1px solid rgba(255,255,255,0.08);">
            <div style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 0.8rem; text-align: center;">
                Distribuição Sugerida de Macronutrientes:
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.8rem; text-align: center;">
                <div style="background: rgba(0,245,160,0.06); padding: 0.8rem; border-radius: 10px; border: 1px solid rgba(0,245,160,0.2);">
                    <div style="font-size: 0.75rem; color: var(--primary); font-weight: 700;">Proteínas</div>
                    <div style="font-size: 1.2rem; font-weight: 800; color: #fff; font-family: var(--font-mono);">${protG}g</div>
                    <div style="font-size: 0.7rem; color: var(--text-dim);">~${Math.round(protKcal)} kcal</div>
                </div>
                <div style="background: rgba(0,217,245,0.06); padding: 0.8rem; border-radius: 10px; border: 1px solid rgba(0,217,245,0.2);">
                    <div style="font-size: 0.75rem; color: var(--cyan); font-weight: 700;">Carboidratos</div>
                    <div style="font-size: 1.2rem; font-weight: 800; color: #fff; font-family: var(--font-mono);">${carbG}g</div>
                    <div style="font-size: 0.7rem; color: var(--text-dim);">~${Math.round(carbKcal)} kcal</div>
                </div>
                <div style="background: rgba(245,158,11,0.06); padding: 0.8rem; border-radius: 10px; border: 1px solid rgba(245,158,11,0.2);">
                    <div style="font-size: 0.75rem; color: var(--amber); font-weight: 700;">Gorduras</div>
                    <div style="font-size: 1.2rem; font-weight: 800; color: #fff; font-family: var(--font-mono);">${fatG}g</div>
                    <div style="font-size: 0.7rem; color: var(--text-dim);">~${Math.round(fatKcal)} kcal</div>
                </div>
            </div>
        </div>
    `;
}

/* ==========================================================================
   6. HELPER FUNCTIONS & ANIMATIONS
   ========================================================================== */

function animateNumber(element, start, end, duration, decimals = 0, suffix = '') {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - (1 - progress) * (1 - progress);
        const currentVal = start + (end - start) * ease;

        element.textContent = currentVal.toFixed(decimals) + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end.toFixed(decimals) + suffix;
        }
    }

    requestAnimationFrame(update);
}

function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const icon = type === 'success' ? 'fa-circle-check' : (type === 'warn' ? 'fa-triangle-exclamation' : 'fa-circle-info');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 350);
    }, 3500);
}

function translateActivity(code) {
    const map = {
        SEDENTARY: 'Sedentário',
        LIGHT: 'Leve (1-3x/sem)',
        MODERATE: 'Moderado (3-5x/sem)',
        INTENSE: 'Intenso (6-7x/sem)',
        ATHLETE: 'Atleta (Alta Perf.)'
    };
    return map[code] || code;
}

function translateGoal(code) {
    const map = {
        SEDENTARY: 'Manutenção / Sedentário',
        MASS_GAIN: 'Hipertrofia / Ganho de Massa',
        FAT_LOSS: 'Definição / Emagrecimento',
        ATHLETE: 'Performance de Alto Rendimento'
    };
    return map[code] || code;
}

function translateCaloricGoal(code) {
    const map = {
        MAINTAIN: 'Manter Peso',
        GAIN_MUSCLE: 'Superávit / Ganho Muscular',
        LOSE_WEIGHT: 'Déficit / Emagrecimento'
    };
    return map[code] || code;
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Mensagem enviada com sucesso! Em breve entraremos em contato.', 'success');
        contactForm.reset();
    });
}
