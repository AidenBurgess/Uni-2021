package app.data;

import javafx.application.Platform;
import javafx.collections.ObservableList;

import java.util.ArrayList;
import java.util.List;

public class Received {
    private static Received instance;
    private final ObservableList<String> messageList;
    //    [<msgUUID, msg>], msg is null if not received yet
    private List<String[]> receivedList = new ArrayList<>();

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
//        Get msgUUID from message
        String msgUUID = entry.substring(1, 14);
        System.out.println(":" + msgUUID + ":");
//        Update data model to show it has been received
        int msgIdx = getByUUID(msgUUID);
        String[] pair = receivedList.get(msgIdx);
        System.out.println(pair);
        pair[1] = entry;
        Platform.runLater(() -> messageList.add(entry));

        updateReady();
    }

    private void updateReady() {
        List<String[]> tempList = new ArrayList<>(receivedList);
//        Go from bottom up, and update ready if received.
        int toRemove = 0;
        for (int i = 0, tempListSize = tempList.size(); i < tempListSize; i++) {
            String[] pair = receivedList.get(i);
            if (pair[1] == null) {
                break;
            }
            toRemove++;
        }
        System.out.println("toRemove: " + toRemove);

        for (int i = 0; i < toRemove; i++) {
            Ready.get().add(receivedList.get(i)[1]);
        }
//            Remove old info we dont need
        receivedList.subList(0, toRemove).clear();
    }

    public void addExpected(String msgUUID) {
        System.out.println("TIMESTAMP RECEIVED: " + msgUUID);
        receivedList.add(new String[]{msgUUID, null});
    }

    public void clear() {
        receivedList.clear();
        messageList.clear();
    }

    private int getByUUID(String msgUUID) {
        for (int i = 0, receivedListSize = receivedList.size(); i < receivedListSize; i++) {
            String[] pair = receivedList.get(i);
            if (pair[0].equals(msgUUID)) {
                return i;
            }
        }
        return -1;
    }
}
