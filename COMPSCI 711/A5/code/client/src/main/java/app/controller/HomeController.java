package app.controller;

import app.socket.Client;
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
        List<String> filesList = Client.getFilesList();
        files.addAll(filesList);

        String file = Client.getFile("test.txt");
        System.out.println(file);
    }

    @FXML
    private void download() {
        String fileToDownload = fileListView.getSelectionModel().getSelectedItem();
//        TODO: Make call to server
    }
}
