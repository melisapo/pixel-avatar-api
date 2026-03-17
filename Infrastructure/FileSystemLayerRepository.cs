namespace pixel_avatar.Infrastructure.Persistence;

public class FileSystemLayerRepository
{
    private readonly string _assetsPath;
    private readonly IReadOnlyDictionary<string, int> _partCounts;

    public FileSystemLayerRepository(IWebHostEnvironment env)
    {
        _assetsPath = Path.Combine(env.ContentRootPath, "Assets");

        _partCounts = new Dictionary<string, int>
        {
            ["base"]        = CountAssets("bases"),
            ["face"]        = CountAssets("faces"),
            ["hair"]        = CountAssets("hairs"),
            ["clothes"]     = CountAssets("clothes"),
            ["accessories"] = CountAssets("accessories")
        };
    }

    public int GetCount(string part) =>
        _partCounts.GetValueOrDefault(part, 0);

    public string GetPath(string folder, int index) =>
        Path.Combine(_assetsPath, folder, $"{index}.png");

    private int CountAssets(string folder)
    {
        var path = Path.Combine(_assetsPath, folder);
        return Directory.Exists(path)
            ? Directory.GetFiles(path, "*.png").Length
            : 0;
    }
}