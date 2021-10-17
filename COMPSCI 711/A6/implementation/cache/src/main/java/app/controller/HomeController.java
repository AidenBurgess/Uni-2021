package app.controller;

import app.Driver;
import app.data.Ready;
import app.data.Received;
import app.socket.Client;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.ListView;
import javafx.scene.text.Text;

public class HomeController {
    ObservableList<String> sent = FXCollections.observableArrayList();
    ObservableList<String> received = FXCollections.observableArrayList();
    ObservableList<String> ready = FXCollections.observableArrayList();

    private int numMessage = 0;

    @FXML
    private Text titleText;
    @FXML
    private ListView<String> sentListView;
    @FXML
    private ListView<String> receivedListView;
    @FXML
    private ListView<String> readyListView;

    @FXML
    public void initialize() {
        titleText.setText("Middleware " + Driver.MIDDLEWARE_ID);
        sentListView.setItems(sent);
        receivedListView.setItems(received);
        Received.createInstance(received);
        readyListView.setItems(ready);
        Ready.createInstance(ready);
    }

    @FXML
    private void send() {
        new Thread(() -> Client.send(sent, numMessage)).start();
        numMessage++;
    }

    @FXML
    private void clear() {
        sent.clear();
        Received.get().clear();
        Ready.get().clear();
    }
}
