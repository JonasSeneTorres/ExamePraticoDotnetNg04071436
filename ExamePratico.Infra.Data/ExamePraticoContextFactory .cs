using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

namespace ExamePratico.Infra.Data
{
    public class ExamePraticoContextFactory : IDesignTimeDbContextFactory<ExamePraticoContext>
    {
        public ExamePraticoContext CreateDbContext(string[] args)
        {
            var connectionString = GetConnectionString();

            var optionsBuilder = new DbContextOptionsBuilder<ExamePraticoContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new ExamePraticoContext(optionsBuilder.Options);
        }

        private static string GetConnectionString()
        {
            // 1️.º Primeiro tenta pegar da variável de ambiente
            var envConnection = Environment.GetEnvironmentVariable("EF_CONNECTION");
            if (!string.IsNullOrWhiteSpace(envConnection))
                return envConnection;

            // 2️.º Tenta ler do appsettings.json
            var configuration = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: true)
                .Build();

            var configConnection = configuration.GetConnectionString("DefaultConnection");
            if (!string.IsNullOrWhiteSpace(configConnection))
                return configConnection;

            // 3️.º Se nada estiver configurado, lança erro amigável
            throw new InvalidOperationException(
                "Connection string não encontrada. Defina a variável de ambiente 'EF_CONNECTION' ou configure 'DefaultConnection' no appsettings.json."
            );
        }
    }
}
