using CabeBackEnd.DTOs;
using CabeBackEnd.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CabeBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUtentiRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IUtentiRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var user = await _repo.LoginAsync(model.Email, model.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Email o Password non validi." });
            }

            // Generazione del Token JWT
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("IdUtente", user.IdUtente.ToString()),
                new Claim("NomeCompleto", $"{user.Nome} {user.Cognome}"),
                new Claim(ClaimTypes.Role, user.IdRuolo.ToString() ?? "User")
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: credentials);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                utente = new { user.Nome, user.Cognome, user.Email }
            });
        }
    }
}