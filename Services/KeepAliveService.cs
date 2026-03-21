namespace pixel_avatar.Services;

public class KeepAliveService(
    IHttpClientFactory httpClientFactory,
    ILogger<KeepAliveService> logger,
    IConfiguration config)
    : BackgroundService
{
    private readonly string _selfUrl = config["KeepAlive:Url"] ?? "https://pixelavatar.onrender.com";

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(TimeSpan.FromMinutes(10), stoppingToken);

            try
            {
                var client = httpClientFactory.CreateClient("keepalive");
                await client.GetAsync(_selfUrl, stoppingToken);
                logger.LogInformation("KeepAlive ping enviado a {Url}", _selfUrl);
            }
            catch (Exception ex)
            {
                logger.LogWarning("KeepAlive falló: {Message}", ex.Message);
            }
        }
    }
}