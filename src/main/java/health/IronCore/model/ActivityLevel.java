package health.IronCore.model;

public enum ActivityLevel {
    SEDENTARY(1.0),
    LIGHT(1.1),
    MODERATE(1.2),
    INTENSE(1.3),
    ATHLETE(1.4);

    private final double multiplier;

    ActivityLevel(double multiplier) {
        this.multiplier = multiplier;
    }

    public double getMultiplier() {
        return multiplier;
    }
}
