FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY ["PixelAvatar.csproj", "./"]
RUN dotnet restore "PixelAvatar.csproj"

COPY . .

RUN npm run css:build

RUN dotnet publish "PixelAvatar.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
COPY --from=build /src/Assets ./Assets
COPY --from=build /src/wwwroot ./wwwroot 

CMD ASPNETCORE_URLS=http://+:${PORT:-8080} dotnet PixelAvatar.dll