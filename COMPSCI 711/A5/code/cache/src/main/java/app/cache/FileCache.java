package app.cache;

import java.util.HashMap;
import java.util.Map;

public class FileCache {
    private static FileCache instance;
    private Map<String, String> cache;

    public static FileCache getInstance() {
        if (instance == null) {
            instance = new FileCache();
        }
        return instance;
    }

    private FileCache() {
        cache = new HashMap<>();
    }

    public boolean isCached(String fileName) {
        return cache.containsKey(fileName);
    }

    public String getContents(String fileName) {
        return cache.get(fileName);
    }

    public void addFile(String fileName, String contents) {
        cache.put(fileName, contents);
    }

    public void clear() {
        cache.clear();
    }
}
