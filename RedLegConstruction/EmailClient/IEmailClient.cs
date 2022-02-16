namespace RedLegConstruction.EmailClient;
public interface IEmailClient
{
    Task Send(string[] recipients, string subject, string plainTextMessage);
}
