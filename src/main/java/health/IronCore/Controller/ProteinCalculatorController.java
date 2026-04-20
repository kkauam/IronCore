package health.IronCore.Controller;

import health.IronCore.dto.protein.ProteinCalculatorRequest;
import health.IronCore.dto.protein.ProteinCalculatorResponse;
import health.IronCore.service.ProteinCalculatorService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculators")


public class ProteinCalculatorController {

    private final ProteinCalculatorService service;

    public ProteinCalculatorController(ProteinCalculatorService service) {
        this.service = service;
    }

    @PostMapping("/protein")
    public ResponseEntity<ProteinCalculatorResponse> calculateProtein(
            @Valid @RequestBody ProteinCalculatorRequest request) {

        ProteinCalculatorResponse response = service.calculate(request);
        return ResponseEntity.ok(response);
    }

}
