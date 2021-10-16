package app.data;

import javafx.application.Platform;
import javafx.collections.ObservableList;

public class Received {
    private static Received instance;
    private final ObservableList<String> messageList;

    public static Received get() {
        return instance;
    }

    public static void createInstance(ObservableList<String> initialList) {
        instance = new Received(initialList);
    }

    private Received(ObservableList<String> initialList) {
        messageList = initialList;
    }

    public void add(String entry) {
        Platform.runLater(() -> {
            messageList.add(entry);
        });
    }
}
