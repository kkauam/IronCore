package health.IronCore.service;

import health.IronCore.dto.imc.ImcCalculatorRequest;
import health.IronCore.dto.imc.ImcCalculatorResponse;
import org.springframework.stereotype.Service;

@Service
public class ImcCalculatorService {

    public ImcCalculatorResponse calculate(ImcCalculatorRequest request){
        double imcValue = request.weightKg() / (request.heightM() * request.heightM());
        String imcCategory;
        if (imcValue < 18.5) {
            imcCategory = "Abaixo do peso";
        } else if (imcValue < 25) {
            imcCategory = "Peso normal";
        } else if (imcValue < 30) {
            imcCategory = "Sobrepeso";
        } else {
            imcCategory = "Obesidade";
        }

        return new ImcCalculatorResponse(
                request.weightKg(),
                request.heightM(),
                imcValue,
                imcCategory
        );
    }
}
