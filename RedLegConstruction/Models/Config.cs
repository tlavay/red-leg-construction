namespace RedLegConstruction.Models;

internal class Config
{
    public SendGridConfig SendGridConfig { get; init; }
}

internal record SendGridConfig
{
    public string ApiKey { get; init; }
}