package app.controller;

import app.cache.FileCache;
import app.logger.Logger;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.ListView;

public class HomeController {
    ObservableList<String> files = FXCollections.observableArrayList();
    ObservableList<String> log = FXCollections.observableArrayList();

    @FXML
    private ListView<String> logListView;
    @FXML
    private ListView<String> fileListView;

    @FXML
    public void initialize() {
        fileListView.setItems(files);
        FileCache.createInstance(files);
        logListView.setItems(log);
        Logger.createInstance(log);
    }

    @FXML
    private void clear() {
        FileCache.getInstance().clear();
    }
}
