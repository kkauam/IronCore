# IronCore API

API REST para gestão e acompanhamento de saúde e performance física, desenvolvida com Java e Spring Boot.

## Sobre o projeto

O IronCore é uma API voltada para academias e praticantes de atividade física, oferecendo calculadoras baseadas em fórmulas científicas para auxiliar no acompanhamento da saúde e performance do usuário.

## Tecnologias

- **Java 21**
- **Spring Boot 3.4**
- **Spring Security**
- **Spring Data JPA**
- **PostgreSQL**
- **Maven**
- **Bean Validation**

## Funcionalidades

### Calculadoras disponíveis

| Endpoint | Descrição |
|---|---|
| `POST /api/calculators/water` | Ingestão diária de água |
| `POST /api/calculators/protein` | Meta diária de proteína |
| `POST /api/calculators/imc` | Índice de Massa Corporal |
| `POST /api/calculators/energy` | TMB, TDEE e meta calórica |

## Como executar

### Pré-requisitos

- Java 21+
- PostgreSQL
- Maven

### Configuração

Clone o repositório:

```bash
git clone https://github.com/kkauam/IronCore.git
cd IronCore
```

Crie o banco de dados:

```sql
CREATE DATABASE ironcore;
```

Crie o arquivo `src/main/resources/application-local.properties` com suas credenciais:

```properties
DB_URL=jdbc:postgresql://localhost:5432/ironcore
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

Execute o projeto:

```bash
./mvnw spring-boot:run
```

A API estará disponível em `http://localhost:8080`.

## Exemplos de uso

### Água diária

```http
POST /api/calculators/water
Content-Type: application/json

{
  "weightKg": 70.0,
  "activityLevel": "MODERATE"
}
```

```json
{
  "weightKg": 70.0,
  "activityLevel": "MODERATE",
  "dailyWaterMl": 2940.0,
  "dailyWaterLiters": 2.9,
  "glassesOf250ml": 12
}
```

### Proteína diária

```http
POST /api/calculators/protein
Content-Type: application/json

{
  "weightKg": 70.0,
  "fitnessGoal": "MASS_GAIN"
}
```

```json
{
  "weightKg": 70.0,
  "fitnessGoal": "MASS_GAIN",
  "dailyProteinGrams": 126.0,
  "mealsToDistribute": 5
}
```

### IMC

```http
POST /api/calculators/imc
Content-Type: application/json

{
  "weightKg": 70.0,
  "heightM": 1.75
}
```

```json
{
  "weightKg": 70.0,
  "heightM": 1.75,
  "imcValue": 22.86,
  "imcCategory": "Peso normal"
}
```

### Gasto Energético (TMB + TDEE)

```http
POST /api/calculators/energy
Content-Type: application/json

{
  "weightKg": 70.0,
  "heightCm": 175.0,
  "age": 25,
  "gender": "MALE",
  "activityLevel": "MODERATE",
  "caloricGoal": "LOSE_WEIGHT"
}
```

```json
{
  "weightKg": 70.0,
  "heightCm": 175.0,
  "age": 25,
  "gender": "MALE",
  "bmr": 1673.75,
  "tdee": 2594.31,
  "caloricGoal": "LOSE_WEIGHT",
  "targetCalories": 2094.31
}
```

## Enums disponíveis

### ActivityLevel
| Valor | Descrição |
|---|---|
| `SEDENTARY` | Sedentário |
| `LIGHT` | Exercício leve 1-3x/semana |
| `MODERATE` | Exercício moderado 3-5x/semana |
| `INTENSE` | Exercício intenso 6-7x/semana |
| `ATHLETE` | Atleta / 2x por dia |

### FitnessGoal
| Valor | Proteína/kg |
|---|---|
| `SEDENTARY` | 0.8g |
| `MASS_GAIN` | 1.8g |
| `FAT_LOSS` | 2.0g |
| `ATHLETE` | 2.2g |

### CaloricGoal
| Valor | Ajuste calórico |
|---|---|
| `MAINTAIN` | 0 kcal |
| `LOSE_WEIGHT` | -500 kcal |
| `GAIN_MUSCLE` | +300 kcal |

### Gender
`MALE` / `FEMALE`

## Arquitetura

O projeto segue o padrão de arquitetura em camadas:

```
Controller  →  recebe e valida a requisição HTTP
Service     →  executa a lógica de negócio
DTO         →  define os contratos de entrada e saída
Model       →  enums e entidades do domínio
```

## Próximas funcionalidades

- [ ] Autenticação e autorização com JWT
- [ ] Cadastro e login de usuários
- [ ] Histórico de cálculos por usuário
- [ ] Deploy com Docker e Railway

## Autor

**Kauam** — estudante de Engenharia de Software focado em desenvolvimento back-end com Java e Spring Boot.

[![GitHub](https://img.shields.io/badge/GitHub-kkauam-181717?style=flat&logo=github)](https://github.com/kkauam)
