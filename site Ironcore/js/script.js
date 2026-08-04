const API_URL = 'http://localhost:8080/api/calculators';

document.addEventListener('DOMContentLoaded', () => {
    initIronCoreCalculators();
    initContactForm();
});

function initIronCoreCalculators() {
    // 1. ÁGUA
    setupCalculator(
        'form-water',
        '/water',
        'result-water',
        (form) => ({
            weightKg: parseFloat(form.querySelector('#water-weight').value),
            activityLevel: form.querySelector('#water-activity').value
        }),
        (data) => `Meta diária: <strong>${data.dailyWaterMl} ml</strong> (${data.dailyWaterLiters}L)`
    );

    // 2. PROTEÍNA
    setupCalculator(
        'form-protein',
        '/protein',
        'result-protein',
        (form) => ({
            weightKg: parseFloat(form.querySelector('#protein-weight').value),
            fitnessGoal: form.querySelector('#protein-goal').value
        }),
        (data) => `Meta proteica: <strong>${data.dailyProteinGrams}g</strong>/dia`
    );

    // 3. IMC
    setupCalculator(
        'form-imc',
        '/imc',
        'result-imc',
        (form) => ({
            weightKg: parseFloat(form.querySelector('#imc-weight').value),
            heightM: parseFloat(form.querySelector('#imc-height').value)
        }),
        (data) => `IMC: <strong>${data.imcValue.toFixed(2)}</strong> (${data.imcCategory})`
    );

    //4. TMB e TDEE
    // 4. TMB e TDEE
setupCalculator(
    'form-energy',
    '/energy',
    'result-energy',
    (form) => ({
        weightKg: parseFloat(form.querySelector('#energy-weight').value),
        heightCm: parseFloat(form.querySelector('#energy-height').value),
        age: parseInt(form.querySelector('#energy-age').value),
        gender: form.querySelector('#energy-gender').value,
        activityLevel: form.querySelector('#energy-activity').value,
        caloricGoal: form.querySelector('#energy-goal').value
    }),
    (data) => `
        <div class="result-grid">
            <div class="result-item">
                <span class="result-label">TMB (repouso)</span>
                <span class="result-value">${Math.round(data.bmr)} kcal</span>
            </div>
            <div class="result-item">
                <span class="result-label">TDEE (gasto total)</span>
                <span class="result-value">${Math.round(data.tdee)} kcal</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label">Meta diária</span>
                <span class="result-value">${Math.round(data.targetCalories)} kcal</span>
            </div>
        </div>
    `
);

}

function setupCalculator(formId, endpoint, resultId, payloadBuilder, successMsgBuilder) {
    const form = document.getElementById(formId);
    const resultBox = document.getElementById(resultId);
    if (!form || !resultBox) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        resultBox.classList.add('hidden');

        const inputs = form.querySelectorAll('input, select');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value || (input.type === "number" && isNaN(parseFloat(input.value)))) {
                isValid = false;
            }
        });

        if (!isValid) {
            showFeedback(resultBox, 'Preencha todos os campos corretamente.', false);
            return;
        }

        const btn = form.querySelector('.btn-calc');
        const btnText = btn?.querySelector('.btn-text');
        const loader = btn?.querySelector('.loader');

        btn.disabled = true;
        btnText?.classList.add('hidden');
        loader?.classList.remove('hidden');

        try {
            const payload = payloadBuilder(form);

            console.log("Payload enviado:", payload); // 🔥 debug

            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || 'Erro no processamento.');
            }

            const data = await response.json();

            console.log("Resposta:", data); // 🔥 debug

            showFeedback(resultBox, successMsgBuilder(data), true);

        } catch (error) {
            showFeedback(resultBox, error.message, false);
        } finally {
            btn.disabled = false;
            btnText?.classList.remove('hidden');
            loader?.classList.add('hidden');
        }
    });
}

function showFeedback(element, message, isSuccess) {
    element.innerHTML = message;
    element.className = `result-box ${isSuccess ? 'res-success' : 'res-error'}`;
    element.classList.remove('hidden');
}

function initContactForm() {
    const form = document.querySelector('form') && !document.querySelector('#form-water') && !document.querySelector('#form-protein') && !document.querySelector('#form-imc');
    // Simpler check: find the form that doesn't have a calculator ID
    const contactForm = document.querySelector('form:not([id^="form-"])');
    // Actually, let's just look for the contact form by the existence of a specific field
    const emailField = document.getElementById('contact-email');

    if (!emailField) return;

    const formElement = emailField.closest('form');
    if (!formElement) return;

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Obrigado por entrar em contato! Em breve responderemos sua mensagem.');
        formElement.reset();
    });
}
