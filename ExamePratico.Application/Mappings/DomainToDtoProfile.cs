using AutoMapper;
using ExamePratico.Domain.Entities;
using ExamePratico.Application.DTOs;

namespace ExamePratico.Application.Mappings
{
    public class DomainToDtoProfile : Profile // Adicionar herança de Profile do AutoMapper
    {
        public DomainToDtoProfile()
        {
            // Segurado
            CreateMap<Segurado, SeguradoDTO>()
                .ForMember(dest => dest.Idade, opt => opt.MapFrom(src => src.Idade));

            CreateMap<SeguradoDTO, Segurado>();

            // Veiculo
            CreateMap<Veiculo, VeiculoDTO>().ReverseMap();

            // Seguro
            CreateMap<Seguro, SeguroDTO>()
                //.ForMember(dest => dest.NomeSegurado, opt => opt.MapFrom(src => src.Segurado.Nome))
                //.ForMember(dest => dest.PlacaVeiculo, opt => opt.MapFrom(src => src.Veiculo.Placa))
                // Mapeia propriedades calculadas
                .ForMember(dest => dest.ValorDoVeiculo, opt => opt.MapFrom(src => src.ValorDoVeiculo))
                .ForMember(dest => dest.TaxaDeRisco, opt => opt.MapFrom(src => src.TaxaDeRisco))
                .ForMember(dest => dest.PremioDoRisco, opt => opt.MapFrom(src => src.PremioDoRisco))
                .ForMember(dest => dest.PremioPuro, opt => opt.MapFrom(src => src.PremioPuro))
                .ForMember(dest => dest.PremioComercial, opt => opt.MapFrom(src => src.PremioComercial))
                .ForMember(dest => dest.ValorDoSeguro, opt => opt.MapFrom(src => src.ValorDoSeguro));

            CreateMap<SeguroDTO, Seguro>();
        }
    }
}
