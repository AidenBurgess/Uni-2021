package app.cache;

import app.logger.Logger;
import javafx.collections.ObservableList;
import javafx.collections.ObservableSet;

import java.util.HashMap;
import java.util.Map;

public class FileCache {
    private static FileCache instance;
    private Map<String, String> cache;
    private ObservableList<String> fileList;

    public static FileCache getInstance() {
        return instance;
    }

    public static void createInstance(ObservableList<String> initialList) {
        instance = new FileCache(initialList);
    }

    private FileCache(ObservableList<String> initialList) {
        cache = new HashMap<>();
        fileList = initialList;
    }

    public boolean isCached(String fileName) {
        return cache.containsKey(fileName);
    }

    public String getContent(String fileName) {
        return cache.get(fileName);
    }

    public void addFile(String fileName, String contents) {
        cache.put(fileName, contents);
        fileList.add(fileName);
    }

    public void clear() {
        cache.clear();
        fileList.clear();
        Logger.get().add("file cache has been cleared");

    }
}
