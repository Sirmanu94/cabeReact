using CabeBackEnd.DTOs;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace CabeBackEnd.Services
{
    public interface IEmailService
    {
        Task InviaEmailRichiestaAsync(ContattoDto dto);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task InviaEmailRichiestaAsync(ContattoDto dto)
        {
            var smtpSettings = _config.GetSection("SmtpSettings");

            var email = new MimeMessage();
            email.From.Add(new MailboxAddress("CABE Website", smtpSettings["Username"]));
            email.To.Add(new MailboxAddress("CABE Studio", smtpSettings["ToEmail"]));
            email.Subject = $"Nuova Richiesta Informazioni da {dto.Nome} {dto.Cognome}";

            var builder = new BodyBuilder();
            builder.HtmlBody = $@"
                <h2 style='color: #134f72;'>Nuova richiesta informazioni dal sito web</h2>
                <p><strong>Da:</strong> {dto.Nome} {dto.Cognome}</p>
                <p><strong>Email:</strong> {dto.Email}</p>
                <p><strong>Telefono:</strong> {(string.IsNullOrEmpty(dto.Telefono) ? "Non fornito" : dto.Telefono)}</p>
                <br/>
                <p><strong>Messaggio:</strong></p>
                <p style='background-color: #f4f7f6; padding: 15px; border-left: 4px solid #00b4d8;'>{dto.Messaggio.Replace("\n", "<br/>")}</p>
            ";

            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();
            // Connessione SSL sulla porta 465
            await smtp.ConnectAsync(smtpSettings["Server"], int.Parse(smtpSettings["Port"]), SecureSocketOptions.SslOnConnect);
            await smtp.AuthenticateAsync(smtpSettings["Username"], smtpSettings["Password"]);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}