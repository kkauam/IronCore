package health.IronCore.dto.imc;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

public record ImcCalculatorRequest(
      @NotNull(message = "Peso é obrigatório")
      @DecimalMin(value = "1.0", message = "Peso deve ser maior que 1")
      Double weightKg,

      @NotNull(message = "Altura é obrigatória")
      @DecimalMin(value = "0.1", message = "Altura deve ser maior que 0.1")
      Double heightM

){}
