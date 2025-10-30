FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:$PORT

EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["PixelAvatar/PixelAvatar.csproj", "PixelAvatar/"]
RUN dotnet restore "PixelAvatar/PixelAvatar.csproj"

COPY . .
WORKDIR "/src/PixelAvatar"

RUN dotnet publish "./PixelAvatar.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "PixelAvatar.dll"]
