package health.IronCore.dto.protein;

import health.IronCore.model.FitnessGoal;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

public record ProteinCalculatorRequest(

        @NotNull(message = "Peso é obrigatório")
        @DecimalMin(value = "1.0", message = "Peso deve ser maior que 1")
        Double weightKg,

        @NotNull(message = "Objetivo de fitness é obrigatório")
        FitnessGoal fitnessGoal

) {}
