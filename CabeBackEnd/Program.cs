using CabeBackEnd.Models;
using CabeBackEnd.Repositories;
using CabeBackEnd.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Registrazione del DbContext
builder.Services.AddDbContext<CabeContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CabeConnection")));

builder.Services.AddScoped<IUtentiRepository, UtentiRepository>();
builder.Services.AddScoped<IProgettiRepository, ProgettiRepository>();
builder.Services.AddScoped<IEmailService, EmailService>();


var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

// --- INIZIO SOLUZIONE BULLDOZER PER IL PREFLIGHT (CORS) ---
app.Use(async (context, next) =>
{
    if (context.Request.Method == "OPTIONS")
    {
        // 1. Leggiamo da dove arriva la richiesta
        var origin = context.Request.Headers["Origin"].ToString();

        // 2. Controlliamo se è uno dei TUOI domini autorizzati
        var allowedOrigins = new[] {
            "https://www.cabeingegneria.it",
            "https://cabeingegneria.it",
            "http://localhost:5173"
        };

        if (allowedOrigins.Contains(origin))
        {
            // 3. Rispondiamo col nome esatto del dominio, invece che con l'asterisco (*)
            context.Response.Headers.Add("Access-Control-Allow-Origin", origin);
            context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");
            context.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            context.Response.StatusCode = 200;
            return;
        }
        else
        {
            // Se un altro sito ci prova, gli diamo un errore 403 Forbidden
            context.Response.StatusCode = 403;
            return;
        }
    }
    await next();
});
// --- FINE SOLUZIONE BULLDOZER ---

app.UseRouting();

// Mantieni la tua policy CORS per le richieste normali (GET, POST)
app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
