package app.logger;

import javafx.collections.ObservableList;

public class Logger {
    private static Logger instance;
    private final ObservableList<String> fileList;

    public static Logger get() {
        return instance;
    }

    public static void createInstance(ObservableList<String> initialList) {
        instance = new Logger(initialList);
    }

    private Logger(ObservableList<String> initialList) {
        fileList = initialList;
    }

    public void add(String entry) {
        fileList.add(entry);
    }
}
