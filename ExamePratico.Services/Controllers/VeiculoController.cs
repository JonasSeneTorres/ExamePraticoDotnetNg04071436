using AutoMapper;
using ExamePratico.Application.DTOs;
using ExamePratico.Domain.Entities;
using ExamePratico.Infra.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamePratico.Services.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VeiculoController : ControllerBase
    {
        private readonly ExamePraticoContext _context;
        private readonly IMapper _mapper;

        public VeiculoController(ExamePraticoContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // 🔹 GET: api/veiculo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VeiculoDTO>>> GetVeiculos()
        {
            var veiculos = await _context.Veiculos.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<VeiculoDTO>>(veiculos));
        }

        // 🔹 GET: api/veiculo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VeiculoDTO>> GetVeiculo(int id)
        {
            var veiculo = await _context.Veiculos.FindAsync(id);

            if (veiculo == null)
                return NotFound();

            return Ok(_mapper.Map<VeiculoDTO>(veiculo));
        }

        // 🔹 POST: api/veiculo
        [HttpPost]
        public async Task<ActionResult<VeiculoDTO>> PostVeiculo([FromBody] Veiculo veiculo)
        {
            veiculo.DataCadastro = DateTime.Now;

            _context.Veiculos.Add(veiculo);
            await _context.SaveChangesAsync();

            var veiculoDTO = _mapper.Map<VeiculoDTO>(veiculo);

            return CreatedAtAction(nameof(GetVeiculo), new { id = veiculo.VeiculoId }, veiculoDTO);
        }

        // 🔹 PUT: api/veiculo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVeiculo(int id, [FromBody] Veiculo veiculo)
        {
            if (id != veiculo.VeiculoId)
                return BadRequest();

            veiculo.DataUltimaAlteracao = DateTime.Now;
            _context.Entry(veiculo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Veiculos.Any(e => e.VeiculoId == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // 🔹 DELETE: api/veiculo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVeiculo(int id)
        {
            var veiculo = await _context.Veiculos.FindAsync(id);
            if (veiculo == null)
                return NotFound();

            _context.Veiculos.Remove(veiculo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
