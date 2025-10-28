using pixel_avatar.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddSingleton<AvatarService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMemoryCache();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();


app.MapGet("/", () => "Avatar Generator API está funcionando! Ve a /swagger para la documentación.");

Console.WriteLine("🎨 Avatar Generator iniciando...");

app.Run();
