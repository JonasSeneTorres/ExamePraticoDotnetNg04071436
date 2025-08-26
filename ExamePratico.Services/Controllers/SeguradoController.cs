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
    public class SeguradoController : ControllerBase
    {
        private readonly ExamePraticoContext _context;
        private readonly IMapper _mapper;

        public SeguradoController(ExamePraticoContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // 🔹 GET: api/segurado
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SeguradoDTO>>> GetSegurados()
        {
            var segurados = await _context.Segurados.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<SeguradoDTO>>(segurados));
        }

        // 🔹 GET: api/segurado/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SeguradoDTO>> GetSegurado(int id)
        {
            var segurado = await _context.Segurados.FindAsync(id);

            if (segurado == null)
                return NotFound();

            return Ok(_mapper.Map<SeguradoDTO>(segurado));
        }

        // 🔹 POST: api/segurado
        [HttpPost]
        public async Task<ActionResult<SeguradoDTO>> PostSegurado([FromBody] Segurado segurado)
        {
            segurado.DataCadastro = DateTime.Now;

            _context.Seguros.AddRange();
            _context.Segurados.Add(segurado);
            await _context.SaveChangesAsync();

            var seguradoDTO = _mapper.Map<SeguradoDTO>(segurado);

            return CreatedAtAction(nameof(GetSegurado), new { id = segurado.SeguradoId }, seguradoDTO);
        }

        // 🔹 PUT: api/segurado/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSegurado(int id, [FromBody] Segurado segurado)
        {
            if (id != segurado.SeguradoId)
                return BadRequest();

            segurado.DataUltimaAlteracao = DateTime.Now;
            _context.Entry(segurado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Segurados.Any(e => e.SeguradoId == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // 🔹 DELETE: api/segurado/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSegurado(int id)
        {
            var segurado = await _context.Segurados.FindAsync(id);
            if (segurado == null)
                return NotFound();

            _context.Segurados.Remove(segurado);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
