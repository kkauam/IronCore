package health.IronCore.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "calculation_record")
public class CalculationRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CalculationType type;

    @Column(nullable = false)
    private  double weightKg;

    @Column(nullable = false)
    private double resultValue;

    private String description;

    @Column(nullable = false)
    private LocalDateTime createDate;

    public CalculationRecord(CalculationType type, Double weightKg, Double resultValue, String description) {
        this.type = type;
        this.weightKg = weightKg;
        this.resultValue = resultValue;
        this.description = description;
        this.createDate = LocalDateTime.now();
    }



}
