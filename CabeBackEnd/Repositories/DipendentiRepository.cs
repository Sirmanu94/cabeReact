using CabeBackEnd.Models;
using Microsoft.EntityFrameworkCore;
namespace CabeBackEnd.Repositories
{

        public interface IDipendentiRepository
        {
            // Metodi per i Progetti
            Task<List<Dipendenti>> GetDipendentiAsync();
            Task<Dipendenti?> GetDipendenteByIdAsync(int idDipendente);
            Task<Dipendenti> AddOrUpdateDipendenteAsync(Dipendenti dipendente);
            Task EliminaDipendenteAsync(int idDipendente);

        }

        public class DipendentiRepositoryImpl : IDipendentiRepository
        {
            private readonly CabeContext _db;
            public DipendentiRepositoryImpl(CabeContext db)
            {
                _db = db;
            }
            public async Task<List<Dipendenti>> GetDipendentiAsync()
            {
                return await _db.Dipendentis.ToListAsync();
            }
            public async Task<Dipendenti?> GetDipendenteByIdAsync(int idDipendente)
            {
                return await _db.Dipendentis
                                .Where(x => x.IdDipendente == idDipendente)
                                .FirstOrDefaultAsync();
            }
            public async Task<Dipendenti> AddOrUpdateDipendenteAsync(Dipendenti dipendente)
            {
                if (dipendente.IdDipendente != 0)
                {
                    _db.Entry(dipendente).State = EntityState.Modified;
                }
                else
                {
                    _db.Dipendentis.Add(dipendente);
                }
                await _db.SaveChangesAsync();

                return dipendente;
            }
            public async Task EliminaDipendenteAsync(int idDipendente)
            {
                var dipendente = await GetDipendenteByIdAsync(idDipendente);
                if (dipendente != null)
                {
                    _db.Dipendentis.Remove(dipendente);
                    await _db.SaveChangesAsync();
                }
            }
        }
    }
