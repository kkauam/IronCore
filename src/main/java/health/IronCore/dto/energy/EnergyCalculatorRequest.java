package health.IronCore.dto.energy;

import health.IronCore.model.ActivityLevel;
import health.IronCore.model.CaloricGoal;
import health.IronCore.model.Gender;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record EnergyCalculatorRequest(
        // peso → usado na fórmula da TMB
        @NotNull(message = "Peso é obrigatório")
        @DecimalMin(value = "1.0", message = "Peso deve ser maior que 1kg")
        Double weightKg,

        // altura → usado na fórmula da TMB
        @NotNull(message = "Altura é obrigatória")
        @DecimalMin(value = "0.5", message = "Altura deve ser maior que 0.5m")
        Double heightCm,

        // idade → usado na fórmula da TMB
        @NotNull(message = "Idade é obrigatória")
        @Min(value = 1, message = "Idade deve ser maior que 0")
        Integer age,

        // sexo → a fórmula é diferente para homem e mulher
        @NotNull(message = "Sexo é obrigatório")
        Gender gender,

        // atividade → usado para calcular o TDEE
        @NotNull(message = "Nível de atividade é obrigatório")
        ActivityLevel activityLevel,

        // objetivo → define déficit ou superávit
        @NotNull(message = "Objetivo é obrigatório")
        CaloricGoal caloricGoal

) {
}
