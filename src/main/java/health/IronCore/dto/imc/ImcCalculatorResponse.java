package health.IronCore.dto.imc;

public record ImcCalculatorResponse(
        double weightKg,
        double heightM,
        double imcValue,
        String imcCategory
) {}
