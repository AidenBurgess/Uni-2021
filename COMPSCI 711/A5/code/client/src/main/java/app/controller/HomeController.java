package app.controller;

import app.socket.Client;
import javafx.application.Platform;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.ListView;
import javafx.scene.control.TextArea;

import java.util.List;

public class HomeController {
    ObservableList<String> files = FXCollections.observableArrayList();

    @FXML
    private TextArea outputArea;
    @FXML
    private ListView<String> fileListView;


    @FXML
    public void initialize() {
        fileListView.setItems(files);
        retrieveFileList();
    }

    @FXML
    private void download() {
        String fileToDownload = fileListView.getSelectionModel().getSelectedItem();
        if (fileToDownload != null) {
            System.out.println("Downloading: " + fileToDownload);
            new Thread(() -> {
                String contents = Client.getFile(fileToDownload);
                Platform.runLater(() -> outputArea.setText(contents));
            }).start();
        }
    }

    @FXML
    private void refresh() {
        retrieveFileList();
    }

    private void retrieveFileList() {
        new Thread(() -> {
            List<String> filesList = Client.getFilesList();
            Platform.runLater(() -> {
                files.clear();
                files.addAll(filesList);
            });
        }).start();
    }
}
