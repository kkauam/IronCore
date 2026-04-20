package health.IronCore.dto.water;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import health.IronCore.model.ActivityLevel;


public record WaterCalculatorRequest (
        @NotNull(message = "Peso é obrigatório")
        @DecimalMin(value = "1.0", message = "Peso deve ser maior que 1")
        double weightKg,

        @NotNull(message = "Nível de atividade é obrigatório")
        ActivityLevel activityLevel
        ){}





