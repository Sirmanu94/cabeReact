using CabeBackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace CabeBackEnd.Repositories
{
    public interface IUtentiRepository
    {
        Task<Utenti> LoginAsync(string email, string password);
    }

    public class UtentiRepository : IUtentiRepository
    {
        private readonly CabeContext _db;

        public UtentiRepository(CabeContext db)
        {
            _db = db;
        }

        public async Task<Utenti> LoginAsync(string email, string password)
        {
            // NOTA: In un'app reale la password dovrebbe essere hashata (es. BCrypt). 
            // Lascio la query esatta che avevi nel vecchio progetto per compatibilità.
            return await _db.Utentis.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        }
    }
}