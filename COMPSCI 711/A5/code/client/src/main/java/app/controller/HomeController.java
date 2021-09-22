package app.controller;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.text.Text;

public class HomeController {
    @FXML
    private Text text;

    @FXML
    private Button button;

    @FXML
    public void initialize() {
        System.out.println("XD");
    }

    @FXML
    private void handleButton() {
        text.setText("You clicked the button!");
        button.setText("You clicked me");
    }
}
