using CabeBackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace CabeBackEnd.Repositories
{
    // 1. L'Interfaccia: Definisce i "contratti" dei metodi disponibili
    public interface IProgettiRepository
    {
        // Metodi per i Progetti
        Task<List<Progetti>> GetListProgettiAttiviAsync();
        Task<Progetti?> GetProgettoByIdAsync(int idProgetto);
        Task<Progetti> AddOrUpdateProgettoAsync(Progetti progetto);
        Task EliminaProgettoAsync(int idProgetto);

        // Metodi per le Foto
        Task<List<FotoProgetto>> GetAllFotoProgettoAsync();
        Task<FotoProgetto?> GetFotoProgettoByIdAsync(int idFoto);
        Task<List<FotoProgetto>> GetListaFotoProgettoAsync(int idProgetto);
        Task AddFotoProgettoAsync(FotoProgetto fotoProgetto);
        Task RemoveFotoProgettoAsync(int idFoto);
    }

    // 2. L'Implementazione: Esegue fisicamente le query sul Database
    public class ProgettiRepository : IProgettiRepository
    {
        private readonly CabeContext _db;

        public ProgettiRepository(CabeContext db)
        {
            _db = db;
        }

        #region GESTIONE PROGETTI

        public async Task<List<Progetti>> GetListProgettiAttiviAsync()
        {
            // Equivalente a getListProgetti del vecchio MVC, ma in Async
            return await _db.Progettis
                            .Where(x => x.Eliminato != true)
                            .OrderByDescending(x => x.DataInserimento) // Ordine cronologico per la vetrina
                            .ToListAsync();
        }

        public async Task<Progetti?> GetProgettoByIdAsync(int idProgetto)
        {
            // Equivalente a getProgettoById
            return await _db.Progettis
                            .Where(x => x.IdProgetto == idProgetto && x.Eliminato != true)
                            .FirstOrDefaultAsync();
        }

        public async Task<Progetti> AddOrUpdateProgettoAsync(Progetti progetto)
        {
            // Equivalente a addProgetto (gestisce sia Insert che Update)
            if (progetto.IdProgetto != 0)
            {
                _db.Entry(progetto).State = EntityState.Modified;
            }
            else
            {
                _db.Progettis.Add(progetto);
            }

            await _db.SaveChangesAsync();
            return progetto; // Ritorno l'oggetto aggiornato (con l'ID generato se era nuovo)
        }

        public async Task EliminaProgettoAsync(int idProgetto)
        {
            // Equivalente a eliminaProgetto (Soft Delete)
            var progetto = await GetProgettoByIdAsync(idProgetto);
            if (progetto != null)
            {
                progetto.Eliminato = true;
                _db.Entry(progetto).State = EntityState.Modified;
                await _db.SaveChangesAsync();
            }
        }

        #endregion

        #region GESTIONE FOTO

        public async Task<List<FotoProgetto>> GetAllFotoProgettoAsync()
        {
            // Equivalente a getAllFotoProgetto
            return await _db.FotoProgettos
                            .Where(x => x.Eliminato != true)
                            .ToListAsync();
        }

        public async Task<FotoProgetto?> GetFotoProgettoByIdAsync(int idFoto)
        {
            // Equivalente a getFotoProgettoById
            return await _db.FotoProgettos
                            .Where(x => x.IdPathFotoProgetto == idFoto)
                            .FirstOrDefaultAsync();
        }

        public async Task<List<FotoProgetto>> GetListaFotoProgettoAsync(int idProgetto)
        {
            // Equivalente a getListaFotoProgetto
            return await _db.FotoProgettos
                            .Where(x => x.IdProgetto == idProgetto && x.Eliminato != true)
                            .ToListAsync();
        }

        public async Task AddFotoProgettoAsync(FotoProgetto fotoProgetto)
        {
            // Equivalente a addFotoProgetto
            _db.FotoProgettos.Add(fotoProgetto);
            await _db.SaveChangesAsync();
        }

        public async Task RemoveFotoProgettoAsync(int idFoto)
        {
            // Equivalente a removeFotoProgetto (Soft Delete)
            var foto = await GetFotoProgettoByIdAsync(idFoto);
            if (foto != null)
            {
                foto.Eliminato = true;
                _db.Entry(foto).State = EntityState.Modified;
                await _db.SaveChangesAsync();
            }
        }

        #endregion
    }
}