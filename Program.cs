using pixel_avatar.Application;
using pixel_avatar.Application.Interfaces;
using pixel_avatar.Infrastructure;
//using pixel_avatar.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddMemoryCache();
builder.Services.AddSingleton<FileSystemLayerRepository>();
builder.Services.AddScoped<IAvatarService, AvatarGenerator>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient("keepalive");
//builder.Services.AddHostedService<KeepAliveService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapControllers();

app.Run();