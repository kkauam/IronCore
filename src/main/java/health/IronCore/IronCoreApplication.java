package health.IronCore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.flyway.autoconfigure.FlywayAutoConfiguration;
import org.springframework.boot.hibernate.autoconfigure.HibernateJpaAutoConfiguration;
import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;

// Desativado temporariamente a conexão com o banco para permitir rodar as calculadoras
// sem exigir a senha do PostgreSQL. Seu banco, tabelas e migrações permanecem intactos.
// Quando quiser reconectar ao banco de dados, basta remover o parâmetro exclude.
@SpringBootApplication()
public class IronCoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(IronCoreApplication.class, args);
	}

}
