using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExamePratico.Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeguradoController : ControllerBase
    {
        // GET: api/<SeguradoController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<SeguradoController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SeguradoController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SeguradoController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SeguradoController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
