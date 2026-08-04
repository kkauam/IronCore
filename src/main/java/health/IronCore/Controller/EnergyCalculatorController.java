package health.IronCore.Controller;

import health.IronCore.dto.energy.EnergyCalculatorRequest;
import health.IronCore.dto.energy.EnergyCalculatorResponse;
import health.IronCore.service.EnergyCalculatorService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculators")
@CrossOrigin(origins = "*")
public class EnergyCalculatorController {

    private final EnergyCalculatorService service;

    public EnergyCalculatorController(EnergyCalculatorService service) {
        this.service = service;
    }

    @PostMapping("/energy")
    public ResponseEntity<EnergyCalculatorResponse> calculateEnergy(
            @Valid @RequestBody EnergyCalculatorRequest request) {

        EnergyCalculatorResponse response = service.calculate(request);
        return ResponseEntity.ok(response);
    }
}
