package health.IronCore.Controller;

import health.IronCore.dto.imc.ImcCalculatorRequest;
import health.IronCore.dto.imc.ImcCalculatorResponse;
import health.IronCore.service.ImcCalculatorService;
import health.IronCore.service.ProteinCalculatorService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/calculators")
@CrossOrigin(origins = "*")
public class ImcCalculatorController {
    private final ImcCalculatorService service;


    public ImcCalculatorController(ImcCalculatorService service) {
        this.service = service;
    }


    @PostMapping("/imc")
    public ResponseEntity<ImcCalculatorResponse> calculateImc(
            @Valid @RequestBody ImcCalculatorRequest request) {

        ImcCalculatorResponse response = service.calculate(request);
        return ResponseEntity.ok(response);
    }
}
