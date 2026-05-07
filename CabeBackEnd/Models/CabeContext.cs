using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CabeBackEnd.Models;

public partial class CabeContext : DbContext
{
    public CabeContext()
    {
    }

    public CabeContext(DbContextOptions<CabeContext> options)
        : base(options)
    {
    }

    public virtual DbSet<FotoProgetto> FotoProgettos { get; set; }

    public virtual DbSet<Progetti> Progettis { get; set; }

    public virtual DbSet<Utenti> Utentis { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=CabeConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<FotoProgetto>(entity =>
        {
            entity.HasKey(e => e.IdPathFotoProgetto);

            entity.ToTable("Foto_Progetto");

            entity.Property(e => e.IdPathFotoProgetto).HasColumnName("id_PathFoto_Progetto");
            entity.Property(e => e.Eliminato).HasColumnName("eliminato");
            entity.Property(e => e.IdProgetto).HasColumnName("id_Progetto");
            entity.Property(e => e.PathFoto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pathFoto");
        });

        modelBuilder.Entity<Progetti>(entity =>
        {
            entity.HasKey(e => e.IdProgetto);

            entity.ToTable("Progetti");

            entity.Property(e => e.IdProgetto).HasColumnName("id_Progetto");
            entity.Property(e => e.DataInserimento)
                .HasColumnType("datetime")
                .HasColumnName("dataInserimento");
            entity.Property(e => e.Descrizione).HasColumnType("text");
            entity.Property(e => e.DescrizioneBreve)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Descrizione_Breve");
            entity.Property(e => e.Eliminato).HasColumnName("eliminato");
            entity.Property(e => e.PathFotoCopertina)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("path_foto_copertina");
        });

        modelBuilder.Entity<Utenti>(entity =>
        {
            entity.HasKey(e => e.IdUtente);

            entity.ToTable("Utenti");

            entity.Property(e => e.IdUtente).HasColumnName("id_utente");
            entity.Property(e => e.Cognome)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cognome");
            entity.Property(e => e.Email)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.IdRuolo).HasColumnName("id_ruolo");
            entity.Property(e => e.Nome)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nome");
            entity.Property(e => e.Password)
                .IsUnicode(false)
                .HasColumnName("password");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
