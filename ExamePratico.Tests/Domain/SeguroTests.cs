using System;
using ExamePratico.Domain.Entities;
using Xunit;

namespace ExamePratico.Tests.Domain
{
    public class SeguroTests
    {
        [Fact]
        public void MargemSeguranca_DeveSerZero_QuandoValorForNegativo()
        {
            var seguro = new Seguro();
            seguro.MargemSeguranca = -10;
            Assert.Equal(0, seguro.MargemSeguranca);
        }

        [Fact]
        public void MargemSeguranca_DeveAtribuirValorPositivo()
        {
            var seguro = new Seguro();
            seguro.MargemSeguranca = 0.2m;
            Assert.Equal(0.2m, seguro.MargemSeguranca);
        }

        [Fact]
        public void ValorDoVeiculo_DeveRetornarZero_QuandoNaoHouverVeiculo()
        {
            var seguro = new Seguro();
            Assert.Equal(0, seguro.ValorDoVeiculo);
        }

        [Fact]
        public void ValorDoVeiculo_DeveRetornarValorDoVeiculo()
        {
            var seguro = new Seguro
            {
                Veiculo = new Veiculo { ValorDoVeiculo = 50000 }
            };
            Assert.Equal(50000, seguro.ValorDoVeiculo);
        }

        [Fact]
        public void TaxaDeRisco_DeveCalcularCorretamente()
        {
            var seguro = new Seguro
            {
                Veiculo = new Veiculo { ValorDoVeiculo = 10000 }
            };
            Assert.Equal(2.5m, seguro.TaxaDeRisco);
        }

        [Fact]
        public void PremioDoRisco_DeveSerTaxaVezesValor()
        {
            var seguro = new Seguro
            {
                Veiculo = new Veiculo { ValorDoVeiculo = 10000 }
            };
            Assert.Equal(25000, seguro.PremioDoRisco);
        }

        [Fact]
        public void PremioPuro_DeveSerPremioDoRiscoVezesMargem()
        {
            var seguro = new Seguro
            {
                Veiculo = new Veiculo { ValorDoVeiculo = 10000 },
                MargemSeguranca = 0.1m
            };
            Assert.Equal(27500, seguro.PremioPuro);
        }

        [Fact]
        public void PremioComercial_DeveSerLucroVezesPremioPuro()
        {
            var seguro = new Seguro
            {
                Veiculo = new Veiculo { ValorDoVeiculo = 10000 },
                MargemSeguranca = 0.1m,
                Lucro = 2
            };
            Assert.Equal(55000, seguro.PremioComercial);
        }

        [Fact]
        public void ValorDoSeguro_DeveSerIgualAoPremioComercial()
        {
            var seguro = new Seguro
            {
                Veiculo = new Veiculo { ValorDoVeiculo = 10000 },
                MargemSeguranca = 0.1m,
                Lucro = 2
            };
            Assert.Equal(seguro.PremioComercial, seguro.ValorDoSeguro);
        }
    }
}
