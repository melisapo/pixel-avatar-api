# Imagen base (runtime)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app

# Imagen de compilación
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["PixelAvatar.csproj", "./"]
RUN dotnet restore "PixelAvatar.csproj"

COPY . .
RUN dotnet publish "PixelAvatar.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

CMD ASPNETCORE_URLS=http://+:${PORT:-8080} dotnet PixelAvatar.dll