using pixel_avatar.Application;
using pixel_avatar.Application.Interfaces;
using pixel_avatar.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddMemoryCache();
builder.Services.AddSingleton<FileSystemLayerRepository>();
builder.Services.AddScoped<IAvatarService, AvatarGenerator>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.MapGet("/", () => "Escribe en la url '/<tu nombre>?size=512' para obtener tu avatar único <3");

app.Run();