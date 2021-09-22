package app.controller;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.ListView;
import javafx.scene.control.TextArea;

public class HomeController {
    ObservableList<String> files = FXCollections.observableArrayList();

    @FXML
    private TextArea outputArea;
    @FXML
    private ListView<String> fileListView;


    @FXML
    public void initialize() {
//        Get files from server
        fileListView.setItems(files);
        files.addAll("Julia", "Ian", "Sue", "Matthew", "Hannah", "Stephan", "Denise");
        System.out.println("XD");
    }

    @FXML
    private void download() {
        String fileToDownload = fileListView.getSelectionModel().getSelectedItem();
//        TODO: Make call to server
    }
}
