const API_URL = 'http://localhost:8080/api/calculators';

document.addEventListener('DOMContentLoaded', () => {
    initIronCoreCalculators();
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