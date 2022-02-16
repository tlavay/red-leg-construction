using RedLegConstruction.EmailClient;
using RedLegConstruction.Models;
using SendGrid;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddSingleton(builder.Configuration.GetSection("Config").Get<Config>());
builder.Services.AddSingleton(s => CreateSendGrid(GetService<Config>(s)));
builder.Services.AddTransient<IEmailClient, EmailClient>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();

SendGridClient CreateSendGrid(Config config)
{
    return new SendGridClient(config.SendGridConfig.ApiKey);
};

T GetService<T>(IServiceProvider serviceProvider)
{
    var service = serviceProvider.GetService<T>();
    if (service == null)
    {
        throw new InvalidOperationException($"The service: {typeof(T).Name} did not return. Please reconfigure.");
    }

    return service;
}
