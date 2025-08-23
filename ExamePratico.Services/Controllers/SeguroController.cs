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
    public class SeguroController : ControllerBase
    {
        private readonly ExamePraticoContext _context;
        private readonly IMapper _mapper;

        public SeguroController(ExamePraticoContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // 🔹 GET: api/seguro
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SeguroDTO>>> GetSeguros()
        {
            var seguros = await _context.Seguros
                .Include(s => s.Segurado)
                .Include(s => s.Veiculo)
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<SeguroDTO>>(seguros));
        }

        // 🔹 GET: api/seguro/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SeguroDTO>> GetSeguro(int id)
        {
            var seguro = await _context.Seguros
                .Include(s => s.Segurado)
                .Include(s => s.Veiculo)
                .FirstOrDefaultAsync(s => s.SeguroId == id);

            if (seguro == null)
                return NotFound();

            return Ok(_mapper.Map<SeguroDTO>(seguro));
        }

        // 🔹 POST: api/seguro
        [HttpPost]
        public async Task<ActionResult<SeguroDTO>> PostSeguro([FromBody] Seguro seguro)
        {
            seguro.DataCadastro = DateTime.Now;

            _context.Seguros.Add(seguro);
            await _context.SaveChangesAsync();

            // Retorna o DTO já calculado
            var seguroDTO = _mapper.Map<SeguroDTO>(seguro);

            return CreatedAtAction(nameof(GetSeguro), new { id = seguro.SeguroId }, seguroDTO);
        }

        // 🔹 PUT: api/seguro/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSeguro(int id, [FromBody] Seguro seguro)
        {
            if (id != seguro.SeguroId)
                return BadRequest();

            seguro.DataUltimaAlteracao = DateTime.Now;
            _context.Entry(seguro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Seguros.Any(e => e.SeguroId == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // 🔹 DELETE: api/seguro/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSeguro(int id)
        {
            var seguro = await _context.Seguros.FindAsync(id);
            if (seguro == null)
                return NotFound();

            _context.Seguros.Remove(seguro);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
