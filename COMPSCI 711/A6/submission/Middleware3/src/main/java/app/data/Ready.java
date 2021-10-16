package app.data;

import javafx.application.Platform;
import javafx.collections.ObservableList;

public class Ready {
    private static Ready instance;
    private final ObservableList<String> messageList;

    public static Ready get() {
        return instance;
    }

    public static void createInstance(ObservableList<String> initialList) {
        instance = new Ready(initialList);
    }

    private Ready(ObservableList<String> initialList) {
        messageList = initialList;
    }

    public void add(String entry) {
        System.out.println("add being called in READY");
        Platform.runLater(() -> messageList.add(entry));
    }

    public void clear() {
        messageList.clear();
    }
}
