namespace RedLegConstruction.Models;

public record RequestCommand(string Name, string Email, string PhoneNumber)
{
    public override string ToString()
    {
        return $"Name: {Name}, Email: {Email}, Phone Number: {PhoneNumber}";
    }
}
