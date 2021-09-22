package app.controller;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.ListView;
import javafx.scene.control.TextArea;

public class HomeController {
    ObservableList<String> files = FXCollections.observableArrayList();

    @FXML
    private TextArea logArea;
    @FXML
    private ListView<String> fileListView;

    @FXML
    private void clear() {
//        TODO: Clear cache
    }


}
