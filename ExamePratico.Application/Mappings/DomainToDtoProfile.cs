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
                .ForMember(dest => dest.SeguroId, opt => opt.MapFrom(src => src.SeguroId))
                .ForMember(dest => dest.VeiculoId, opt => opt.MapFrom(src => src.Veiculo.VeiculoId))
                .ForMember(dest => dest.VeiculoMarca, opt => opt.MapFrom(src => src.Veiculo.Marca))
                .ForMember(dest => dest.VeiculoModelo, opt => opt.MapFrom(src => src.Veiculo.Modelo))
                .ForMember(dest => dest.TaxaDeRisco, opt => opt.MapFrom(src => src.TaxaDeRisco))
                .ForMember(dest => dest.PremioDoRisco, opt => opt.MapFrom(src => src.PremioDoRisco))
                .ForMember(dest => dest.PremioPuro, opt => opt.MapFrom(src => src.PremioPuro))
                .ForMember(dest => dest.PremioComercial, opt => opt.MapFrom(src => src.PremioComercial))
                .ForMember(dest => dest.ValorDoSeguro, opt => opt.MapFrom(src => src.ValorDoSeguro))
                .ForMember(dest => dest.SeguradoId, opt => opt.MapFrom(src => src.Segurado.SeguradoId))
                .ForMember(dest => dest.SeguradoNome, opt => opt.MapFrom(src => src.Segurado.Nome))
                .ForMember(dest => dest.SeguradoCPF, opt => opt.MapFrom(src => src.Segurado.CPF))
                .ForMember(dest => dest.SeguradoDataNascimento, opt => opt.MapFrom(src => src.Segurado.DataNascimento))
                .ForMember(dest => dest.SeguradoIdade, opt => opt.MapFrom(src => src.Segurado.Idade))
                ;

            CreateMap<SeguroDTO, Seguro>();
        }
    }
}
